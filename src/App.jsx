import { useState } from 'react'
import './App.css'
import Header from './components/Header'

import intro from '/assets/images/intro/intro.png'

function App() {

  return (
    <>
      <section className='intro-section'>
        <Header />
        <div className="intro-content">
          <div className="intro-text-wrapper">
            <h1 className="intro-title">Your Tech — Your Rules</h1>
            <p className="intro-text">Smartphones and Laptops with Quality Guarantee</p>
            <button className='intro-button'>Catalog</button>
          </div>
          <img src={intro} alt="Intro-image" className="intro-image" />
        </div>
      </section>
    </>
  )
}

export default App
