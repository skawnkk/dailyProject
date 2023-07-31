'use client'
import {useRouter} from 'next/navigation'
import {useGetMonthlyList} from '../../api/monthly'
import {getDate} from '../../utils/date'

function MonthlyPage() {
  const router = useRouter()
  const {data: monthlyList, isLoading} = useGetMonthlyList()
  const goDailyPage = (id: string) => () => {
    router.push(`/daily/${id}`)
  }

  if (isLoading) {
    return <div>Loading</div>
  }

  return (
    <div>
      {monthlyList?.map(list => {
        const {month, date} = getDate(new Date(list.date))
        return <div key={list.dailyId} onClick={goDailyPage(list.dailyId)}>{`${month}월 ${date}일`}</div>
      })}
    </div>
  )
}

export default MonthlyPage
