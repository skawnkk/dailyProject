import {Switch} from '@headlessui/react'

export default function Toggle({on, onChange}: {on: boolean; onChange: (checked: boolean) => void}) {
  const handleChange = (checked: boolean) => {
    onChange(checked)
  }
  return (
    <Switch
      checked={on}
      onChange={handleChange}
      className={`${on ? 'bg-cyan-400' : 'bg-gray-200'}  inline-flex h-6 w-11 items-center rounded-full`}
    >
      <span className="sr-only">Enable notifications</span>
      <span
        className={`${
          on ? 'translate-x-6' : 'translate-x-1'
        } inline-block h-4 w-4 transform rounded-full bg-white transition`}
      />
    </Switch>
  )
}
