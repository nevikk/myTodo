import React, { createContext, ReactNode, useState } from 'react';
import { ITodo } from '../models/models';

interface ITodoContext {
	todos: ITodo[];
	addTodo: (todo: ITodo[]) => void;
	refreshTodos: (todos: ITodo[]) => void;
}

export const TodoContext = createContext<ITodoContext>({
	todos: [],
	addTodo: () => {},
	refreshTodos: () => {},
});

export const TodosState = ({ children }: { children: ReactNode }) => {
	const [todos, setTodos] = useState<ITodo[]>([]);

	const addTodo = (todo: ITodo[]) => setTodos([...todo, ...todos]);
	const refreshTodos = (todos: ITodo[]) => {
		setTodos(todos);
	};

	return (
		<TodoContext.Provider value={{ todos, addTodo, refreshTodos }}>
			{children}
		</TodoContext.Provider>
	);
};
