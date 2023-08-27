import { getJWTHeader } from '@/utils/token'

interface AcquisitionsInterface {
  onAquisitionsCall: () => Promise<any>,
}

const apiUrl = process.env.NEXT_PUBLIC_API_URL

export function useAcquisitions(): AcquisitionsInterface {
  async function onAquisitionsCall() {
    async function makeAquisitionsCall() {
      const tokenHeader = getJWTHeader()

      if (!tokenHeader) {
        console.log('User not authorized')
        return
      }

      try {
        let headers = {
          'Content-Type': 'application/json',
          'Authorization': tokenHeader,
        }
        const response = await fetch(`${apiUrl}/acquisitions`, {
          method: 'GET',
          headers,
        })

        const data = await response.json()
        return data
      } catch (e) {
        console.log(e)
      }
    }

    return makeAquisitionsCall()
  }

  return {
    onAquisitionsCall,
  }
}
