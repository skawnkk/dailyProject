import {useParams} from 'next/navigation'
import React from 'react'
import {useCreateTodo} from '../../../api/daily'
import {useInput} from '../../../hooks/useInput'

function TodoInput() {
  const {id} = useParams()
  const {mutate} = useCreateTodo(id)
  const {value, onChange, reset} = useInput()
  const addTodo = () => {
    mutate(value)
    reset()
  }
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addTodo()
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value)
  }
  return (
    <div>
      <input
        value={value}
        contentEditable
        placeholder="오늘 해야 할 일을 입력하세요."
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <button onClick={addTodo}>+</button>
    </div>
  )
}

export default TodoInput
