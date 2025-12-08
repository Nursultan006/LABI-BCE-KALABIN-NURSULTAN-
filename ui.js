// lab15/ui.js

let taskList;

/**
 *
 * @param {HTMLElement} listElement
 */
export function initUI(listElement) {
    taskList = listElement;
}

/**
 
 * @param {Object} task 
 * @param {Function} onToggle 
 * @param {Function} onDelete 
 * @returns {HTMLElement} 
 */
function createListItem(task, onToggle, onDelete) {
    const listItem = document.createElement('li');
    
    
    if (task.completed) {
        listItem.classList.add('completed');
    }
    
    
    const taskSpan = document.createElement('span');
    taskSpan.textContent = task.text;
    
    taskSpan.addEventListener('click', () => onToggle(task.id)); 
    
    
    const deleteButton = document.createElement('button');
    deleteButton.textContent = '❌';
    deleteButton.className = 'delete-button';
    
    deleteButton.addEventListener('click', (event) => {
        
        event.stopPropagation(); 
        onDelete(task.id); 
    });

    listItem.appendChild(taskSpan);
    listItem.appendChild(deleteButton);

    return listItem;
}

/**
 
 * @param {Array<Object>} tasks - Массив задач.
 * @param {Function} onToggle - Коллбэк для переключения.
 * @param {Function} onDelete - Коллбэк для удаления.
 */
export function renderTasks(tasks, onToggle, onDelete) {
    
    taskList.innerHTML = ''; 
    tasks.forEach(task => {
        const item = createListItem(task, onToggle, onDelete);
        taskList.appendChild(item);
    });
}