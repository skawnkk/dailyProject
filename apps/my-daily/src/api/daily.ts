import {UseQueryResult, useMutation, useQuery, useQueryClient} from '@tanstack/react-query'
import {Daily} from '../types/daily'
export const useGetDaily = (id: string): UseQueryResult<Daily> => {
  return useQuery(['daily'], async () => {
    const data = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/schedule/daily/${id}`)
    return data.json()
  })
}

export const useUpdateTodo = (dailyId: string) => {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: async ({todoId, value}: {todoId: string; value: string}) => {
      return fetch(`${process.env.NEXT_PUBLIC_SERVER}/schedule/daily/${dailyId}/todo`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          todoId,
          value,
        }),
      })
    },
    onSuccess: async data => {
      const {id, done} = await data.json()
      const previousData = queryClient.getQueryData(['daily']) as Daily
      const updatedTodos = previousData.todos.map(todo => {
        return todo.todo_id === id ? {...todo, done} : todo
      })
      queryClient.setQueryData(['daily'], (prev: Daily) => ({...prev, todos: updatedTodos}))
      return {previousData}
    },
  })

  return mutation
}
