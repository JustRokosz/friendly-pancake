import { getJWTHeader } from '@/utils/token';
import { getToken } from '@/utils/userStorage';

interface UserInterface {
  onUserDetialsCall: (
    { user_id }: { user_id: string }
  ) => Promise<any>,
  onUsersListCall: () => Promise<any>,
  onUserDetailsUpdateCall: (
    { user_id, password, name }: { user_id: string, password: string | undefined, name: string }
  ) => Promise<any>,
  isAuthenticated: () => boolean,
}

const tokenHeader = getJWTHeader()

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export function useUser(): UserInterface {
  async function onUserDetialsCall({ user_id }: { user_id: string }) {
    if (!tokenHeader) {
      console.log('User not authorized')
      return Error('User is not authorised')
    }

    async function makeUserDetailsCall() {
      try {
        let headers = {
          'Content-Type': 'application/json',
          'Authorization': ''
        }
        if (tokenHeader) {
          headers.Authorization = tokenHeader
        }
        const response = await fetch(`${apiUrl}/users/${user_id}`, {
          method: 'GET',
          headers
        })

        const data = await response.json()
        return data
      } catch (e) {
        console.log(e)
      }
    }

    return makeUserDetailsCall()
  }

  async function onUsersListCall() {
    if (!tokenHeader) {
      console.log('User not authorized')
      return Error('User is not authorised')
    }

    async function makeUserListCall() {
      try {
        let headers = {
          'Content-Type': 'application/json',
          'Authorization': ''
        }
        if (tokenHeader) {
          headers.Authorization = tokenHeader
        }
        const response = await fetch(`http://localhost:8080/users`, {
          method: 'GET',
          headers
        })

        const data = await response.json()
        return data
      } catch (e) {
        console.log(e)
      }
    }

    return makeUserListCall()
  }

  async function onUserDetailsUpdateCall({
    user_id,
    password,
    name
  }: {
    user_id: string,
    password: string | undefined,
    name: string
  }) {
    if (!tokenHeader) {
      console.log('User not authorized')
      return
    }

    if (!password) {
      console.log('Provide new password')
      return
    }

    async function makeUserDetailsUpdateCall() {
      try {
        let headers = {
          'Content-Type': 'application/json',
          'Authorization': ''
        }
        if (tokenHeader) {
          headers.Authorization = tokenHeader
        }
        const response = await fetch(`${apiUrl}/users/${user_id}`, {
          method: 'POST',
          headers,
          body: JSON.stringify({
            name,
            password,
          })
        })

        const data = await response.json()
        return data
      } catch (e) {
        console.log(e)
      }
    }

    return makeUserDetailsUpdateCall()
  }

  function isAuthenticated(): boolean {
    const userToken = getToken()
    if(!!userToken)
      return true

    return false
  }

  return {
    onUserDetialsCall,
    onUsersListCall,
    onUserDetailsUpdateCall,
    isAuthenticated,
  }
}
