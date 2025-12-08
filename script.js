

const STORAGE_KEY = 'todoListTasks';

let tasks = [];

function generateUniqueId() {
    return Date.now().toString(); 
}

function loadTasks() {
    const data = localStorage.getItem(STORAGE_KEY);
    try {
        return data ? JSON.parse(data) : [];
    } catch (e) {
        console.error("Ошибка при загрузке задач из LocalStorage:", e);
        return [];
    }
}

function saveTasks() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

const taskList = document.getElementById('taskList');
const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');

function render() {
    taskList.innerHTML = ''; 
    
    tasks.forEach(task => {
        const item = createListItem(task);
        taskList.appendChild(item);
    });
    
    saveTasks(); 
}

function handleEditTask(task, taskSpan, listItem) {
    const editInput = document.createElement('input');
    editInput.type = 'text';
    editInput.value = task.text;
    editInput.className = 'edit-input';
    
    let isSaving = false;

    const saveChanges = () => {
        if (isSaving) return;
        isSaving = true;

        const newText = editInput.value.trim();
        
        listItem.replaceChild(taskSpan, editInput);

        if (newText && newText !== task.text) {
            task.text = newText;
            render(); 
        } else {
            taskSpan.textContent = task.text;
        }

        editInput.removeEventListener('blur', saveChanges);
        editInput.removeEventListener('keypress', handleKey);
    };

    const handleKey = (e) => {
        if (e.key === 'Enter') {
            saveChanges();
            editInput.blur(); 
        }
    };
    
    listItem.replaceChild(editInput, taskSpan); 
    editInput.focus();
    
    editInput.addEventListener('blur', saveChanges); 
    editInput.addEventListener('keypress', handleKey);
}

function createListItem(task) {
    const listItem = document.createElement('li');
    
    if (task.completed) {
        listItem.classList.add('completed');
    }
    
    const taskSpan = document.createElement('span');
    taskSpan.textContent = task.text;
    
    taskSpan.addEventListener('dblclick', () => handleEditTask(task, taskSpan, listItem));
    taskSpan.addEventListener('click', () => handleToggleTask(task.id)); 
    
    const deleteButton = document.createElement('button');
    deleteButton.textContent = '❌';
    deleteButton.className = 'delete-button';
    
    deleteButton.addEventListener('click', (event) => {
        event.stopPropagation(); 
        handleDeleteTask(task.id); 
    });

    listItem.appendChild(taskSpan);
    listItem.appendChild(deleteButton);
    listItem.dataset.taskId = task.id; 

    return listItem;
}

function handleAddTask() {
    const text = taskInput.value.trim();

    if (text === '') return;

    const newTask = {
        id: generateUniqueId(),
        text: text,
        completed: false
    };

    tasks.push(newTask);
    taskInput.value = ''; 
    render(); 
}

function handleToggleTask(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        task.completed = !task.completed;
        render(); 
    }
}

function handleDeleteTask(taskId) {
    tasks = tasks.filter(t => t.id !== taskId);
    render(); 
}

function initializeApp() {
    tasks = loadTasks();

    addTaskButton.addEventListener('click', handleAddTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleAddTask();
        }
    });

    render();
}

document.addEventListener('DOMContentLoaded', initializeApp);