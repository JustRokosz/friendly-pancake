import { getToken } from './userStorage'

export function getJWTHeader(): string | undefined {
  const token = getToken()
  if (token) {
    return `Bearer ${token}`
  }
  return undefined
}
