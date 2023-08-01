'use client'
import dayjs from 'dayjs'
import {useState} from 'react'
import DailyListTable from './dailyListTable'

function DailyListPage() {
  const [date, setDate] = useState(dayjs())

  const handleMonth = (month: number) => () => {
    setDate(prev => prev.set('month', prev.month() + month))
  }

  return (
    <div className="flex flex-col gap-[20px]">
      <div className="flex flex-1 justify-around">
        <div onClick={handleMonth(-1)}>{'<'}</div>
        <div className="flex flex-col place-items-center">
          <p className="text-xs text-gray-500">{date.year()}</p>
          <div>{date.month() + 1}월</div>
        </div>
        <div onClick={handleMonth(1)}>{'>'}</div>
      </div>
      <DailyListTable year={date.year()} month={date.month() + 1} />
    </div>
  )
}

export default DailyListPage
