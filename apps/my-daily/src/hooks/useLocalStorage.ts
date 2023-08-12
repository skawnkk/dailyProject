export const useLocalStorage = () => {
  const getLocalStorage = (id: string) => {
    return localStorage.getItem(id)
  }
  const setLocalStorage = ({id, value}: {id: string; value: string}) => {
    localStorage.setItem(id, value)
  }

  return {getLocalStorage, setLocalStorage}
}
