import {useParams} from 'next/navigation'
import {useCreateTodo} from '../../../api/todo'

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
      <form className="flex gap-1" onSubmit={addTodo}>
        <input
          className={
            'bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full p-2 text-gray-700 text-sm font-light leading-tight focus:outline-none focus:bg-white focus:border-cyan-400'
          }
          placeholder="오늘 해야 할 일을 입력하세요."
        />
        <button
          className={
            'flex-shrink-0 bg-cyan-400 hover:bg-cyan-500 border-cyan-400 hover:border-cyan-500 text-sm border-4 text-white py-1 px-2 rounded'
          }
          type="submit"
        >
          +
        </button>
      </form>
    </div>
  )
}

export default TodoInput
