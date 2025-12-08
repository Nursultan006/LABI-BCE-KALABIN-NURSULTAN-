// lab15/storage.js

const STORAGE_KEY = 'todoListTasks';

/**
 * Загружает список задач из LocalStorage.
 * @returns {Array<Object>} Массив задач или пустой массив, если данных нет.
 */
export function loadTasks() {
    const data = localStorage.getItem(STORAGE_KEY);
    try {
        // Парсим строку JSON обратно в JavaScript-объект
        return data ? JSON.parse(data) : [];
    } catch (e) {
        console.error("Ошибка при загрузке задач из LocalStorage:", e);
        return [];
    }
}

/**
 * Сохраняет текущий список задач в LocalStorage.
 * @param {Array<Object>} tasks - Массив задач для сохранения.
 */
export function saveTasks(tasks) {
    // Преобразуем JavaScript-объект в строку JSON для сохранения
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}