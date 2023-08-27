import { setToken } from "../utils/userStorage"

interface AuthInterface {
  onLoginCall: (
    { user_id, password }: { user_id: string, password: string }
  ) => Promise<any>,
}

const event = new Event('userTokenUpdate')
const apiUrl = process.env.NEXT_PUBLIC_API_URL

export function useAuth(): AuthInterface {
  async function onLoginCall({ user_id, password }: { user_id: string, password: string}) {
    async function makeLoginCall() {
      try {
        const response = await fetch(`${apiUrl}/token`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_id,
            password,
          }),
        })

        const data = await response.json()
        if (data.access) {
          setToken(data.access)
        }

        window.dispatchEvent(event)
      } catch (e) {
        console.log(e)
      }
    }

    return makeLoginCall()
  }

  return {
    onLoginCall,
  }
}
