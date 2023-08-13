import {useRef} from 'react'
import {Daily} from '../../../types/daily'

type ScheduleTimeType = {
  time: string
  text: string
}

function Timetable({
  schedules,
  hourly,
  onChange,
}: {
  schedules: Daily['schedule']
  hourly: boolean
  onChange: (time, value) => void
}) {
  const generateTimeRange = (hour: number, minute: number, nextHour: number, nextMinute: number): ScheduleTimeType => {
    const startTime = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
    const endTime = `${nextHour.toString().padStart(2, '0')}:${nextMinute.toString().padStart(2, '0')}`
    return {time: startTime, text: `${startTime} - ${endTime}`}
  }

  const getTimeByType = (hourly: boolean) => {
    const result: ScheduleTimeType[] = []
    for (let hour = 0; hour < 24; hour++) {
      if (hourly) {
        result.push(generateTimeRange(hour, 0, hour + 1, 0))
      } else {
        result.push(generateTimeRange(hour, 0, hour, 30))
        result.push(generateTimeRange(hour, 30, hour + 1, 0))
      }
    }
    return result
  }

  const time = getTimeByType(hourly)

  return (
    <>
      {hourly ? (
        <div className={'flex flex-1'}>
          <TimeTableLine schedules={schedules} time={time} onChange={onChange} />
        </div>
      ) : (
        <div className={'flex flex-1'}>
          <TimeTableLine schedules={schedules} time={time.slice(0, time.length / 2)} onChange={onChange} />
          <TimeTableLine schedules={schedules} time={time.slice(time.length / 2)} onChange={onChange} />
        </div>
      )}
    </>
  )
}

export default Timetable

const TimeCell = ({time, task, onChange}: {time: string; task: string; onChange: (time, value) => void}) => {
  const ref = useRef<HTMLInputElement>(null)
  const submitSchedule = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    updateSchedule()
  }

  const updateSchedule = () => {
    onChange(time, ref.current?.value)
  }

  return (
    <div className="flex flex-1">
      <form onSubmit={submitSchedule}>
        <input className="h-full p-2" ref={ref} defaultValue={task} onBlur={updateSchedule} />
      </form>
    </div>
  )
}

const TimeTableLine = ({
  time,
  schedules,
  onChange,
}: {
  time: ScheduleTimeType[]
  schedules: Daily['schedule']
  onChange: (time, value) => void
}) => {
  return (
    <div className={'flex flex-col flex-1'}>
      {time.map(item => {
        const {task} = schedules?.find(schedule => schedule.time === `${item.time}:00`) ?? {
          timeId: 0,
          time: '',
          task: '',
        }
        return (
          <div key={item.time} className="flex gap-2 justify-between border-b dark:border-neutral-500 text-sm">
            <div className="whitespace-nowrap p-[3px] min-w-[110px] max-w-[110px] text-center">{item.text}</div>
            <TimeCell key={item.time} time={item.time} task={task} onChange={onChange} />
          </div>
        )
      })}
    </div>
  )
}
