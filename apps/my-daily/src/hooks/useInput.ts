import {useState} from 'react'

export const useInput = (initialValue = '') => {
  const [value, setValue] = useState(initialValue)
  const onChange = (val: string) => {
    setValue(val)
  }
  const reset = () => {
    setValue(initialValue)
  }
  return {value, onChange, reset}
}
