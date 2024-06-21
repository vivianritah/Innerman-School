import React from 'react';
import Slider from 'react-slick';
import background1 from '../images/background1.jpg';
import background2 from '../images/background2.jpg';
import background3 from '../images/background3.jpg';
import background4 from '../images/background4.jpg';
import background5 from '../images/background5.jpg';
import './slideShow.css';

const HeaderSlideshow = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const images = [background1, background2, background3, background4, background5]; // Added background5 here

  return (
    <div className="slideshow-container">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index}>
            <img src={image} alt={`Slide ${index}`} className="slide-image" />
            {/* Slide number removed */}
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HeaderSlideshow;
