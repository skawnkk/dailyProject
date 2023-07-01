export type YN = 'Y' | 'N'

export interface Daily {
  daily_id: string
  member_id: string
  date: string
  done: YN
  keep: string | null
  problem: string | null
  try: string | null
  memo: string | null
  todos: Todo[]
  todo: string
  todo_id: string
}

export type Todo = {
  todo_id: string
  todo: string
  done: YN
}
