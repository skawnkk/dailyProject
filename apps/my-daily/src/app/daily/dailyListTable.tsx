import dayjs, {Dayjs} from 'dayjs'
import {useRouter} from 'next/navigation'
import React from 'react'
import {useGetDailyList} from '../../api/daily'
import Cell from "../../atomic/Cell";
import {getCalendar, getDay} from '../../utils/date'

function DailyListTable({year, month}) {
	const router = useRouter()
	const calendar = getCalendar({year, month})
	const properties = ['keep', 'problem', 'try']
	const {data: dailyList, isLoading} = useGetDailyList({year, month})

	const goDailyPage = (date: Dayjs) => () => {
		const targetDate = date.date()
		const daily = dailyList?.find(list => new Date(list.date).getDate() === targetDate)
		router.push(
			daily
				? `/daily/${daily?.dailyId}?year=${year}&month=${month}&date=${targetDate}`
				: `/daily/create?year=${year}&month=${month}&date=${targetDate}`
		)
	}

	const DateHeader = () => {
		return (
			<div className="DateHeader flex gap-2 border-b-0 border-slate-600">
				<Cell>⛳️</Cell>

				<div className={'flex ml-[80px]'}>
					{calendar.map(date => {
						return (
							<div key={date.toString()} className="p-[6px] text-sm font-normal flex flex-1 whitespace-nowrap min-w-[80px] justify-center" onClick={goDailyPage(date)}>
								{date.date()}일({getDay(date.day())})
							</div>
						)
					})}
				</div>
			</div>
		)
	}
	const PropertyBody = ({id}: { id: string }) => {
		return (
			<div className="PropertyBody flex gap-2">
				<Cell>{id}</Cell>

				<div className={'flex ml-[80px]'}>
					{calendar.map(date => {
						const validItem = dailyList?.find(li => dayjs(li.date).isSame(dayjs(date)))
						return (
							<div key={`${id}_${date}`} className={'p-[6px] min-w-[80px] text-xs text-gray-500'}>
								{validItem ? <div>{validItem[id]}</div> : <div>-</div>}
							</div>
						)
					})}
				</div>
			</div>
		)
	}

	return (
		<div className="overflow-auto">
			<DateHeader/>
			{!isLoading ? (
				<>
					{properties.map(property => {
						return <PropertyBody id={property} key={property}/>
					})}
				</>
			) : (
				<div className={'flex flex-1 items-center justify-center text-center min-h-[200px]'}>Loading...</div>
			)}
		</div>
	)
}
export default DailyListTable
