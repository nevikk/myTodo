import React, { FC, ReactNode } from 'react';

interface IMyButton {
	children: ReactNode;
	type?: 'submit' | 'reset';
	classes?: string;
	onClick?: (event: React.MouseEvent) => void;
}

const MyButton: FC<IMyButton> = ({ children, type, classes, onClick }) => {
	return (
		<button onClick={onClick} type={type} className={[classes, 'myButton'].join(' ')}>
			{children}
		</button>
	);
};

export default MyButton;
