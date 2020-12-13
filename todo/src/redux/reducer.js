import { ADD_TODO, TOGGLE_STATUS, RESET_DATA, DELETE_TODO } from './actionTypes';
import { loadData, saveData } from './localstorage';

export const initState = {
    todo: loadData('tasks') || [],
    completed: loadData('completed') || []
};

export default (state = initState, { type, payload }) => {
    switch (type) {
        case ADD_TODO:
            let data = [ ...state.todo, payload ];
            saveData('tasks', data);
            return {
                ...state,
                todo: [ ...state.todo, payload ]
            };
        case TOGGLE_STATUS:
            let toggleItem = state.todo.find((item) => item.id === payload);
            let completedData1 = [];
            if (toggleItem.status == true) {
                completedData1 = state.completed.filter((a) => a.id != payload);
            } else {
                completedData1 = [ ...state.completed, toggleItem ];
            }
            toggleItem.status = !toggleItem.status;
            let toggleData = state.todo.filter((item) => (item.id === payload ? toggleItem : item));
            saveData('tasks', toggleData);
            saveData('completed', completedData1);
            return {
                ...state,
                completed: completedData1,
                todo: state.todo.filter((item) => (item.id === payload ? toggleItem : item))
            };
        case RESET_DATA:
            for (let i = 0; i < state.todo.length; i++) {
                state.todo[i].status = false;
            }
            saveData('tasks', state.todo);
            saveData('completed', []);

            return {
                ...state,
                todo: state.todo,
                completed: []
            };
        case DELETE_TODO:
            let task = state.todo.filter((item) => item.id !== payload);
            saveData('tasks', task);
            let completedData = state.completed.filter((item) => item.id !== payload);
            saveData('completed', completedData);

            return {
                ...state,
                todo: state.todo.filter((item) => item.id !== payload),
                completed: completedData
            };
        default:
            return state;
    }
};
