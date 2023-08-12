import {useParams} from 'next/navigation'
import {useRef} from 'react'
import {useUpdateSchedule} from '../../../api/daily'
import {Daily} from '../../../types/daily'

type ScheduleTimeType = {
  time: string
  text: string
}

function Timetable({schedules, hourly}: {schedules: Daily['schedule']; hourly: boolean}) {
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
        <div>
          <TimeTableLine schedules={schedules} time={time} />
        </div>
      ) : (
        <div className="flex">
          <TimeTableLine schedules={schedules} time={time.slice(0, time.length / 2)} />
          <TimeTableLine schedules={schedules} time={time.slice(time.length / 2)} />
        </div>
      )}
    </>
  )
}

export default Timetable

const TimeCell = ({time, task}: {time: string; task: string}) => {
  const ref = useRef<HTMLInputElement>(null)
  const {id} = useParams()
  const mutation = useUpdateSchedule(id)
  const submitSchedule = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    updateSchedule()
  }

  const updateSchedule = () => {
    mutation.mutate({time, schedule: ref.current?.value || ''})
  }

  return (
    <div className="flex flex-1">
      <form onSubmit={submitSchedule}>
        <input ref={ref} defaultValue={task} onBlur={updateSchedule} />
      </form>
    </div>
  )
}

const TimeTableLine = ({time, schedules}: {time: ScheduleTimeType[]; schedules: Daily['schedule']}) => {
  console.log(time)
  return (
    <div>
      {time.map(item => {
        const {task} = schedules?.find(schedule => schedule.time === `${item.time}:00`) ?? {
          timeId: 0,
          time: '',
          task: '',
        }
        return (
          <div key={item.time} className="flex gap-2 justify-between">
            <div>{item.text}</div>
            <TimeCell key={item.time} time={item.time} task={task} />
          </div>
        )
      })}
    </div>
  )
}
