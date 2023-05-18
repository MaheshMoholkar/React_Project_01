import React from 'react'
import ReactDOM from 'react-dom/client'
import logo from  './img/logo.png'
import { IMG_CDN_URL } from './components/config'
import { RestaurantList } from './components/RestaurantList'

const Title = () => {
    return (
    <>
        <img className='logo'
        alt='logo'
        src={logo}
        />
    </>)
}
const HeaderComponent = () =>{
    return (
        <>
            <div className="header">
                <Title />
                <div className='nav-items'>
                    <ul>
                        <li>Home</li>
                        <li>About</li>
                        <li>Contact</li>
                        <li>Cart</li>
                    </ul>
                </div>
            </div>
        </>
    )
}

const RestaurantCard = ({name, cuisines, cloudinaryImageId, totalRatingsString}) => {
    return (
        <div className='card'>
            <img src={IMG_CDN_URL + cloudinaryImageId} />
            <h3>{name}</h3>
            <h4>{cuisines.join(", ")}</h4>
            <h5>{totalRatingsString}</h5>
        </div>
    )
}

const Body = () => {
    return (
        <div className='restaurant-list'>
            {
                RestaurantList.map(restaurant =>{
                    return <RestaurantCard {...restaurant.data} />
                })
            }
        </div>
    )
}
const Footer = () => {
    return 
}

const AppLayout = () =>{
    return (
        <>
            <HeaderComponent />
            <Body />
            <Footer />
        </>
    )
}

const root = ReactDOM.createRoot(document.getElementById("root"))

root.render(<AppLayout />);