import {useQuery} from '@tanstack/react-query'
import {api} from './api'

export const useGetMonthlyList = () => {
  return useQuery(['monthly'], async () => {
    const data = await api.get('/schedule/monthly')
    return data.json()
  })
}
