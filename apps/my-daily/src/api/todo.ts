import {useMutation, useQueryClient} from '@tanstack/react-query'
import {Daily, Todo, YN} from '../types/daily'
import {api} from './api'
import {dailyKeys} from './queryKey'

export const useCreateTodo = (dailyId: string) => {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: (todo: string) => {
      return api.post(`/todo/${dailyId}`, {todo})
    },
    onError: () => {
      const previousData = queryClient.getQueryData(dailyKeys.detail(dailyId)) as Daily
      queryClient.setQueryData(dailyKeys.detail(dailyId), previousData)
    },
    onSettled: () => {
      queryClient.invalidateQueries({queryKey: dailyKeys.detail(dailyId)})
    },
  })

  return mutation
}

export const useUpdateTodo = (dailyId: string) => {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: ({todoId, value}: {todoId: Todo['todoId']; value: YN}) => {
      return api.post(`/todo/${dailyId}`, {todoId, value})
    },
    onMutate: async data => {
      const {todoId, value} = data
      const previousData = queryClient.getQueryData(dailyKeys.detail(dailyId)) as Daily
      const updatedTodos = previousData.todos.map(todo => {
        return todo.todoId === todoId ? {...todo, done: value} : todo
      })
      queryClient.setQueryData(dailyKeys.detail(todoId), (prev: Daily) => ({...prev, todos: updatedTodos}))
      return {previousData}
    },
    onError: (err, newTodo, context) => {
      queryClient.setQueryData(dailyKeys.detail(context?.previousData?.daily_id || ''), context?.previousData)
    },
    onSettled: () => {
      queryClient.invalidateQueries({queryKey: dailyKeys.detail(dailyId)})
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
      const previousData = queryClient.getQueryData(dailyKeys.detail(dailyId)) as Daily
      return {previousData}
    },
    onError: (err, newTodo, context) => {
      queryClient.setQueryData(dailyKeys.detail(context?.previousData?.daily_id || ''), context?.previousData)
    },
    onSettled: () => {
      queryClient.invalidateQueries({queryKey: dailyKeys.detail(dailyId)})
    },
  })

  return mutation
}
