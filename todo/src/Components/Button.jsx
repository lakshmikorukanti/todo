import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
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

export default function ButtonComp({ handlefun, variable }) {
    const classes = useStyles();
    return (
        //button for add,reset,filter by # and all
        <Button
            variant="contained"
            color="secondary"
            onClick={(e) => handlefun(e)}
            className={variable == 'Add' ? classes.addButton : classes.button}
        >
            {variable}
        </Button>
    );
}
