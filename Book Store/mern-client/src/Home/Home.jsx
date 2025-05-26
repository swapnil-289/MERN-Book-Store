import React from 'react'
import Banner from '../components/banner'
import FavBook from './FavBook'
import BestSellerBooks from './BestSellerBooks'
import PromoBanner from './PromoBanner'
import OtherBooks from './OtherBooks'
import Reviews from './Reviews'



const Home = () => {
  return (
    <div>
      <Banner/>
      <BestSellerBooks/>
      <FavBook/>
      <PromoBanner/>
      <OtherBooks/>
      <Reviews/>
    
    </div>
  )
}

export default Home