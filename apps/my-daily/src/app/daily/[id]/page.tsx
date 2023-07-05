'use client'
import {useRouter, useParams} from 'next/navigation'
import React from 'react'
import {useGetDaily} from '../../../api/daily'
import {getDate} from '../../../utils/date'
import TodoInput from './TodoInput'
import TodoList from './TodoList'
function DailyPage() {
  const {id} = useParams()
  const router = useRouter()
  const {isSuccess, data} = useGetDaily(id)
  if (!isSuccess) {
    return <div>error...</div>
  }
  if (!data) {
    router.push('/monthly')
  }
  const {date: dailyDate, keep, problem, try: tryData, todos, schedule} = data
  const {month, date} = getDate(new Date(dailyDate))
  const timeTable = Object.keys(schedule)
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
        {!todos?.length ? <div>일정이 없습니다</div> : <TodoList list={todos} />}
        <TodoInput />
      </div>
      <div className={'flex'}>
        <p>시간체크</p>
        <div>
          {Object.keys(schedule).map((time: string) => {
            return (
              <div key={time} className="flex">
                <p>{time}</p>
                <p>{schedule[time]}</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default DailyPage
