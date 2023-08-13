'use client'
import {useRouter} from 'next/navigation'
import React, {useEffect, useState} from 'react'
import {useGetDaily, useGetDailyId, useUpdateSchedule} from '../../../api/daily'
import {useGetTodo} from '../../../api/todo'
import {useLocalStorage} from '../../../hooks/useLocalStorage'
import {getDate} from '../../../utils/date'
import Timetable from './Timetable'
import TodoInput from './TodoInput'
import TodoList from './TodoList'
import Toggle from './Toggle'

interface Props {
  params: {
    id: string
  }
  searchParams: {
    year: string
    month: string
    date: string
  }
}
function DailyPage({params, searchParams}: Props) {
  const router = useRouter()
  const {getLocalStorage, setLocalStorage} = useLocalStorage()
  const [dailyId, setDailyId] = useState(params.id)
  const [isHourly, setIsHourly] = useState(getLocalStorage('isHourly') === 'Y')
  const defaultDate = `${searchParams.year}-${searchParams.month}-${searchParams.date}`
  const sections = ['keep', 'problem', 'try']

  const {data: dailyIdFromServer} = useGetDailyId(defaultDate)
  const {isSuccess, data} = useGetDaily(dailyId)
  const {data: todos} = useGetTodo(dailyId)
  const updateMutation = useUpdateSchedule(dailyId)

  useEffect(() => {
    setDailyId(dailyIdFromServer)
  }, [dailyIdFromServer])

  if (!data) {
    router.push('/monthly')
    return
  }

  const {date: dailyDate, schedule} = data
  const {month, date} = getDate(dailyDate ? new Date(dailyDate) : new Date(defaultDate))
  const toggleTimetable = (checked: boolean) => {
    setIsHourly(checked)
    setLocalStorage({id: 'isHourly', value: checked ? 'Y' : 'N'})
  }

  const handleTimetable = (time, value) => {
    updateMutation.mutate({time, schedule: value || ''})
  }

  if (!isSuccess) {
    return <div>error...</div>
  }

  return (
    <div className="text-base">
      <div className={'flex border-b dark:border-neutral-500'}>
        <p className={'whitespace-nowrap p-[3px] min-w-[110px] max-w-[110px]'}>날짜</p>
        <p className={'text-sm'}>{`${month}월 ${date}일`}</p>
      </div>

      {sections.map((section, idx) => {
        return (
          <div key={idx} className={'flex border-b dark:border-neutral-500'}>
            <p className={'whitespace-nowrap p-[3px] min-w-[110px] max-w-[110px]'}>{section.toUpperCase()}</p>
            <input className={'flex flex-1 text-sm p-2'} value={data[section] ?? ''} />
          </div>
        )
      })}

      <div className={'flex border-b dark:border-neutral-500'}>
        <p className={'p-[3px] min-w-[110px] max-w-[110px]'}>해야할 일</p>
        <div className={'flex flex-col flex-1 pl-3 p-2'}>
          {!todos?.length ? <div>일정이 없습니다</div> : <TodoList list={todos} />}
          <TodoInput />
        </div>
      </div>

      <div className={'p-3'}>
        <div className="flex flex-1 justify-between">
          <p>시간체크</p>
          <Toggle on={isHourly} onChange={toggleTimetable} />
        </div>
        <Timetable schedules={schedule} hourly={isHourly} onChange={handleTimetable} />
      </div>
    </div>
  )
}

export default DailyPage
