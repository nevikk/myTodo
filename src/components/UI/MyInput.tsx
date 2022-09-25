import React, { FC } from 'react';

interface MyInputProps {
	value: string | undefined;
	onChange: (inputValue: React.ChangeEvent<HTMLInputElement>) => void;
	type: string;
	placeholder: string;
	classes?: string;
}

const MyInput: FC<MyInputProps> = ({
	value,
	onChange,
	type,
	placeholder,
	classes,
}) => {
	return (
		<input
			value={value}
			onChange={onChange}
			className={[classes, 'myInput'].join(' ')}
			type={type}
			placeholder={placeholder}
		/>
	);
};

export default MyInput;
