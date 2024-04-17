import React, { useState } from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import AppDownloade from '../../components/AppDownloade/AppDownloade'

const Home = () => {

  const [category , setCatgory] = useState("All");

  return (
    <div>
      <Header/>
      <ExploreMenu category={category} setCatgory={setCatgory}/>
      <FoodDisplay category={category} />
      <AppDownloade/>
    </div>
  )
}

export default Home
