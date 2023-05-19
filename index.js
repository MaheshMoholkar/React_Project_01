import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import logo from  './img/logo.png'
import { IMG_CDN_URL } from './components/config'

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
    const [fillteredRestaurants, setFillteredRestaurants] = useState([])
    const [allRestaurants, setAllRestaurants] = useState([])
    const [searchText, setSearchText] = useState('')

    useEffect(() => {
        getRestaurants()
    }, [])

    async function getRestaurants(text) {
        const data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=18.5204303&lng=73.8567437&page_type=DESKTOP_WEB_LISTING")
        const json = await data.json()
        setAllRestaurants(json?.data?.cards[2]?.data?.data?.cards)
        setFillteredRestaurants(json?.data?.cards[2]?.data?.data?.cards)
    }

    function filterData(text, list){
        const data = list.filter(restaurant=>{
            return restaurant?.data?.name.includes(text)
        })
        return data
    }
    return (
        <>
            <div className='search-container'>
                <input
                    type='text'
                    className='search-input'
                    placeholder='Search'
                    value={searchText}
                    onChange={(e)=>{
                        setSearchText(e.target.value)
                    }}
                />
                <button
                    type='submit'
                    onClick={() => {
                            const data = filterData(searchText, allRestaurants)
                            setFillteredRestaurants(data)
                        }
                    }
                >
                    Search
                </button>
            </div>
            <div className='restaurant-list'>
            {
                fillteredRestaurants.map(restaurant =>{
                    return <RestaurantCard {...restaurant.data} key = {restaurant.data.id} />
                })
            }
        </div>
        </>
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