import { Link } from 'react-router-dom'

import "../styles/main.css"
import '../styles/products.css'
import '../styles/collections.css'


import Card from '../components/Card'


import intro from '/assets/images/intro/intro.png'
import redRect from '/assets/images/features/rect1.svg'
import blueRect from '/assets/images/features/rect2.svg'
import yellowRect from '/assets/images/features/rect3.svg'
import goToPage from '/assets/images/features/go-to-page.svg'
import allInAll from '/assets/images/features/all-in-all.svg'
import pcs from '/assets/images/features/pcs.svg'
import phones from '/assets/images/features/phones.svg'

export default function HomePage() {
  return (
    <>
      <section className='intro-section'>
        <div className="intro-content">
          <div className="intro-text-wrapper">
            <h1 className="intro-title">Your Tech — Your Rules</h1>
            <p className="intro-text">Smartphones and Laptops <br /> with Quality Guarantee</p>

            <button className='intro-button'>Catalog</button>
          </div>
          <div className='intro-image'>
            <img src={intro} alt="Intro-image" />
          </div>
        </div>
      </section>

      <section className='features-section'>
        <div className='feature'>
          <img src={redRect} alt="" />
          <h2>The laptop that <span className='green-words'>does <br /> it all</span></h2>
          <img src={goToPage} alt="" className='feature-go-to-img' />
          <img src={pcs} alt="" className='feature-img' />
        </div>
        <div className='feature'>
          <img src={blueRect} alt="" />
          <h2>The <span className='green-words'>best phones</span> of recent years</h2>
          <h3>2025</h3>
          <img src={goToPage} alt="" className='feature-go-to-img' />
          <img src={phones} alt="" className='feature-img' />
        </div>
        <div className='feature'>
          <img src={yellowRect} alt="" />
          <h2><span className='green-words'>All</span> the best - in one place</h2>
          <img src={goToPage} alt="" className='feature-go-to-img' />
          <img src={allInAll} alt="" className='feature-img' />
        </div>
      </section>

      <section className='products-section'>
        <div className="products-wrapper">
          <h2 className='product-title'>Best Sellers</h2>
          <div className='products-list'>
            <Card
              id="654321"
              title='iPhone 16 Pro Max, 256 GB, 8 GB RAM, A18 Pro, 6.9" OLED, 48 MP, USB-C, Titanium, iOS 18'
              price="1299"
              imageUrl="/assets/images/products/Phone.png"
              inBasket={false}
              category="school"
              onSale={true}
              originalPrice="1399"
            />
            <Card
              id="123456"
              title='iPhone 16 Pro Max, 256 GB, 8 GB RAM, A18 Pro, 6.9" OLED, 48 MP, USB-C, Titanium, iOS 18'
              price="1299"
              imageUrl="/assets/images/products/Phone.png"
              inBasket={false}
              category="school"
              onSale={false}
              originalPrice=""
            />
          </div>
        </div>
        <div className="products-wrapper">
          <h2 className='product-title'>Sales</h2>
          <div className='products-list'>
            <Card
              id="123456"
              title='iPhone 16 Pro Max, 256 GB, 8 GB RAM, A18 Pro, 6.9" OLED, 48 MP, USB-C, Titanium, iOS 18'
              price="1299"
              imageUrl="/assets/images/products/Phone.png"
              inBasket={false}
              category="school"
              onSale={false}
              originalPrice=""
            />
            <Card
              id="123456"
              title='iPhone 16 Pro Max, 256 GB, 8 GB RAM, A18 Pro, 6.9" OLED, 48 MP, USB-C, Titanium, iOS 18'
              price="1299"
              imageUrl="/assets/images/products/Phone.png"
              inBasket={false}
              category="school"
              onSale={false}
              originalPrice=""
            />
            <Card
              id="123456"
              title='iPhone 16 Pro Max, 256 GB, 8 GB RAM, A18 Pro, 6.9" OLED, 48 MP, USB-C, Titanium, iOS 18'
              price="1299"
              imageUrl="/assets/images/products/Phone.png"
              inBasket={false}
              category="school"
              onSale={false}
              originalPrice=""
            />
            <Card
              id="123456"
              title='iPhone 16 Pro Max, 256 GB, 8 GB RAM, A18 Pro, 6.9" OLED, 48 MP, USB-C, Titanium, iOS 18'
              price="1299"
              imageUrl="/assets/images/products/Phone.png"
              inBasket={false}
              category="school"
              onSale={false}
              originalPrice=""
            />
            <Card
              id="123456"
              title='iPhone 16 Pro Max, 256 GB, 8 GB RAM, A18 Pro, 6.9" OLED, 48 MP, USB-C, Titanium, iOS 18'
              price="1299"
              imageUrl="/assets/images/products/Phone.png"
              inBasket={false}
              category="school"
              onSale={false}
              originalPrice=""
            />
            <Card
              id="123456"
              title='iPhone 16 Pro Max, 256 GB, 8 GB RAM, A18 Pro, 6.9" OLED, 48 MP, USB-C, Titanium, iOS 18'
              price="1299"
              imageUrl="/assets/images/products/Phone.png"
              inBasket={false}
              category="school"
              onSale={false}
              originalPrice=""
            />
            
          </div>
        </div>
      </section>

      <section className='collections-section'>
        <h2 className='collections-title'>Collections</h2>
        <div className="collections-wrapper">
          <div className="collection">
            <img
              src={import.meta.env.BASE_URL + "/assets/images/collections/rect1.svg"}
              alt="School Collection"
              className="collection-bg" />
            <img
              src={import.meta.env.BASE_URL + "/assets/images/collections/school.svg"}
              alt="Go to school collection"
              className='go-to-col' />
            <img
              src={import.meta.env.BASE_URL + "/assets/images/collections/school-img.png"}
              alt="School img"
              className="collection-img" />
          </div>
          <div className="collection">
            <img
              src={import.meta.env.BASE_URL + "/assets/images/collections/rect2.svg"}
              alt="Work Collection"
              className="collection-bg" />
            <img
              src={import.meta.env.BASE_URL + "/assets/images/collections/work.svg"}
              alt="Go to work collection"
              className='go-to-col' />
            <img
              src={import.meta.env.BASE_URL + "/assets/images/collections/work-img.png"}
              alt="Work img"
              className="collection-img" />
          </div>
          <div className="collection">
            <img
              src={import.meta.env.BASE_URL + "/assets/images/collections/rect3.svg"}
              alt="Gaming Collection"
              className="collection-bg" />
            <img
              src={import.meta.env.BASE_URL + "/assets/images/collections/gaming.svg"}
              alt="Go to gaming collection"
              className='go-to-col' />
            <img
              src={import.meta.env.BASE_URL + "/assets/images/collections/gaming-img.png"}
              alt="Gaming img"
              className="collection-img" />
          </div>
        </div>
      </section>
    </>
  )
}
