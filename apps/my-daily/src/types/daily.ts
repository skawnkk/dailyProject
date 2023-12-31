export type YN = 'Y' | 'N'

export interface Daily {
  daily_id: string
  member_id: string
  date: Date
  done: YN
  keep: string | null
  problem: string | null
  try: string | null
  memo: string | null
  todos: Todo[]
  todo: string
  todoId: string
  schedule: Time[]
}

export type Time = {
  timeId: number
  time: string
  task: string
}

export type Todo = {
  todoId: string
  todo: string
  done: YN
}
