import {useState} from 'react'

export const useInput = (initialValue = '') => {
  const [value, setValue] = useState(initialValue)
  const onChange = (val: string) => {
    console.log(val)
    setValue(val)
  }
  return {value, onChange}
}
