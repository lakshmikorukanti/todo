import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { addTodo, resetData } from '../redux/actions';
import { TextField, Grid } from '@material-ui/core';
import { loadData, saveData } from '../redux/localstorage';
import Todolist from './Todolist';
import ButtonComp from './Button';
const useStyles = makeStyles((theme) => ({
    align: {
        height: '100%'
    },
    formM: {
        marginTop: '25%',
        backgroundColor: 'white',
        padding: '10%',
        width: '400px',
        marginLeft: '14%'
    },
    formControl: {
        margin: theme.spacing(1),
        width: '100%'
    }
}));
export default function Todo() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [ todoItem, setTodo ] = useState('');
    let filter = loadData('filterBy') || 'all';
    const [ hashValue, setHashValue ] = useState('');
    const [ filterBy, setfilter ] = useState(filter);
    const { todo } = useSelector((state) => state.app);
    let hashData = todo.filter((a) => a.title[0] == '#');
    console.log(hashData, hashValue);
    const handleTodo = (e) => {
        //adding todo to the store
        e.preventDefault();
        dispatch(addTodo(todoItem));
        setTodo('');
    };
    const handleReset = (e) => {
        // resets to inital values
        e.preventDefault();
        dispatch(resetData('reset'));
    };
    const handleAll = () => {
        //filtering by all
        setfilter('all');
        saveData('filterBy', 'all');
    };
    const handleHash = (e) => {
        //filtering by tasks which start with #
        setfilter(e.target.value);
        console.log(filterBy);
        saveData('filterBy', 'hash');
    };
    const handleKey = (e) => {
        e.preventDefault();
        switch (e.keyCode) {
            case 13: {
                // onEnter
                handleTodo(e);
                break;
            }
            default: {
                return;
            }
        }
    };
    return (
        //input tag and buttons for add,reset,# and all
        <Grid container item lg={12}>
            <Grid item lg={6} className={classes.align} sm={12} md={12} xs={12}>
                <Grid className={classes.formM} item lg={12}>
                    <Grid>
                        <TextField
                            id="outlined-basic"
                            label="add task..."
                            variant="outlined"
                            type="text"
                            placeholder="add task..."
                            value={todoItem}
                            onKeyUp={(e) => handleKey(e)}
                            onChange={(e) => setTodo(e.target.value)}
                        />

                        <ButtonComp handlefun={handleTodo} variable="Add" />
                    </Grid>
                    <Grid>
                        <ButtonComp handlefun={handleReset} variable="Reset" />
                        <ButtonComp handlefun={handleAll} variable="All" />
                        <ButtonComp handlefun={handleHash} variable="#" />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item lg={6} sm={12} md={12} xs={12}>
                <Todolist filterBy={filterBy} />
            </Grid>
        </Grid>
    );
}
