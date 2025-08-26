import { useEffect, useState } from 'react'

export default function useGeoLocation() {
  const [geoLocation, setGeoLocation] = useState<GeolocationCoordinates | null>(
    null
  )
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function getGeos() {
      try {
        const response = await fetch('../../custom.geojson')
        const locations = await response.json()
        setGeoLocation(locations)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    getGeos()
  }, [])

  return { geoLocation, loading }
}
