import React from 'react'
import { listData } from "../../lib/dummydata.js"
import Filter from '../../components/filter/Filter.jsx'
import CardItem from '../../components/cardItem/CardItem.jsx'
import Map from '../../components/map/Map.jsx'

import "./listPage.css"
const ListPage = () => {
    const data = listData;
    return (
        <div className='listPage'>
            <div className="listContainer ">
                <div className="wrapper">
                    <Filter />
                    {
                        data.map(item => (
                            <CardItem key={item.id} item= {item}/>
                        ))
                    }
                </div>
            </div>
            <div className="mapContainer">
                <Map items={data} zoom="7"/>
            </div>
        </div>
    )
}

export default ListPage
