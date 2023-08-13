import {useParams} from 'next/navigation'
import React from 'react'
import {useDeleteTodo, useUpdateTodo} from '../../../api/todo'
import {Daily} from '../../../types/daily'

function TodoList({list}: {list: Daily['todos']}) {
  const {id: dailyId} = useParams()
  const updateMutation = useUpdateTodo(dailyId)
  const deleteMutation = useDeleteTodo(dailyId)
  const changeCheck = (id: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    updateMutation.mutate({todoId: id, value: e.target.checked ? 'Y' : 'N'})
  }
  const deleteTodo = (id: string) => () => {
    deleteMutation.mutate(id)
  }

  return (
    <div>
      {list.map(li => (
        <div key={li.todoId} className={'flex gap-1'}>
          <div className={'flex gap-1'}>
            <input
              type="checkbox"
              id={li.todo}
              name={li.todo}
              checked={li.done === 'Y'}
              onChange={changeCheck(li.todoId)}
            />
            <label className={'text-sm'} htmlFor={li.todo}>
              {li.todo}
            </label>
          </div>
          <div className={'leading-none'} onClick={deleteTodo(li.todoId)}>
            ×
          </div>
        </div>
      ))}
    </div>
  )
}

export default TodoList
