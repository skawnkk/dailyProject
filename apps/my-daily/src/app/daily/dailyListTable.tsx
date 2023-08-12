import dayjs, {Dayjs} from 'dayjs'
import {useRouter} from 'next/navigation'
import React from 'react'
import {useGetDailyList} from '../../api/daily'
import {getDay} from '../../utils/date'

function DailyListTable({year, month}) {
  const router = useRouter()
  const dayCount = dayjs(`${year}-${month}-1`).daysInMonth()
  const calendar = ((): Dayjs[] => {
    const result: Dayjs[] = []
    for (let i = 0; i < dayCount; i++) {
      result.push(dayjs(`${year}-${month}-${i + 1}`))
    }
    return result
  })()
  const properties = ['keep', 'problem', 'try']
  const {data: dailyList, isLoading} = useGetDailyList({year, month})

  const goDailyPage = (date: Dayjs) => () => {
    const targetDate = date.date()
    const daily = dailyList.find(list => new Date(list.date).getDate() === targetDate)
    router.push(
      daily
        ? `/daily/${daily.dailyId}?year=${year}&month=${month}&date=${targetDate}`
        : `/daily/create?year=${year}&month=${month}&date=${targetDate}`
    )
  }

  const DateHeader = () => {
    return (
      <div className="flex gap-2">
        <div className="text-sm font-normal flex flex-1 whitespace-nowrap min-w-[80px] justify-center sticky left-0 border-r bg-white bg-opacity-50 backdrop-blur-md">
          ⛳️
        </div>

        {calendar.map(date => {
          return (
            <div
              key={date.toString()}
              className="text-sm font-normal flex flex-1 whitespace-nowrap min-w-[80px] justify-center"
              onClick={goDailyPage(date)}
            >
              {date.date()}일({getDay(date.day())})
            </div>
          )
        })}
      </div>
    )
  }
  const PropertyBody = ({id}: {id: string}) => {
    return (
      <div className="flex gap-2">
        <div className={'min-w-[80px] sticky left-0 border-r bg-white bg-opacity-50 backdrop-blur-md'}>
          <div>{id}</div>
        </div>

        {calendar.map(date => {
          const validItem = dailyList.find(li => dayjs(li.date).isSame(dayjs(date)))
          return (
            <div key={`${id}_${date}`} className={'min-w-[80px] text-xs text-gray-500'}>
              {validItem ? <div>{validItem[id]}</div> : <div>-</div>}
            </div>
          )
        })}
      </div>
    )
  }

  if (isLoading) {
    return <div>Loading</div>
  }

  return (
    <div className="overflow-auto">
      <DateHeader />
      {properties.map(property => {
        return <PropertyBody id={property} key={property} />
      })}
    </div>
  )
}

export default DailyListTable
