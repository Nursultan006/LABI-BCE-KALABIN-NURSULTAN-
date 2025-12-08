// lab15/utils.js

/**
 * Генерирует уникальный ID, основанный на метке времени.
 * @returns {string} Уникальный ID.
 */
export function generateUniqueId() {
    return Date.now().toString(); 
}