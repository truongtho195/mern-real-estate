import React from 'react'
import {Link} from "react-router-dom"
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import "./Pin.css"
function Pin({item}) {
    return (
        
        <Marker position={[item.latitude,item.longitude]}>
            <Popup>
                <div className="popupContainer">
                    <img src={item.images} alt="" />
                    <div className='textContainer'>
                        <Link to={`${item.id}`}>{item.title}</Link>
                        <span className="bed">{item.bedroom} bedroom</span>
                        <b>$ {item.price}</b>
                    </div>
                </div>  
            </Popup>
        </Marker>
    )
}

export default Pin
