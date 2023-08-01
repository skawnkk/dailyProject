'use client'
import {useRouter} from 'next/navigation'
import React from 'react'
import {useGetDaily} from '../../../api/daily'
import {useGetTodo} from '../../../api/todo'
import {getDate} from '../../../utils/date'
import Timetable from './Timetable'
import TodoInput from './TodoInput'
import TodoList from './TodoList'

interface Props {
  params: {
    id: string
  }
}
function DailyPage({params}: Props) {
  const {id} = params
  const router = useRouter()
  const {isSuccess, data} = useGetDaily(id)
  const {data: todos} = useGetTodo(id)
  if (!isSuccess) {
    return <div>error...</div>
  }
  if (!data) {
    router.push('/monthly')
  }
  const {date: dailyDate, keep, problem, try: tryData, schedule} = data
  const {month, date} = getDate(new Date(dailyDate))
  return (
    <div>
      <div className={'flex'}>
        <p>날짜</p>
        <p>{`${month}월 ${date}일`}</p>
      </div>
      <div className={'flex'}>
        <p>KEEP</p>
        <div>{keep ?? ''}</div>
      </div>
      <div className={'flex'}>
        <p>PROBLEM</p>
        <div>{problem ?? ''}</div>
      </div>
      <div className={'flex'}>
        <p>TRY</p>
        <div>{tryData ?? ''}</div>
      </div>
      <div className={'flex'}>
        <p>해야할 일</p>
        <div>
          {!todos?.length ? <div>일정이 없습니다</div> : <TodoList list={todos} />}
          <TodoInput />
        </div>
      </div>
      <div className={'flex'}>
        <p>시간체크</p>
        <Timetable schedules={schedule} hourly={false} />
      </div>
    </div>
  )
}

export default DailyPage
