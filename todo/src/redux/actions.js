import { ADD_TODO, TOGGLE_STATUS, RESET_DATA, DELETE_TODO } from './actionTypes';
import { v4 as uuid } from 'uuid';
export const addTodo = (payload) => ({
    type: ADD_TODO,
    payload: {
        id: uuid(),
        title: payload,
        status: false
    }
});

export const toggleTodo = (payload) => {
    console.log(payload, 'toggle');
    return {
        type: TOGGLE_STATUS,
        payload
    };
};

export const resetData = () => {
    return {
        type: RESET_DATA
    };
};

export const deleteTodo = (payload) => ({
    type: DELETE_TODO,
    payload
});
