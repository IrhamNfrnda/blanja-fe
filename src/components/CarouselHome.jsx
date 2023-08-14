import React from "react";
import "../style/components/CarouselItemHome.scss";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";

function CarouselHome() {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 1024 },
      items: 3,
    },
    desktop: {
      breakpoint: { max: 1024, min: 800 },
      items: 2.5,
    },
    tablet: {
      breakpoint: { max: 800, min: 575 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 575, min: 0 },
      items: 1,
    },
  };

  return (
    <div className="CarouselHome">
      <div className="container">
        <Carousel
          responsive={responsive}
          showDots={true}
          autoPlay={false}
          infinite={true}
          centerMode={false}
          itemClass="style-item"
        >
          <div className="item">
            <Link to={"#"} style={{ textDecoration: "none" }}>
              <div
                className="img-item"
                style={{
                  backgroundImage: "url('./assets/img/carousel-item-1.webp')",
                }}
              >
                <h2 className="title-item text-white">Casual Trending</h2>
              </div>
            </Link>
          </div>

          <div className="item">
            <Link to={"#"} style={{ textDecoration: "none" }}>
              <div
                className="img-item"
                style={{
                  backgroundImage: "url('./assets/img/carousel-item-2.webp')",
                }}
              >
                <h2 className="title-item text-white">Black Edition</h2>
              </div>
            </Link>
          </div>

          <div className="item">
            <Link to={"#"} style={{ textDecoration: "none" }}>
              <div
                className="img-item"
                style={{
                  backgroundImage: "url('./assets/img/carousel-item-3.webp')",
                }}
              >
                <h2 className="title-item text-white">Popular Teenager</h2>
              </div>
            </Link>
          </div>

          <div className="item">
            <Link to={"#"} style={{ textDecoration: "none" }}>
              <div
                className="img-item"
                style={{
                  backgroundImage: "url('./assets/img/carousel-item-4.webp')",
                }}
              >
                <h2 className="title-item text-white">Thrift Here</h2>
              </div>
            </Link>
          </div>

          <div className="item">
            <Link to={"#"} style={{ textDecoration: "none" }}>
              <div
                className="img-item"
                style={{
                  backgroundImage: "url('./assets/img/carousel-item-5.webp')",
                }}
              >
                <h2 className="title-item text-white">Luxury in 2023</h2>
              </div>
            </Link>
          </div>

          <div className="item">
            <Link to={"#"} style={{ textDecoration: "none" }}>
              <div
                className="img-item"
                style={{
                  backgroundImage: "url('./assets/img/carousel-item-6.webp')",
                }}
              >
                <h2 className="title-item text-white">Happy Holiday</h2>
              </div>
            </Link>
          </div>

          <div className="item">
            <Link to={"#"} style={{ textDecoration: "none" }}>
              <div
                className="img-item"
                style={{
                  backgroundImage: "url('./assets/img/carousel-item-7.webp')",
                }}
              >
                <h2 className="title-item text-white">Time for Trends</h2>
              </div>
            </Link>
          </div>

          <div className="item">
            <Link to={"#"} style={{ textDecoration: "none" }}>
              <div
                className="img-item"
                style={{
                  backgroundImage: "url('./assets/img/carousel-item-8.webp')",
                }}
              >
                <h2 className="title-item text-white">Best Model Ever</h2>
              </div>
            </Link>
          </div>

          <div className="item">
            <Link to={"#"} style={{ textDecoration: "none" }}>
              <div
                className="img-item"
                style={{
                  backgroundImage: "url('./assets/img/carousel-item-9.webp')",
                }}
              >
                <h2 className="title-item text-white">Modern Vintage</h2>
              </div>
            </Link>
          </div>
        </Carousel>
      </div>
    </div>
  );
}

export default CarouselHome;
