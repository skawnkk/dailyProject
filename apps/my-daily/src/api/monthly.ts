import {useQuery} from '@tanstack/react-query'

export const useGetMonthlyList = () => {
  return useQuery(['monthly'], async () => {
    const data = await fetch('http://localhost:8080/schedule/monthly')
    return data.json()
  })
}
