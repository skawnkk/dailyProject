import classNames from "classnames";
import React, {ReactElement} from 'react';
interface CellProps{
	className?:string
	onClick?:()=>void
	children: ReactElement
}
function Cell({className='', onClick = ()=>{}, children}:CellProps) {
	return (
		<div
			className={classNames(className, "p-[6px] text-sm font-normal flex whitespace-nowrap min-w-[80px] justify-center fixed border-r bg-white bg-opacity-50")}
			onClick={onClick}>
			{children}
		</div>
	);
}

export default Cell;
