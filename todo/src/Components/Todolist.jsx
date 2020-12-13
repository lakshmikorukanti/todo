import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTodo, deleteTodo } from '../redux/actions';
import { Grid } from '@material-ui/core';
import { loadData, saveData } from '../redux/localstorage';
import './Todolist.css';
import Item from './Item';
export default function Todolist({ filterBy }) {
    const { todo } = useSelector((state) => state.app);
    const { completed } = useSelector((state) => state.app);
    var todoData = [];
    var completedData = [];
    if (filterBy == 'hash') {
        todoData = todo.filter((a) => a.title[0] == '#');
        completedData = completed.filter((a) => a.title[0] == '#');
    } else {
        todoData = todo;
        completedData = completed;
    }
    const dispatch = useDispatch();
    const handleToggle = (id) => {
        dispatch(toggleTodo(id));
    };
    const handleDelete = (id) => {
        dispatch(deleteTodo(id));
    };
    return (
        <Grid style={{ padding: '30px', alignItems: 'center', paddingLeft: '20%' }}>
            <Grid style={{ backgroundColor: 'white', padding: '30px' }}>
                <h1>Incomplete task:</h1>
                {todoData.map(
                    (a) =>
                        a.title[0] == '#' && a.status == false ? (
                            <Item
                                styling="yellow"
                                handleDelete={handleDelete}
                                handleToggle={handleToggle}
                                a={a}
                                key={a.id}
                            />
                        ) : a.status == false ? (
                            <Item
                                styling="red"
                                handleDelete={handleDelete}
                                handleToggle={handleToggle}
                                a={a}
                                key={a.id}
                            />
                        ) : null
                )}
            </Grid>
            <Grid style={{ backgroundColor: 'white', padding: '30px', marginTop: '20px' }}>
                <h1>Completed Task:</h1>
                {completedData.map(
                    (a) =>
                        a.status == true ? (
                            <Item
                                styling="green"
                                handleDelete={handleDelete}
                                handleToggle={handleToggle}
                                a={a}
                                key={a.id}
                            />
                        ) : null
                )}
            </Grid>
        </Grid>
    );
}
