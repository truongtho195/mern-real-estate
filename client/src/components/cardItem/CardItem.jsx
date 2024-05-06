import React from 'react'
import {Link} from "react-router-dom"
import bathImage from "../../assets/images/bath.png";
import bedImage from "../../assets/images/bed.png";
import chatImg from "../../assets/images/chat.png";
import saveImg from "../../assets/images/save.png";
import pinImg from "../../assets/images/pin.png";
import "./CardItem.css"
function CardItem({item}) {
  return (
        <div className="card">
            <Link to={`/${item.id}`} className='imageContainer'>
                <img src={item.images} alt="" />
            </Link>
            <div className="textContainer">
                
                <h2 className='title'>
                    <Link>{item.title}</Link>
                </h2>
                
                <p className='address'>
                    <img src={pinImg} alt="" />
                    <span>{item.address}</span>
                </p>
                <p className='price'>$ {item.price}</p>
                <div className="bottom">
                    <div className="features">
                        <div className="feature">
                            <img src={bedImage} alt="" />
                            <span>{item.bedroom} Bedroom</span>
                        </div>
                        <div className="feature">
                            <img src={bathImage} alt="" />
                            <span>{item.bathroom} Bathroom</span>
                        </div>
                    </div>
                    <div className="icons">
                        <div className="icon">
                            <img src={saveImg} alt="" />
                        </div>
                        <div className="icon">
                            <img src={chatImg} alt="" />
                        </div>
                    </div>
                    
                </div>
                

            </div>
        </div>
  )
}

export default CardItem

