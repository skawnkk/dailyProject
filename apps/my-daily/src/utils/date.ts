export const getDate = (date: Date) => {
  return {year: date.getFullYear(), month: date.getMonth() + 1, date: date.getDate()}
}

export const getDay = (day: number) => {
  const days = ['일', '월', '화', '수', '목', '금', '토']
  return days[day]
}
