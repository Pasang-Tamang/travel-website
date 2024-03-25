"use client";
import React, { useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Lightbox from "react-image-lightbox";

const option = {
  ssr: true,
  showDots: false,
  autoplay: false,
  swipeable: false,
  margin: 4,
  responsiveClass: true,
  nav: true,
  smartSpeed: 1000,
  responsive: {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 2,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  },
};
const ImageListm = ({ gallery }) => {
  const url = process.env.url;
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  return (
    <>
      <Carousel className="owl-theme  modal-img-slide" {...option}>
        {gallery?.map((source, index) => {
          return (
            <div className="modal-img" key={`modal_${index}`}>
              <img
                style={{
                  height: "400px",
                }}
                src={`${url}/${source?.image}`}
                alt=""
                className="img-fluid"
              />
            </div>
          );
        })}
        {isViewerOpen && (
          <Lightbox
            // mainSrc={modalImage[currentImage]}
            onCloseRequest={() => setIsViewerOpen(false)}
          />
        )}
      </Carousel>
    </>
  );
};

export default ImageListm;
