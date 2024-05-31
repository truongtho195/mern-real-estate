import React from 'react'
import { useLoaderData } from 'react-router-dom'
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
import DOMPurify from 'dompurify';
import "./SinglePage.css"
import FeatureItem from '../../components/featureItem/FeatureItem.jsx'

const HtmlContent = ({htmlString})=>{
  const cleanHtmlString = DOMPurify.sanitize(htmlString);
  return <div dangerouslySetInnerHTML={{__html: cleanHtmlString}}></div>
}
const SinglePage = () => {
  const post = useLoaderData();
  return (
    <div className="singlePage">
      <div className="details">
        <div className="wrapper">
          <Slider images={post.images} />
          <div className="info">
            <div className="top">
              <div className="post">
                <h1>{post.title}</h1>
                <div className="address">
                  <img src={pinImg} alt="" />
                  <span>{post.address}</span>
                </div>
                <div className="price">$ {post.price}</div>
              </div>
              <div className="user">
                <img src={post.user.avatar} alt="" />
                <p>{post.user.username}</p>
              </div>
            </div>
            <div className="bottom" >
              <HtmlContent htmlString={post.postDetail.desc} />
            </div>
          </div>
        </div>
      </div>
      <div className="features">
        <div className="wrapper">
          <p className="title">General</p>
          <div className="listVertical">
            <FeatureItem 
                  image={utilityImg} 
                  title="Utilities" 
                  description={`${ post.postDetail.utilities ==="owner"? "Owner is responsible" : "Tenat is responsible"}`} />
            <FeatureItem 
                image={utilityImg} 
                title="Pet Policy" 
                description={`${ post.postDetail.utilities ==="allowed"? "Pets Allowed" : "Pets not Allowed"}`} />
            <FeatureItem 
                image={utilityImg} 
                title="Property Fees" 
                description={`${ post.postDetail.income}`} />
          </div>
          <p className='title'>Room Sizes</p>
          <div className="listHorizontal">
            <div className="size">
              <img src={sizeImg} alt="" />
              <div className="featureText">
                <span>{post.postDetail.size} sqft</span>
              </div>
            </div>
            <div className="size">
              <img src={bedImg} alt="" />
              <div className="featureText">
                <span>{post.bedroom} beds</span>
              </div>
            </div>
            <div className="size">
              <img src={bathImg} alt="" />
              <div className="featureText">
                <span>{post.bathroom} Bathroom</span>
              </div>
            </div>
          </div>
          <p className='title'>Nearby Places</p>
          <div className="listHorizontal bg-white">
            <FeatureItem image={utilityImg}
              title="School"
              description={`${post.postDetail.school>999? post.postDetail.school/1000 +"km" : post.postDetail.school +"m" } away`} />
            <FeatureItem image={utilityImg}
              title="Bus stop"
              description={`${post.postDetail.bus>999? post.postDetail.bus/1000 +"km" : post.postDetail.bus +"m" } away`} />
            <FeatureItem image={utilityImg}
              title="Restaurant"
              description={`${post.postDetail.restaurant>999? post.postDetail.restaurant/1000 +"km" : post.postDetail.restaurant +"m" } away`}/>
          </div>
          <p className='title'>Location</p>
          <div className="mapContainer">
            <Map items={[post]} zoom='13' />
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
