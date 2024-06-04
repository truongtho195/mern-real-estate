import React from 'react'
import { listData } from "../../lib/dummydata.js"
import Filter from '../../components/filter/Filter.jsx'
import CardItem from '../../components/cardItem/CardItem.jsx'
import Map from '../../components/map/Map.jsx'
import { Suspense } from 'react'
import { useLoaderData, Await } from 'react-router-dom'

import "./listPage.css"
const ListPage = () => {
    // const data = listData;
    const data = useLoaderData();
    return (
        <div className='listPage'>
            <div className="listContainer ">
                <div className="wrapper">
                    <Filter />
                    <Suspense fallback={<p>Loading ...</p>}>
                        <Await
                            resolve={data.postResponse}
                            errorElement={
                                <p>Error loading package location!</p>
                            }>
                            {
                                (postResponse) =>
                                    postResponse.data.map(item => (
                                        <CardItem key={item.id} item={item} />
                                ))
                            }
                        </Await>
                    </Suspense>
                    {/* {
                        data.map(item => (
                            <CardItem key={item.id} item= {item}/>
                        ))
                    } */}
                </div>
            </div>
            <div className="mapContainer">
                    <Suspense fallback={<p>Loading ...</p>}>
                        <Await
                            resolve={data.postResponse}
                            errorElement={
                                <p>Error loading package location!</p>
                            }>
                            {(postResponse) =>
                                <Map items={postResponse.data} zoom="7"/>
                            }
                        </Await>
                    </Suspense>
                {/* <Map items={data} zoom="7"/> */}
            </div>
        </div>
    )
}

export default ListPage
