// fetch json from ../custom.geo.json

export const fetchGeoJson = async () => {
  const response = await fetch('../custom.geo.json')
  return response.json()
}
