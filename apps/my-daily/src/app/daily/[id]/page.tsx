'use client'
import {useQuery} from '@tanstack/react-query'
import React from 'react'
import {YN} from '../../../types/daily'
import TodoList from './TodoList'
const getDaily = (id: string) => {
  return {
    id,
    updateDate: {date: '2023-06-20', use: YN.Y},
    todoList: [
      {idx: 123, todo: '책 30분 읽기', checked: YN.N},
      {idx: 124, todo: '방 청소', checked: YN.Y},
    ],
  }
}

function DailyPage({params: {id}}: {params: {id: string}}) {
  const query = useQuery({queryKey: ['daily'], queryFn: () => getDaily(id)})
  if (!query.isSuccess) {
    return <div>loading</div>
  }
  const {updateDate, todoList} = query.data
  console.log(todoList)
  return (
    <div>
      <div className={'flex'}>
        <p>날짜</p>
        <p>{updateDate.date}</p>
      </div>
      <div className={'flex'}>
        <p>해야할 일</p>
        {!todoList.length ? <div>일정이 없습니다</div> : <TodoList list={todoList} />}
      </div>
    </div>
  )
}

export default DailyPage
