import dayjs, {Dayjs} from "dayjs";

export const getDate = (date: Date) => {
  return {year: date.getFullYear(), month: date.getMonth() + 1, date: date.getDate()}
}

export const getDay = (day: number) => {
  const days = ['일', '월', '화', '수', '목', '금', '토']
  return days[day]
}

export const getCalendar = ({year, month}:{year:number, month:number}) => {
	const result: Dayjs[] = []
	const dayCount = dayjs(`${year}-${month}-1`).daysInMonth()
	for (let i = 0; i < dayCount; i++) {
		result.push(dayjs(`${year}-${month}-${i + 1}`))
	}
	return result
}
