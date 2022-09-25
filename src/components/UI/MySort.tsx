import React, {FC, ReactNode, useState, useEffect} from 'react';

interface MySortProps {
	title: string;
	children: ReactNode;
}

const MySort: FC<MySortProps> = ({ title, children }) => { 
	const [listActive, setListActive] = useState(false);

	const handleClickOutside = (event: MouseEvent) => {
		const target = event.target as HTMLElement;
		if (!target.closest('.mySort')) {
			setListActive(false);
		}
	}

	useEffect(() => {
		document.addEventListener('click', handleClickOutside);

		return function() {
			document.removeEventListener('click', handleClickOutside);
		}
	}, [])

	return (
		<div onClick={() => setListActive((prev) => !prev)} className="mySort">
			<button className='mySort__btn'>{title}</button>
			<ul className={listActive ? 'mySort__list active' : 'mySort__list'}>
				{children}
			</ul>
		</div>
	)
}

export default MySort;