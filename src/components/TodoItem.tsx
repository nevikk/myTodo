import React, { FC } from 'react';
import { ITodo } from '../models/models';
import MyButton from './UI/MyButton';

interface TodoItemProps {
	todo: ITodo;
	clickHandler: (todo: ITodo) => void;
	removeTodo: (remove: ITodo, event: React.MouseEvent) => void;
}

const TodoItem: FC<TodoItemProps> = ({ todo, removeTodo, clickHandler }) => {
	const classes = ['todo__item item-todo', todo.status];

	return (
		<li className={classes.join(' ')} onClick={() => clickHandler(todo)}>
			<div className='item-todo__body'>
				<p className='item-todo__name'>Для: {todo.forUser}</p>
				<p className='item-todo__title'>{todo.title}</p>
			</div>
			<MyButton
				onClick={(event) => removeTodo(todo, event)}
				classes={['item-todo__delete', `myButton_${todo.status}`].join(' ')}>
				Удалить
			</MyButton>
		</li>
	);
};

export default TodoItem;
