/* eslint-disable no-unused-vars */
"use client";
import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Container } from "react-bootstrap";

import ProfileItem from "./ProfileItem";
import MobileDetect from "mobile-detect";

const ClintReview = ({ clintReview }) => {
  let deviceType = "";
  let userAgent;

  const md = new MobileDetect(userAgent);
  if (md.tablet()) {
    deviceType = "tablet";
  } else if (md.mobile()) {
    deviceType = "mobile";
  } else {
    deviceType = "desktop";
  }

  const responsive = {
    // ssr: true,
    // margin: 20,
    // responsiveClass: true,
    // nav: false,
    // showDots: false,
    // autoplay: false,
    // smartSpeed: 1000,

    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 3,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  // const [count, setCount] = useState(0);
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCount((prevCount) => {
  //       if (prevCount >= 60) {
  //         clearInterval(interval);
  //         return prevCount;
  //       }
  //       return prevCount + 1;
  //     });
  //   }, 3000);

  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, []);

  //const maxLength = 130;
  // const toggleTruncate = (index) => {
  //   setIsTruncated(!isTruncated);
  //   console.log("toggled!", index);
  // };

  return (
    <>
      <section className="slide-clint mt-5">
        <Container className="mt-5">
          <h2 className="text-center py-5">
            <span>Our happy</span> Clients
          </h2>

          <Carousel
            className="owl-theme clint-review-carsouel"
            responsive={responsive}
            ssr={true}
            deviceType={deviceType}
          >
            {/* {console.log(clintReview, "reviewss")} */}
            {clintReview?.map((clint) => (
              <ProfileItem key={clint} {...clint} />
            ))}
          </Carousel>
        </Container>
      </section>
    </>
  );
};

export default ClintReview;
