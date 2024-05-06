import React from 'react'
import Slider from '../../components/slider/Slider.jsx'
import { singlePostData } from '../../lib/dummydata.js'
import { userData } from '../../lib/dummydata.js'
import pinImg from "../../assets/images/pin.png"
import iconImg from "../../assets/images/noavatar.jpg"
import Map from "../../components/map/Map.jsx"
import chatImg from "../../assets/images/chat.png"
import saveImg from "../../assets/images/save.png"
import utilityImg from "../../assets/images/utility.png"
import sizeImg from "../../assets/images/size.png"
import bedImg from "../../assets/images/bed.png"
import bathImg from "../../assets/images/bath.png"
import "./SinglePage.css"
import FeatureItem from '../../components/featureItem/FeatureItem.jsx'
const SinglePage = () => {
  return (
    <div className="singlePage">
      <div className="details">
        <div className="wrapper">
          <Slider images={singlePostData.images} />
          <div className="info">
            <div className="top">
              <div className="post">
                <h1>{singlePostData.title}</h1>
                <div className="address">
                  <img src={pinImg} alt="" />
                  <span>{singlePostData.address}</span>
                </div>
                <div className="price">$ {singlePostData.price}</div>

              </div>
              <div className="user">
                <img src={userData.img} alt="" />
                <p>{userData.name}</p>
              </div>
            </div>
            <div className="bottom">
              <p>{singlePostData.description}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="features">
        <div className="wrapper">
          <p className="title">General</p>
          <div className="listVertical">
            <FeatureItem image={utilityImg} title="Utilities" description="Renter is responsible" />
            <FeatureItem image={utilityImg} title="Pet Policy" description="Pets Allowed" />
            <FeatureItem image={utilityImg} title="Property Fees" description="Must have 3x the rent in total household income" />
          </div>
          <p className='title'>Room Sizes</p>

          <div className="listHorizontal">
            <div className="size">
              <img src={sizeImg} alt="" />
              <div className="featureText">
                <span>80 sqft</span>
                
              </div>
            </div>
            <div className="size">
              <img src={bedImg} alt="" />
              <div className="featureText">
                <span>2 beds</span>
                
              </div>
            </div>
            <div className="size">
              <img src={bathImg} alt="" />
              <div className="featureText">
                <span>1 Bathroom</span>
              </div>
            </div>
          </div>
          <p className='title'>Nearby Places</p>
          <div className="listHorizontal bg-white">
            <FeatureItem image={utilityImg}
              title="School"
              description="250 away" />
            <FeatureItem image={utilityImg}
              title="Bus stop"
              description="100m away" />
            <FeatureItem image={utilityImg}
              title="Restaurant"
              description="200m away" />
          </div>
          <p className='title'>Location</p>
          <div className="mapContainer">
            <Map items={[singlePostData]} zoom='13' />
          </div>
          <div className="buttons">
            <button className='featureButton'>
              <img src={chatImg} alt="" />
              Send a Message
            </button>
            <button className='featureButton'>
              <img src={saveImg} alt="" />
              Save the Place
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SinglePage
