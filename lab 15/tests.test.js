
const localStorageMock = (function() {
    let store = {};
    return {
        getItem: function(key) {
            return store[key] || null;
        },
        setItem: function(key, value) {
            store[key] = value.toString();
        },
        clear: function() {
            store = {};
        },
        removeItem: function(key) {
            delete store[key];
        }
    };
})();


Object.defineProperty(global, 'localStorage', { value: localStorageMock });


import { loadTasks, saveTasks } from './storage.js';
import { generateUniqueId } from './utils.js';



describe('Utils Module (generateUniqueId)', () => {
    test('generateUniqueId должен возвращать строку', () => {
        expect(typeof generateUniqueId()).toBe('string');
    });

    test('generateUniqueId должен возвращать уникальные ID', () => {
        const id1 = generateUniqueId();
        
        setTimeout(() => {
            const id2 = generateUniqueId();
            expect(id1).not.toBe(id2);
        }, 5); 
    });
});


describe('Storage Module (loadTasks, saveTasks)', () => {
    
    beforeEach(() => {
        localStorage.clear();
    });

    test('loadTasks должен возвращать пустой массив, если хранилище пусто', () => {
        expect(loadTasks()).toEqual([]);
    });

    test('saveTasks должен корректно сохранять данные в LocalStorage', () => {
        const testTasks = [
            { id: '1', text: 'Починить код', completed: false }
        ];
        
        saveTasks(testTasks);
        
        // 
        expect(localStorage.getItem('todoListTasks')).toBe(JSON.stringify(testTasks));
    });

    test('loadTasks должен корректно загружать сохраненные данные', () => {
        const testTasks = [
            { id: '1', text: 'Позвонить маме', completed: true },
            { id: '2', text: 'Купить хлеб', completed: false }
        ];
        
        
        localStorage.setItem('todoListTasks', JSON.stringify(testTasks));

        const loadedTasks = loadTasks();

        
        expect(loadedTasks).toEqual(testTasks);
    });
});