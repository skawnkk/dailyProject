export const getDate = (date: Date) => {
  return {year: date.getFullYear(), month: date.getMonth() + 1, date: date.getDate()}
}
