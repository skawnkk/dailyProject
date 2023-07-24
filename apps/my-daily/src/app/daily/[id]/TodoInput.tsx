import {useParams} from 'next/navigation'
import {useCreateTodo} from '../../../api/daily'

function TodoInput() {
  const {id} = useParams()
  const {mutate} = useCreateTodo(id)
  const addTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const value = e.target[0].value
    if (!value) {
      return
    }
    mutate(value)
    e.target[0].value = ''
  }

  return (
    <div>
      <form onSubmit={addTodo}>
        <input placeholder="오늘 해야 할 일을 입력하세요." />
        <button type="submit">+</button>
      </form>
    </div>
  )
}

export default TodoInput
