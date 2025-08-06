import { useState } from 'react'
import './App.css'
import Header from './components/Header'

import intro from '/assets/images/intro/intro.png'

import redRect from '/assets/images/features/rect1.svg'
import blueRect from '/assets/images/features/rect2.svg'
import yellowRect from '/assets/images/features/rect3.svg'
import goToPage from '/assets/images/features/go-to-page.svg'
import allInAll from '/assets/images/features/all-in-all.svg'
import pcs from '/assets/images/features/pcs.svg'
import phones from '/assets/images/features/phones.svg'

function App() {

  return (
    <>
      <section className='intro-section'>
        <Header />
        <div className="intro-content">
          <div className="intro-text-wrapper">
            <h1 className="intro-title">Your Tech — Your Rules</h1>
            <p className="intro-text">Smartphones and Laptops <br/> with Quality Guarantee</p>
            <button className='intro-button'>Catalog</button>
          </div>
          <div className='intro-image'>
            <img src={intro} alt="Intro-image"/>
          </div>
        </div>
      </section>

      <section className='features-section'>
        <div className='feature'>
          <img src={redRect} alt="" />
          <h2>The laptop that <span className='green-words'>does <br/> it all</span></h2>
          <img src={goToPage} alt="" className='feature-go-to-img'/>
          <img src={pcs} alt="" className='feature-img'/>
        </div>
        <div className='feature'>
          <img src={blueRect} alt=""/>
          <h2>The <span className='green-words'>best phones</span> of recent years</h2>
          <h3>2025</h3>
          <img src={goToPage} alt="" className='feature-go-to-img' />
          <img src={phones} alt=""  className='feature-img'/>
        </div>
        <div className='feature'>
          <img src={yellowRect} alt="" />
          <h2><span className='green-words'>All</span> the best - in one place</h2>
          <img src={goToPage} alt="" className='feature-go-to-img' />
          <img src={allInAll} alt="" className='feature-img'/>
        </div>
      </section>
      <section className='products-section'>
      </section>
      <section className='collections-section'>
      </section>
    </>
  )
}

export default App
