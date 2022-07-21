import React, { Fragment, useContext, useEffect, useState } from 'react';
import classes from './index.module.css';
import AuthContext from '../../store/auth-context';
import Todo from './Todo';
const Todos = () => {
	const ctx = useContext(AuthContext);
	const [ input, setInput ] = useState('');
	const [ itemList, setItemList ] = useState([]);
	useEffect(() => {
		fetchTodos();
	}, []);

	async function addTodo(text) {
		try {
			let response = await fetch('https://backend-ielts.herokuapp.com/addTodo', {
				method: 'POST',
				body: JSON.stringify({
					token: ctx.token,
					todo: text
				}),
				headers: { 'Content-Type': 'application/json' }
			});
			let data = await response.json();
			if (response.ok) {
				setItemList(data.todos);
			} else {
				throw new Error(data.error);
			}
		} catch (error) {
			alert(error.message);
		}
	}

	async function fetchTodos() {
		try {
			let response = await fetch('https://backend-ielts.herokuapp.com/todos', {
				method: 'POST',
				body: JSON.stringify({
					token: ctx.token
				}),
				headers: { 'Content-Type': 'application/json' }
			});
			let data = await response.json();
			if (response.ok) {
				setItemList(data.todos);
			} else {
				throw new Error(data.error);
			}
		} catch (error) {
			alert(error.message);
		}
	}

	function submitHandler(e) {
		e.preventDefault();
		if (input === '') return;
		setInput('');
		addTodo(input);
	}

	async function deleteItem(text) {
		try {
			let response = await fetch(`https://backend-ielts.herokuapp.com/${text}`, {
				method: 'DELETE',
				body: JSON.stringify({
					token: ctx.token
				}),
				headers: { 'Content-Type': 'application/json' }
			});
			let data = await response.json();
			if (response.ok) {
				setItemList(data.todos);
			} else {
				throw new Error(data.error);
			}
		} catch (error) {
			alert(error.message);
		}
	}

	function changeHandler(e) {
		setInput(e.target.value);
	}

	return (
		<Fragment>
			<div className={classes.main_div}>
				<div className={classes.center_div}>
					<br />
					<h1 className={classes.h1}> ToDo List </h1>
					<br /> 
					<form onSubmit={submitHandler}>
						<input
							className={classes.input}
							type="text"
							placeholder="Add a Items"
							value={input}
							onChange={changeHandler}
						/>
						<button className={classes.button}> + </button>
					</form>
					<ol>
						{itemList.map((item) => {
							return <Todo key={item} text={item} deleteItem={deleteItem} />;
						})}
					</ol>
				</div>
			</div>
		</Fragment>
	);
};

export default Todos;
