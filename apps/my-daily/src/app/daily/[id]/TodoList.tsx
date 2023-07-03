import {useParams} from 'next/navigation'
import React from 'react'
import {useUpdateTodo} from '../../../api/daily'
import {Daily} from '../../../types/daily'

function TodoList({list}: {list: Daily['todos']}) {
  const {id: dailyId} = useParams()
  const mutation = useUpdateTodo(dailyId)
  const onChangeCheck = (id: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    mutation.mutate({todoId: id, value: e.target.checked ? 'Y' : 'N'})
  }

  return (
    <div>
      {list.map(li => (
        <div key={li.todoId}>
          <input
            type="checkbox"
            id={li.todo}
            name={li.todo}
            checked={li.done === 'Y'}
            onChange={onChangeCheck(li.todoId)}
          />
          <label htmlFor={li.todo}>{li.todo}</label>
        </div>
      ))}
    </div>
  )
}

export default TodoList
