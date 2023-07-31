export const dailyKeys = {
  detail: (dailyId: string) => ['daily', dailyId],
}

export const todoKeys = {
  get: (dailyId: string) => ['todo', dailyId],
}
