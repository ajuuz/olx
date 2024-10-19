// importing components
import Header from '../../Components/Header/Header';
import CardSection from '../../Components/CardSection/CardSection';
import Footer from '../../Components/Footer/Footer.jsx'
import React from 'react'
import { useUser } from '../../UserProvider.jsx';

const Home = () => {
  return (
    <div>
      <Header/>
      <CardSection/>
      <Footer/>
    </div>
  )
}

export default Home;
