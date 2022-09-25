import React, { FC, useContext, useMemo, useState } from 'react';
import { TodoContext } from '../context/TodosContext';
import { ITodo } from './../models/models';
import TodoItem from './TodoItem';
import MyInput from './UI/MyInput';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import MySort from './UI/MySort';

interface TodoListProps {
	todos: ITodo[];
	clickHandler: (todo: ITodo) => void;
	listWidth: number;
	setListWidth: (width: number) => void;
}

const TodoList: FC<TodoListProps> = ({
	todos,
	clickHandler,
	listWidth,
	setListWidth,
}) => {
	// Состояние инпута поиска
	const [searchQuery, setSearchQuery] = useState('');
	const [sortTitle, setSortTitle] = useState('Сортировать');
	const [sortValue, setSortValue] = useState('');
	// console.log(searchedAndSortedTodos);
	// Берем функцию обновления массива задач
	const { refreshTodos } = useContext(TodoContext);

	// В функции удаления задачи, обновим основной массив задач на новый, в котором с помощью filter, мы удалили необходимую задачу
	const removeTodo = (remove: ITodo, event: React.MouseEvent) => {
		event.stopPropagation();
		refreshTodos(todos.filter(todo => remove.id !== todo.id));
	};

	// Функция поиска задачи в списке
	const searchedAndSortedTodos = useMemo(() => {
		const searchedTodos = todos.filter(todo =>
			todo.title.toLowerCase().includes(searchQuery.toLowerCase()),
		);
		if (sortValue) {
			let sortedTodos = searchedTodos;
			if (sortValue === 'completed' || sortValue === 'waiting' || sortValue === 'progress') {
				sortedTodos = [...searchedTodos].sort((firstTodo, secondTodo) => {
					if (firstTodo.status === sortValue && secondTodo.status !== sortValue) {
						return -1;
					} else if (firstTodo.status !== sortValue && secondTodo.status === sortValue){
						return 1;
					} else {
						return 0;
					}
				} )
			} else {
				sortedTodos = [...searchedTodos].sort((firstTodo, secondTodo) => {
					return firstTodo[sortValue].localeCompare(secondTodo[sortValue]);
				} )
			}
			return sortedTodos;
		}
		return searchedTodos;
	}, [searchQuery, todos, sortValue]);



	const allowDrop = (event: React.DragEvent<HTMLUListElement>) => {
		setListWidth(event.clientX);
		event.preventDefault();
	};

	const sortItemClickHandler = (event: React.MouseEvent<HTMLLIElement>, sortValue: string) => {
		const element = event.target as HTMLElement;
		setSortTitle(element.innerHTML);
		setSortValue(sortValue);
		
	}

	return (
		<ul
			onDragOver={allowDrop}
			style={{ width: listWidth > 300 ? `${listWidth}px` : '300px' }}
			className='todo__list'>
			<MyInput
				value={searchQuery}
				onChange={e => {
					setSearchQuery(e.target.value);
				}}
				classes='todo-form__name'
				type='text'
				placeholder='Поиск...' />
			<MySort title={sortTitle}>
				<li className='mySort__item' onClick={event => sortItemClickHandler(event, 'forUser')}>По имени пользователя</li>
				<li className='mySort__item' onClick={event => sortItemClickHandler(event, 'title')}>По задаче</li>
				<li className='mySort__item' onClick={event => sortItemClickHandler(event, 'completed')}>Сначала выполненные</li>
				<li className='mySort__item' onClick={event => sortItemClickHandler(event, 'progress')}>Сначала в процессе</li>
				<li className='mySort__item' onClick={event => sortItemClickHandler(event, 'waiting')}>Сначала ожидает</li>
			</MySort>
			{searchedAndSortedTodos.length ? (
				<TransitionGroup>
					{searchedAndSortedTodos.map((todo: ITodo) => (
						<CSSTransition timeout={300} key={todo.id} classNames="item">
							<TodoItem
								clickHandler={clickHandler}
								removeTodo={removeTodo}
								todo={todo}
							/>
						</CSSTransition>
					))}
				</TransitionGroup>
			) : (
				<div className='todo__none'>Задач не найдено</div>
			)}
		</ul>
	);
};

export default TodoList;
