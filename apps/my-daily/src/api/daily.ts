import {UseQueryResult, useMutation, useQuery, useQueryClient} from '@tanstack/react-query'
import {Daily} from '../types/daily'
import {api} from './api'
import {dailyKeys} from './queryKey'

const initialDaily = {
  date: null,
  schedule: [],
  keep: '',
  problem: '',
  try: '',
}
export const useGetDailyList = ({year, month}: {year: number; month: number}) => {
  return useQuery(['monthly', year, month], async () => {
    const data = await api.get(`/schedule/daily?year=${year}&month=${month}`)
    return data.json()
  })
}

export const useGetDailyId = (date: string) => {
  return useQuery({
    queryKey: dailyKeys.detail('getDailyId'),
    queryFn: async () => {
      const data = await api.post(`/schedule/daily`, {date})
      const {id} = await data.json()
      return id
    },
    initialData: null,
  })
}

export const useGetDaily = (id: Daily['daily_id']): UseQueryResult<Daily> => {
  return useQuery({
    queryKey: dailyKeys.detail(id),
    queryFn: async () => {
      if (id === 'create') {
        return initialDaily
      } else {
        const data = await api.get(`/schedule/daily/${id}`)
        return data.json()
      }
    },
    initialData: initialDaily,
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
