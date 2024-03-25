"use client";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import MobileDetect from "mobile-detect";
import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import EastOutlinedIcon from "@mui/icons-material/EastOutlined";
import FilterOutlinedIcon from "@mui/icons-material/FilterOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import Link from "next/link";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
// import axios from 'axios'
import StarIcon from "@mui/icons-material/Star";

// import ReactImageMagnify from 'react-image-magnify'
import ImageList from "./ImageList";
import Vedio from "./Vedio";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import PopUpModel from "../reusableComponents/PopUpModel";

// export async function getStaticParams() {
//   const res = await fetch(
//     "https://destination.missionsummittreks.com/api/tours/popular"
//   );
//   const popularTour = await res.json();
//   return { props: { popularTour } };
// }

const SliderComponent = ({ popularTour }) => {
  const baseUrl = process.env.url;
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

  // console.log("dsdasd", popularTour);
  const modalImage = [
    {
      img: "https://www.switchbacktravel.com/sites/default/files/images/articles/Mt.%20Everest%20Nepal.jpg",
    },
    {
      img: "https://www.switchbacktravel.com/sites/default/files/images/articles/Mt.%20Everest%20Nepal.jpg",
    },
    {
      img: "https://www.switchbacktravel.com/sites/default/files/images/articles/Mt.%20Everest%20Nepal.jpg",
    },
  ];

  // const [isOpen, setIsOpen] = useState(false)

  const [show, setShow] = useState(false);
  const [showvideo, setShowVideo] = useState(false);
  // const [modal, setModal] = useState('image')
  const [url, setUrl] = useState(null);
  const [galleries, setGalleries] = useState(null);
  const handleClose = () => setShow(false);

  // popup logic
  const handleShow = (gallery) => {
    setShow(true);
    setGalleries(gallery);
  };

  const handleShowVideo = (index) => {
    setShowVideo(true);
    setUrl(index);
  };

  const handleCloseVideo = () => setShowVideo(false);
  const responsive = {
    // ssr: true,
    // showDots: false,
    // autoplay: false,
    // swipeable: false,
    // margin: 4,
    // responsiveClass: true,
    // nav: true,
    // smartSpeed: 1000,

    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 2,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 2,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  // console.log("popular", popularTour);

  return (
    <>
      <PopUpModel
        show={showvideo}
        handleclose={handleCloseVideo}
        body={<Vedio video={popularTour} url={url} />}
        className="img-popup"
      />
      <PopUpModel
        show={show}
        handleclose={handleClose}
        header="Trip Images"
        body={<ImageList popularTour={modalImage} gallery={galleries} />}
        className="img-popup"
      />

      <section className="slide">
        <Container className="mt-5">
          <h2 className="text-center mb-2 fp-bold">Most Popular Trekking</h2>

          <Carousel
            className="owl-theme top-place-carsouel "
            responsive={responsive}
            ssr={true}
            deviceType={deviceType}
          >
            {/* {console.log("owlpop", popularTour, "owlpop")} */}
            {popularTour?.map((popular, index) => {
              return (
                <div className="top-place m-2" key={`popular_${index}`}>
                  {/* {console.log(popular, "index")} */}
                  <div className="img-box">
                    <Link href={`/trip/${popular.slug}`}>
                      <img
                        src={`${baseUrl}/${popular?.image}
                          `}
                        className="img-fluid"
                        alt=""
                        loading="lazy"
                      />
                    </Link>
                    <div className="top-btn">
                      <StarIcon className="me-1" /> BEST PRICE
                    </div>

                    <div className="over-box">
                      <div className="over-box-content">
                        <span className="me-5">
                          <i
                            className="fa-regular fa-clock"
                            style={{ marginRight: "3px" }}
                          ></i>
                          {Math.ceil(
                            (new Date(popular?.departures[0]?.end_date) -
                              new Date(popular?.departures[0]?.start_date)) /
                              (1000 * 60 * 60 * 24) +
                              1
                          )}{" "}
                          days
                        </span>{" "}
                        <span>
                          <i
                            className="fa-solid fa-dollar-sign"
                            style={{ marginRight: "1px" }}
                          ></i>
                          {popular?.current_price}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="content">
                    <Link href={`/trip/${popular.slug}`}>
                      <h3 className="text-center ">{popular?.title}</h3>
                    </Link>
                    <Row className="mt-4">
                      <Col xs={8} md={8} lg={6}>
                        <Link href={`/trip/${popular.slug}`}>
                          <button className="rd-btn ms-2">
                            <span>Read Details</span>
                            <EastOutlinedIcon className="arrow ms-3" />
                          </button>
                        </Link>
                      </Col>
                      <Col xs={4} md={4} lg={6}>
                        <div className="top-palce-icon d-flex align-items-center justify-content-end mt-3 me-3 ">
                          <div
                            className="box-cover"
                            onClick={() => handleShow(popular?.tourgallaries)}
                          >
                            {" "}
                            <FilterOutlinedIcon className="icon-top" />
                            <div className="box">
                              {popular?.tourgallaries?.length}
                            </div>
                          </div>
                          {popular.video_url &&
                            popular.video_url.length > 0 && (
                              <div
                                onClick={() =>
                                  handleShowVideo(popular?.video_url)
                                }
                              >
                                <VideocamOutlinedIcon className="icon-top ms-4" />
                              </div>
                            )}
                        </div>
                      </Col>
                    </Row>
                  </div>
                </div>
              );
            })}
          </Carousel>
        </Container>
      </section>
    </>
  );
};

export default SliderComponent;
