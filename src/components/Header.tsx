import React, { FC, useState } from 'react';
import CreateTodo from './CreateTodo';
import MyModal from './UI/MyModal';
import MyButton from './UI/MyButton';

const Header: FC = () => {
	const [modalActive, setModalActive] = useState(false);

	const open = () => setModalActive(true);
	const close = () => setModalActive(false);

	return (
		<>
			<header className='header'>
				<div className='header__wrapper'>
					<h2 className='header__title'>ToDo</h2>
					<MyButton classes='myButton_white' onClick={open}>
						Создать задачу
					</MyButton>
				</div>
			</header>
			<MyModal
				active={modalActive}
				closeModal={close}
				title='Создание новой задачи'>
				<CreateTodo closeModal={close} />
			</MyModal>
		</>
	);
};

export default Header;
