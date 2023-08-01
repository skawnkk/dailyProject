'use client'
import Link from 'next/link'
import {useParams, useSearchParams} from 'next/navigation'
import React from 'react'

function Header() {
  const {id} = useParams()
  const query = useSearchParams()
  const [month, date] = [query.get('month'), query.get('date')]
  return (
    <div className="sticky top-0 left-0 right-0 flex gap-2 p-[20px] border-b bg-white bg-opacity-50 backdrop-blur-md">
      <Link href={'/daily'}>DAILY PLAN</Link>
      {id && (
        <>
          <div>{'/'}</div>
          <div>{`${month}월 ${date}일`}</div>
        </>
      )}
    </div>
  )
}

export default Header
