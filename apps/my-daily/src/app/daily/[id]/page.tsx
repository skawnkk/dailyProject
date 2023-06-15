'use client'
import {useQuery} from '@tanstack/react-query'
import React from 'react'

const getDaily = (id: string) => {
  return {id, date: '2023-06-20'}
}

function DailyPage({params: {id}}: {params: {id: string}}) {
  const query = useQuery({queryKey: ['daily'], queryFn: () => getDaily(id)})
  if (!query.isSuccess) {
    return <div>loading</div>
  }

  return (
    <div>
      <div className={'flex'}>
        <p>작성일</p>
        <p>{query.data.date}</p>
      </div>
    </div>
  )
}

export default DailyPage
