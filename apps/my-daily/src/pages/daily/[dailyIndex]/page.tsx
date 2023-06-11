'use client'
import {useQuery} from '@tanstack/react-query'
import React from 'react'
import {getDaily} from '../../api/daily'

function DailyPage() {
  const {data = {}} = useQuery({queryKey: ['daily'], queryFn: getDaily})
  return (
    <div>
      <div className={'flex'}>
        <p>작성일</p>
        <p>{data.date || ''}</p>
      </div>
    </div>
  )
}

export default DailyPage
