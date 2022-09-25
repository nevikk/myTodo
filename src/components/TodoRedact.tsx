import React, { FC, useContext, useEffect, useState } from 'react';
import { TodoContext } from '../context/TodosContext';
import { ITodo } from '../models/models';
import MyButton from './UI/MyButton';
import MyInput from './UI/MyInput';
import noRedactImg from '../img/no-redact.svg';

interface TodoRedactProps {
	todo: ITodo | undefined;
	listWidth: number;
	setListWidth: (width: number) => void;
	setRedactingTodo: (todo: ITodo | undefined) => void;
}

const TodoRedact: FC<TodoRedactProps> = ({ todo, listWidth, setListWidth, setRedactingTodo }) => {
	const [todoForUser, setForUser] = useState('');
	const [todoTitle, setTodoTitle] = useState('');
	const [todoStatus, setTodoStatus] = useState('');

	const { todos, refreshTodos } = useContext(TodoContext);

	useEffect(() => {
		if (todo) {
			setForUser(todo?.forUser);
			setTodoTitle(todo?.title);
			setTodoStatus(todo?.status);
		}
	}, [todo, todos]);

	const clickStatusHandler = (status: string) => {
		setTodoStatus(status);
		const newTodos = todos.map(item =>
			item.id === todo?.id ? { ...item, status } : item,
		);
		refreshTodos(newTodos);
	};

	const redactTodo = (forUser: string, title: string) => {
		const newTodos = todos.map(item =>
			item.id === todo?.id ? { ...item, forUser, title } : item,
		);
		refreshTodos(newTodos);
	};

	const allowDrop = (event: React.DragEvent<HTMLDivElement>) => {
		setListWidth(event.clientX);
		event.preventDefault();
	};

	const clickCloseHandler = () => {
		setRedactingTodo(undefined);
	}

	return (
		<div onDragOver={allowDrop} className='todo__redact redact-todo'>
			<div onClick={clickCloseHandler} className="redact-todo__close">
				<span></span>
				<span></span>
			</div>
			{todo ? (
				<>
					<h2 className='redact-todo__title'>Редактирование задачи</h2>
					<div className='redact-todo__items'>
						<div className='redact-todo__item'>
							<label>
								<p className='redact-todo__input-title'>Для кого задача</p>
								<MyInput
									classes='redact-todo__input'
									value={todoForUser}
									onChange={e => setForUser(e.target.value)}
									type='text'
									placeholder='Для кого задача'
								/>
							</label>
						</div>
						<div className='redact-todo__item'>
							<label>
								<p className='redact-todo__input-title'>Текст задачи</p>
								<MyInput
									classes='redact-todo__input'
									value={todoTitle}
									onChange={e => setTodoTitle(e.target.value)}
									type='text'
									placeholder='Введите задачу'
								/>
							</label>
						</div>
						<div className='redact-todo__item'>
							<MyButton onClick={() => redactTodo(todoForUser, todoTitle)}>
								Сохранить изменения
							</MyButton>
						</div>
						<div className='redact-todo__item'>
							<div className='redact-todo__status-btns'>
								<p className='redact-todo__status-title'>
									Изменить статус задачи
								</p>
								<MyButton
									classes={
										todoStatus !== 'waiting'
											? [
													'redact-todo__btn',
													'myButton_waiting',
													'not-active',
											  ].join(' ')
											: ['redact-todo__btn', 'myButton_waiting'].join(' ')
									}
									onClick={() => clickStatusHandler('waiting')}>
									Ожидает
								</MyButton>
								<MyButton
									classes={
										todoStatus !== 'progress'
											? [
													'redact-todo__btn',
													'myButton_progress',
													'not-active',
											  ].join(' ')
											: ['redact-todo__btn', 'myButton_progress'].join(' ')
									}
									onClick={() => clickStatusHandler('progress')}>
									В процессе
								</MyButton>
								<MyButton
									classes={
										todoStatus !== 'completed'
											? [
													'redact-todo__btn',
													'myButton_completed',
													'not-active',
											  ].join(' ')
											: ['redact-todo__btn', 'myButton_completed'].join(' ')
									}
									onClick={() => clickStatusHandler('completed')}>
									Выполнено
								</MyButton>
							</div>
						</div>
					</div>
				</>
			) : (
				<div className='redact-todo__body'>
					<h2 className='redact-todo__title'>
						Вы не выбрали задачу для редактирования
					</h2>
					<img src={noRedactImg} alt='' />
				</div>
			)}
		</div>
	);
};

export default TodoRedact;
