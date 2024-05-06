import React from 'react'
import "./FeatureItem.css"
function FeatureItem({ image, title, description }) {
    return (
        <div className="feature">
            <img src={image} alt="" />
            <div className="featureText">
                <span>{title}</span>
                <p>{description}</p>
            </div>
        </div>
    )
}

export default FeatureItem
