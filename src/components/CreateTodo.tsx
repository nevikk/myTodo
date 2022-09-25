import React, { FC, useContext, useState } from 'react';
import MyButton from './UI/MyButton';
import MyInput from './UI/MyInput';
import { TodoContext } from './../context/TodosContext';

interface CreateTodoProps {
	closeModal: () => void;
}

const CreateTodo: FC<CreateTodoProps> = ({closeModal}) => {
	const [todoForUser, setTodoForUser] = useState('');
	const [todoTitle, setTodoTitle] = useState('');
	// Состояние ошибки заполнения полей
	const [errorValidate, setErrorValidate] = useState(false);

	const { todos, addTodo } = useContext(TodoContext);

	const submitHandler = (event: React.FormEvent) => {
		event.preventDefault();
		// Валидация формы, проверяем, что поля не пустые
		if (todoForUser && todoTitle){
			setErrorValidate(false);
			closeModal();
			addTodo([
				{
					// Так как нет бека, то уникальный id сформируем из даты
					id: todos.length > 0 ? todos[0].id + 1 : 1,
					forUser: todoForUser,
					title: todoTitle,
					status: 'waiting',
				},
			]);
			setTodoForUser('');
			setTodoTitle('');
		} else {
			setErrorValidate(true);
		}
	};

	return (
		<form onSubmit={submitHandler} className={errorValidate ? 'todo-form _error' : 'todo-form'}>
			<MyInput
				value={todoForUser}
				onChange = {(e) => {setTodoForUser(e.target.value)}}
				type='text'
				classes='todo-form__name'
				placeholder='Введите для кого задача'
			/>
			<MyInput
				value={todoTitle}
				onChange = {(e) => {setTodoTitle(e.target.value)}}
				type='text'
				classes='todo-form__name'
				placeholder='Введите задчу'
			/>
			{errorValidate && <div className='todo-form__error'>Заполните все поля</div>}
			<MyButton classes='todo-form__btn' type='submit'>
				Создать
			</MyButton>
		</form>
	);
};

export default CreateTodo;
