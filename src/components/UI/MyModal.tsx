import React, { FC, ReactNode } from 'react';

interface MyModalProps {
	children: ReactNode;
	title: string;
	active: boolean;
	closeModal: () => void;
}

const MyModal: FC<MyModalProps> = ({ children, active, title, closeModal }) => {
	return (
		<div className='modal'>
			<div
				onClick={closeModal}
				className={active ? 'modal__backdrop _active' : 'modal__backdrop'}>
				<div
					onClick={e => {
						e.stopPropagation();
					}}
					className={active ? 'modal__item _active' : 'modal__item'}>
					<h2 className='modal__title'>{title}</h2>
					{children}
				</div>
			</div>
		</div>
	);
};

export default MyModal;
