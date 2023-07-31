import {UseQueryResult, useMutation, useQuery, useQueryClient} from '@tanstack/react-query'
import {Daily} from '../types/daily'
import {api} from './api'
import {dailyKeys} from './queryKey'

export const useGetDaily = (id: Daily['daily_id']): UseQueryResult<Daily> => {
  return useQuery(dailyKeys.detail(id), async () => {
    const data = await api.get(`/schedule/daily/${id}`)
    return data.json()
  })
}

export const useUpdateSchedule = (dailyId: string) => {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: ({time, schedule}: {time: string; schedule: string}) => {
      return api.post(`/schedule/daily/${dailyId}/schedule`, {time: `${time}:00`, schedule})
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
