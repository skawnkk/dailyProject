import {useParams} from 'next/navigation'
import React from 'react'
import {useUpdateTodo} from '../../../api/daily'
import {YN} from '../../../types/daily'

interface TodoListType {
  list: Array<{todo_id: string; todo: string; done: YN}>
}

function TodoList({list}: TodoListType) {
  const {id: dailyId} = useParams()
  const mutation = useUpdateTodo(dailyId)
  const onChangeCheck = (id: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    mutation.mutate({todoId: id, value: e.target.checked ? 'Y' : 'N'})
  }

  return (
    <div>
      {list.map(li => (
        <div key={li.todo_id}>
          <input
            type="checkbox"
            id={li.todo}
            name={li.todo}
            checked={li.done === 'Y'}
            onChange={onChangeCheck(li.todo_id)}
          />
          <label htmlFor={li.todo}>{li.todo}</label>
        </div>
      ))}
    </div>
  )
}

export default TodoList
