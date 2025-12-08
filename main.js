// lab15/main.js
import * as Storage from './storage.js';
import * as UI from './ui.js';
import { generateUniqueId } from './utils.js';

let tasks = []; // 

// 
let taskList;
let taskInput;
let addTaskButton;

/**
 * 
 * 
 */
function render() {
    UI.renderTasks(tasks, handleToggleTask, handleDeleteTask);
    Storage.saveTasks(tasks); 
}

/**
 * 
 */
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
    render(); // 
}

/**
 * 
 * @param {string} taskId 
 */
function handleToggleTask(taskId) {
    
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        task.completed = !task.completed;
        render(); // 
    }
}

/**
 * 
 * @param {string} taskId 
 */
function handleDeleteTask(taskId) {
    //
    tasks = tasks.filter(t => t.id !== taskId);
    render(); // 
}

/**
 * 
 */
function initializeApp() {
    
    taskList = document.getElementById('taskList');
    taskInput = document.getElementById('taskInput');
    addTaskButton = document.getElementById('addTaskButton');

    
    UI.initUI(taskList);
    tasks = Storage.loadTasks();

    
    render();

    
    addTaskButton.addEventListener('click', handleAddTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleAddTask();
        }
    });
}


document.addEventListener('DOMContentLoaded', initializeApp);