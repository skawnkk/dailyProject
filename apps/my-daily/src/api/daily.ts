import {useMutation, useQuery} from '@tanstack/react-query'

export const useGetDaily = (id: string) => {
  return useQuery(['daily'], async () => {
    const data = await fetch(`http://localhost:8080/schedule/daily/${id}`)
    return data.json()
  })
}

export const useUpdateTodo = (dailyId: string) => {
  const mutation = useMutation({
    mutationFn: async ({todoId, value}: {todoId: string; value: string}) => {
      const res = await fetch(`http://localhost:8080/schedule/daily/${dailyId}/todo`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          todoId,
          value,
        }),
      })

      console.log(res)
    },
  })

  return mutation
}
