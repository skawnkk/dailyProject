'use client'
import {useParams} from 'next/navigation'
import React from 'react'
import {useGetDaily} from '../../../api/daily'
import TodoList from './TodoList'

function DailyPage() {
  const {id} = useParams()
  const {isSuccess, data} = useGetDaily(id)
  if (!isSuccess) {
    return <div>error...</div>
  }

  const {date, todos} = data

  return (
    <div>
      <div className={'flex'}>
        <p>날짜</p>
        <p>{date}</p>
      </div>
      <div className={'flex'}>
        <p>해야할 일</p>
        {!todos.length ? <div>일정이 없습니다</div> : <TodoList list={todos} />}
      </div>
    </div>
  )
}

export default DailyPage
