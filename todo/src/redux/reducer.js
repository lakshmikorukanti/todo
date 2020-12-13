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
            let target1 = state.todo.find((item) => item.id === payload);
            target1.status = !target1.status;
            let data2 = state.todo.filter((item) => (item.id === payload ? target1 : item));
            saveData('tasks', data2);
            let target2 = state.todo.filter((item) => item.status == true);
            saveData('completed', target2);
            return {
                ...state,
                completed: target2,
                todo: state.todo.filter((item) => (item.id === payload ? target1 : item))
            };
        case RESET_DATA:
            for (let i = 0; i < state.todo.length; i++) {
                state.todo[i].status = false;
            }
            saveData('tasks', state.todo);
            console.log(state.todo);
            return {
                ...state,
                todo: state.todo,
                completed: []
            };
        case DELETE_TODO:
            let data1 = state.todo.filter((item) => item.id !== payload);
            saveData('tasks', data1);

            let target4 = state.todo.filter((item) => item.status == true);
            saveData('completed', target4);

            return {
                ...state,
                todo: state.todo.filter((item) => item.id !== payload),
                completed: target4
            };
        default:
            return state;
    }
};
