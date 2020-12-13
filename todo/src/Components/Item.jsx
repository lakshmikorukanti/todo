import React from 'react';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { Grid } from '@material-ui/core';
import './Todolist.css';
export default function Item({ handleDelete, handleToggle, a, styling }) {
    return (
        <Grid item container lg={12} className={`${styling}`} key={a.id}>
            <Grid item lg={9} onClick={() => handleToggle(a.id)}>
                {a.title}
            </Grid>
            <Grid item lg={3} onClick={() => handleDelete(a.id)}>
                <DeleteForeverIcon />
            </Grid>
        </Grid>
    );
}
