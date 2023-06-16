import React from 'react'
import {YN} from '../../../types/daily'

interface TodoListType {
  list: Array<{idx: number; todo: string; checked: YN}>
}

function TodoList({list}: TodoListType) {
  const onChangeCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.checked)
  }

  return (
    <div>
      {list.map(li => (
        <div key={li.idx}>
          <input type="checkbox" id={li.todo} name={li.todo} checked={li.checked === YN.Y} onChange={onChangeCheck} />
          <label htmlFor={li.todo}>{li.todo}</label>
        </div>
      ))}
    </div>
  )
}

export default TodoList
