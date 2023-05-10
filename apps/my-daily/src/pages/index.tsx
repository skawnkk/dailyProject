import {sayHello} from '@my/lib'
import {Button} from '@my/ui'
import {Inter} from 'next/font/google'
const inter = Inter({subsets: ['latin']})

export default function Home() {
  const handleClick = () => {
    alert(`I'm from @my/ui`)
  }
  return (
    <main className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}>
      <h1>{sayHello('@my')}</h1>
      <Button onClick={handleClick}>myButton</Button
      <div>githubActions</div>
    </main>
  )
}
