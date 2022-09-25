import React, { useContext, useEffect, useState } from 'react';
import TodoList from './components/TodoList';
import TodoRedact from './components/TodoRedact';
import { TodoContext } from './context/TodosContext';
import Header from './components/Header';
import { ITodo } from './models/models';
import MyResize from './components/MyResize';

function App() {
	const [redactingTodo, setRedactingTodo] = useState<ITodo | undefined>(undefined);
	const [listWidth, setListWidth] = useState(250);

	const { todos, addTodo } = useContext(TodoContext);

	useEffect(() => {
		fetch('https://62ebc3d955d2bd170e75a1e4.mockapi.io/todos')
			.then(res => {
				return res.json();
			})
			.then(json => {
				addTodo(json);
			});
	}, []);

	const clickHandler = (todo: ITodo) => {
		const newRedactingTodo = todos.find(item => item.id === todo.id);
		setRedactingTodo(newRedactingTodo)
	};

	useEffect(() => {
		if(!todos.find(item => item.id === redactingTodo?.id)) {
			setRedactingTodo(undefined);
		} else {
			const newRedactingTodo = todos.find(item => item.id === redactingTodo?.id);
			setRedactingTodo(newRedactingTodo)
		}
	}, [todos]);

	return (
		<>
			<Header />
			<div className='todo__wrapper'>
				<TodoList setListWidth={setListWidth} listWidth={listWidth} todos={todos} clickHandler={clickHandler} />
				<MyResize />
				<TodoRedact setListWidth={setListWidth} listWidth={listWidth} todo={redactingTodo} setRedactingTodo={setRedactingTodo} />
			</div>
		</>
	);
}

export default App;
