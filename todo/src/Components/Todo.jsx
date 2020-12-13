import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { addTodo, resetData } from '../redux/actions';
import { TextField, Grid, Button } from '@material-ui/core';
import Todolist from './Todolist';
const useStyles = makeStyles((theme) => ({
    align: {
        height: '1000px'
    },
    formM: {
        marginTop: '25%',
        backgroundColor: 'white',
        padding: '10%',
        width: '400px',
        marginLeft: '14%'
    },
    button: {
        margin: '30px',
        padding: '10px 20px',
        borderRadius: '10px'
    },
    addButton: {
        marginLeft: '30px',
        padding: '10px 30px',
        marginTop: '5px',
        borderRadius: '10px'
    }
}));
export default function Todo() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [ todo, setTodo ] = useState('');
    const handleTodo = (e) => {
        e.preventDefault();
        dispatch(addTodo(todo));
        setTodo('');
    };
    const handleReset = (e) => {
        e.preventDefault();
        dispatch(resetData('reset'));
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
        <Grid container item lg={12}>
            <Grid item lg={6} className={classes.align}>
                <Grid className={classes.formM}>
                    <Grid>
                        <TextField
                            id="outlined-basic"
                            label="add task..."
                            variant="outlined"
                            type="text"
                            placeholder="add task..."
                            value={todo}
                            onKeyUp={(e) => handleKey(e)}
                            onChange={(e) => setTodo(e.target.value)}
                        />

                        <Button
                            variant="contained"
                            className={classes.addButton}
                            color="primary"
                            onClick={(e) => handleTodo(e)}
                        >
                            Add
                        </Button>
                    </Grid>
                    <Grid>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={(e) => handleReset(e)}
                            className={classes.button}
                        >
                            Reset
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item lg={6}>
                <Todolist />
            </Grid>
        </Grid>
    );
}
