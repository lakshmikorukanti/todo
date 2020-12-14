import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTodo, deleteTodo } from '../redux/actions';
import { Grid } from '@material-ui/core';
import './Todolist.css';
import Item from './Item';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
export default function Todolist({ filterBy }) {
    const { todo } = useSelector((state) => state.app);
    const { completed } = useSelector((state) => state.app);
    const [ filterData, setFilterData ] = useState([]);
    var todoData = [];
    var completedData = [];
    //filtering with hash as starting letter and storing it into localstorage
    if (filterBy == 'hash') {
        todoData = todo.filter((a) => a.title[0] == '#');
        completedData = completed.filter((a) => a.title[0] == '#');
    } else {
        todoData = todo;
        completedData = completed;
    }
    const dispatch = useDispatch();
    const handleToggle = (id) => {
        //toggling the status of the todo
        dispatch(toggleTodo(id));
    };
    const handleDelete = (id) => {
        //deleting the todo
        dispatch(deleteTodo(id));
    };
    const handleHash = (a) => {
        //filtering all the hash todos
        let data = [];
        for (let i = 0; i < todo.length; i++) {
            let x = -1;
            x = todo[i].title.indexOf(a);
            if (x != -1) {
                data.push(todo[i]);
            }
        }
        setFilterData(data);
        console.log(data);
    };
    return (
        //maping of incomplete task,completed tasks and filtered tasks
        <Grid className="main" item sm={12} md={12} xs={12}>
            <Grid className="taskDiv">
                <h1>Incomplete task:</h1>
                {todoData.map(
                    (a) =>
                        a.title[0] == '#' && a.status == false ? (
                            <Grid item container lg={12} key={a.id} className="yellow">
                                <Grid item lg={9} onClick={() => handleHash(a.title)}>
                                    {a.title}
                                </Grid>
                                <Grid item lg={3} onClick={() => handleDelete(a.id)}>
                                    <DeleteForeverIcon />
                                </Grid>
                            </Grid>
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
            <Grid className="taskDiv">
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

            <Grid>
                {filterData.length > 0 ? (
                    <Grid className="taskDiv">
                        <h1>After Filtering:</h1>
                        {filterData.map((a) => (
                            <Grid item container lg={12} key={a.id} className="yellow">
                                <Grid item lg={9}>
                                    {a.title}
                                </Grid>
                            </Grid>
                        ))}
                    </Grid>
                ) : null}
            </Grid>
        </Grid>
    );
}
