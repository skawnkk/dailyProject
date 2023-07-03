const baseUrl = process.env.NEXT_PUBLIC_SERVER
export const api = {
  get: async (url: string) => {
    return await fetch(baseUrl + url)
  },
  post: async (url: string, body: unknown) => {
    return fetch(baseUrl + url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
  },
  delete: async (url: string) => {
    return fetch(baseUrl + url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
  },
}
