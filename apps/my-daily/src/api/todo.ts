import {UseQueryResult, useMutation, useQuery, useQueryClient} from '@tanstack/react-query'
import {Daily, Todo, YN} from '../types/daily'
import {api} from './api'
import {todoKeys} from './queryKey'

export const useGetTodo = (dailyId: string): UseQueryResult<Todo[]> => {
  return useQuery({
    queryKey: todoKeys.get(dailyId ?? ''),
    queryFn: async () => {
      if (dailyId === 'create') {
        return []
      }
      const data = await api.get(`/todo/${dailyId}`)
      return data.json()
    },
    initialData: [],
  })
}

export const useCreateTodo = (dailyId: string) => {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: (todo: string) => {
      return api.post(`/todo/${dailyId}`, {todo})
    },
    onError: () => {
      const previousData = queryClient.getQueryData(todoKeys.get(dailyId)) as Daily
      queryClient.setQueryData(todoKeys.get(dailyId), previousData)
    },
    onSettled: () => {
      queryClient.invalidateQueries({queryKey: todoKeys.get(dailyId)})
    },
  })

  return mutation
}

export const useUpdateTodo = (dailyId: string) => {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: ({todoId, value}: {todoId: Todo['todoId']; value: YN}) => {
      return api.put(`/todo/${dailyId}`, {todoId, value})
    },
    onMutate: async data => {
      const {todoId, value} = data
      const previousData = queryClient.getQueryData(todoKeys.get(dailyId)) as Todo[]
      const updatedTodos = previousData.map(todo => {
        return todo.todoId === todoId ? {...todo, done: value} : todo
      })
      queryClient.setQueryData(todoKeys.get(todoId), (prev: Daily) => ({...prev, todos: updatedTodos}))
      return {previousData}
    },
    onError: (err, newTodo, context) => {
      queryClient.setQueryData(todoKeys.get(dailyId || ''), context?.previousData)
    },
    onSettled: () => {
      queryClient.invalidateQueries({queryKey: todoKeys.get(dailyId)})
    },
  })

  return mutation
}

export const useDeleteTodo = (dailyId: string) => {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: (todoId: Todo['todoId']) => {
      return api.delete(`/todo/${todoId}`)
    },
    onMutate: async () => {
      const previousData = queryClient.getQueryData(todoKeys.get(dailyId)) as Daily
      return {previousData}
    },
    onError: (err, newTodo, context) => {
      queryClient.setQueryData(todoKeys.get(context?.previousData?.daily_id || ''), context?.previousData)
    },
    onSettled: () => {
      queryClient.invalidateQueries({queryKey: todoKeys.get(dailyId)})
    },
  })

  return mutation
}
