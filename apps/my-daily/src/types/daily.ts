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
  schedule: {[key: string]: string | null}
}

export type Todo = {
  todoId: string
  todo: string
  done: YN
}

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
  todo_id: string
}
