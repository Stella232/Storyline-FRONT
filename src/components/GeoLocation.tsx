import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import useGeoLocation from '../hooks/useGeoLocation'

const GeoLocationSection = ({
  setSelectedCountry,
}: {
  setSelectedCountry: (country: string) => void
}) => {
  const { geoLocation, loading } = useGeoLocation()

  if (loading) return <div>Loading...</div>

  const onEachFeature = (feature: any, layer: any) => {
    layer.on({
      click: () => {
        setSelectedCountry(feature.properties.shapeName)
      },
    })
  }

  const geoJsonStyle = {
    color: '#436850', // Border color
    weight: 1, // Border width
  }

  return (
    <div className="">
      <MapContainer
        center={[-2, 30]}
        zoom={9}
        style={{ height: '600px', width: '100%', zIndex: 9 }}
        scrollWheelZoom={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <GeoJSON
          data={geoLocation as any}
          onEachFeature={onEachFeature}
          style={geoJsonStyle} // Apply the style here
        />
      </MapContainer>
    </div>
  )
}

export default GeoLocationSection
