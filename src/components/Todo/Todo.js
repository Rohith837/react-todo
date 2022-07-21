import React, { Fragment } from 'react';
import classes from './index.module.css'
const Todo = ({ text, deleteItem }) => {
	return (
		<Fragment>
			<div className={classes.todo_style}>
				<i className="fa fa-times" aria-hidden="true" onClick={()=>deleteItem(text)}/>
				<li>{text}</li>
			</div>
		</Fragment>
	);
};

export default Todo;
