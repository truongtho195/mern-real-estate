import React from 'react'
import { MapContainer, TileLayer, } from 'react-leaflet'
import Pin from "./../../components/pin/Pin.jsx"
import "leaflet/dist/leaflet.css"
import "./Map.css"
function Map({items,zoom=7}) {
    
    const data = items;
    const position = [items[0].latitude, items[0].longitude]
    return (
        <MapContainer center={position} zoom={zoom} scrollWheelZoom={false} className='map'>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {
                
                data.map(item=>(
                    <Pin item={item} key={item.id} />
                ))
            }
        </MapContainer>
    )
}

export default Map
