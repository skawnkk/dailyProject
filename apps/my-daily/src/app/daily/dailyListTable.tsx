import {log} from 'console'
import {createColumnHelper, flexRender, getCoreRowModel, useReactTable} from '@tanstack/react-table'
import dayjs, {Dayjs} from 'dayjs'
import {useRouter} from 'next/navigation'
import React from 'react'
import {useGetDailyList} from '../../api/daily'
import {Daily} from '../../types/daily'
import {getDate, getDay} from '../../utils/date'
type ColumnType = {
  [key: string]: Daily
}

function DailyListTable({year, month}) {
  const router = useRouter()
  const {data: dailyList, isLoading} = useGetDailyList({year, month})

  const goDailyPage = (date: Date) => () => {
    const targetDate = new Date(date).getDate()
    const daily = dailyList.find(list => new Date(list.date).getDate() === targetDate)
    router.push(
      daily
        ? `/daily/${daily.dailyId}?year=${year}&month=${month}&date=${targetDate}`
        : `/daily/create?year=${year}&month=${month}&date=${targetDate}`
    )
  }

  const columnHelper = createColumnHelper<{property: string} & ColumnType>()
  const dayCount = dayjs(`${year}-${month + 1}-1`).daysInMonth()
  const calendar = ((): Dayjs[] => {
    const result: Dayjs[] = []
    for (let i = 0; i < dayCount; i++) {
      result.push(dayjs(`${year}-${month}-${i + 1}`))
    }
    return result
  })()
  const columns = [
    columnHelper.accessor('property', {
      cell: info => info.getValue(),
      header: () => <span>*</span>,
    }),
    ...calendar.map(date => {
      return columnHelper.accessor(`${date.date()}`, {
        cell: info => info.getValue(),
        header: () => (
          <div className="text-sm font-normal flex flex-1 whitespace-nowrap" onClick={goDailyPage(date)}>
            {date.date()}일({getDay(date.day())})
          </div>
        ),
      })
    }),
  ]

  const table = useReactTable({
    data: dailyList,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  if (isLoading) {
    return <div>Loading</div>
  }

  return (
    <div className="overflow-auto">
      <table>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id}>
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          {table.getFooterGroups().map(footerGroup => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map(header => (
                <th key={header.id}>
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.footer, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>

      {/* {dailyList?.map(list => {
        const {month, date} = getDate(new Date(list.date))
        return <div key={list.dailyId} onClick={goDailyPage(list.dailyId)}>{`${month}월 ${date}일`}</div>
      })} */}
    </div>
  )
}

export default DailyListTable
