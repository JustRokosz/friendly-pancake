const TOKEN_LS_KEY = 'ic-tok'

export function setToken(token: string): void {
  if (typeof window !== 'undefined')
    localStorage.setItem(TOKEN_LS_KEY, token)
}

export function getToken(): string | null {
  if (typeof window !== 'undefined')
    return localStorage.getItem(TOKEN_LS_KEY)

  return null
}

export function clearToken(): void {
  if (typeof window !== 'undefined')
    localStorage.removeItem(TOKEN_LS_KEY)
}
