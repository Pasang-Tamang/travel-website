"use client";
import { React, useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ReactStar from "react-rating-stars-component";
import FilterOutlinedIcon from "@mui/icons-material/FilterOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";

import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import Link from "next/link";
import EastIcon from "@mui/icons-material/East";
import EastOutlinedIcon from "@mui/icons-material/EastOutlined";
import { motion } from "framer-motion";
import { useScroll } from "../UseScroll";

import Vedio from "./Vedio";

import PopUpModel from "../reusableComponents/PopUpModel";
import { featureAnimation } from "@/animation/Animation";
import ImageListm from "./ImageList";

const Feature = ({ featureTour }) => {
  const baseUrl = process.env.url;
  const [isOpen, setIsOpen] = useState(false);

  // eslint-disable-next-line no-unused-vars
  function openModal() {
    setIsOpen(!isOpen);
  }

  // console.log("feature tour", featureTour);

  const [, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount >= 2) {
          clearInterval(interval);
          return prevCount;
        }
        return prevCount + 1;
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);
  // const handleCloseVideo = () => setShowVideo(false)

  const [show, setShow] = useState(false);
  const [showvideo, setShowVideo] = useState(false);

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
    const videoLink = index
      .replace("youtu.be", "youtube.com")
      .replace(".com", ".com/embed");
    setUrl(videoLink);
  };

  const handleCloseVideo = () => setShowVideo(false);

  const [element, controls] = useScroll();

  // const options = {
  //   edit: false,
  //   color: "#DEDDDC",
  //   activeColor: "#FB8500",
  //   value: 4.5,
  //   isHalf: true,

  //   // size: window.innerWidth < 600 ? 20 : 26,
  //   count: 5,
  // };

  const [rating, setRating] = useState(0);

  const handleRatingChange = (value) => {
    setRating(value); // Update the rating value in the state
  };
  // useEffect(() => {}, [options.value]);
  // console.log("feature", featureTour);
  return (
    <>
      <motion.section
        className="feature"
        ref={element}
        animate={controls}
        transition={{
          staggerChildren: 0.3,
        }}
      >
        <PopUpModel
          show={show}
          handleclose={handleClose}
          header="Trip Images"
          body={<ImageListm gallery={galleries} />}
          className="img-popup"
        />

        <PopUpModel
          show={showvideo}
          handleclose={handleCloseVideo}
          body={<Vedio url={url} />}
          className="img-popup"
        />
        <h2 className="text-center mb-4 fp-bold"> Feature Holidays Package </h2>
        <Container className="">
          <div className="iphone-se">
            <Row className="">
              {/* {console.log("featuresss", featureTour)} */}
              {featureTour?.map((data, index) => {
                const options = {
                  edit: false,
                  color: "#DEDDDC",
                  activeColor: "#fb8500",
                  value: data?.overall_rating,
                  isHalf: true,
                  count: 5,
                  // size: window.innerWidth < 600 ? 20 : 20,
                };
                if (typeof window !== "undefined") {
                  options.size = window.innerWidth < 600 ? 20 : 26;
                }
                return (
                  <Col md={6} lg={4} key={index}>
                    <motion.div
                      className="feature-box"
                      variants={featureAnimation}
                    >
                      <div className="feature-img">
                        {/* <Link href={`/trip/${data?.slug}/`}> */}
                        <img
                          // src={window.baseURL + data?.image}
                          src={`${baseUrl}/${data?.image}
                            `}
                          alt={data?.image_caption}
                          className="img-fluid"
                          loading="lazy"
                          style={{
                            objectFit: "cover",
                            width: "100%",
                            height: "332px",
                          }}
                        />
                        {/* </Link> */}
                        <button className="feature-btn">FEATURED</button>
                        <div className="feature-content">
                          <div className="star d-flex align-item-center justify-content-between">
                            <div className="star-box d-flex align-item-center justiy-content-center">
                              <ReactStar {...options} />
                              <span className="mt-2 ms-1">
                                {data?.overall_rating}
                              </span>
                            </div>
                            {/* {console.log(data)} */}
                            <div className="feature-icon d-flex">
                              {data.video_url && data.video_url.length > 0 && (
                                <div
                                  onClick={() => {
                                    setShowVideo(true);
                                  }}
                                >
                                  <div
                                    onClick={() =>
                                      handleShowVideo(data?.video_url)
                                    }
                                  >
                                    <VideocamOutlinedIcon className="icon-top ms-3 " />
                                  </div>
                                </div>
                              )}
                              <div className="box-cover ms-2 me-2">
                                <FilterOutlinedIcon
                                  className="icon-top "
                                  onClick={() =>
                                    handleShow(data?.tourgallaries)
                                  }
                                />
                                <div className="box">
                                  {data?.tourgallaries?.length}
                                </div>
                              </div>
                            </div>
                          </div>
                          <Link href={`/trip/${data.slug}`}>
                            <div className="tour-title">
                              <h2>{data?.title}</h2>
                            </div>
                          </Link>
                          <div className="text-center">
                            <span>
                              {" "}
                              From <strike>${data.previous_price}</strike>{" "}
                            </span>
                            <span style={{ marginLeft: "20px" }}>
                              $<span> {data?.current_price} </span>{" "}
                            </span>
                          </div>
                          <div className="tour-explor d-flex align-items-center justify-content-between me-2 ms-2">
                            <div className="icon-text d-flex">
                              <div>
                                {" "}
                                <AccessTimeOutlinedIcon className="icon" />{" "}
                                {Math.ceil(
                                  (new Date(data?.departures[0]?.end_date) -
                                    new Date(data?.departures[0]?.start_date)) /
                                    (1000 * 60 * 60 * 24) +
                                    1
                                )}{" "}
                                days{" "}
                              </div>
                              <div className="ms-4">
                                {" "}
                                <PeopleAltOutlinedIcon className="icon" />{" "}
                                {data?.group_size}
                              </div>
                            </div>
                            <Link href={`/trip/${data?.slug}`}>
                              <span>
                                Explore <EastOutlinedIcon />
                              </span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </Col>
                );
              })}
            </Row>
          </div>
          <div className="more-feature">
            <Link href={"/trip"}>
              <button className="vew-more">
                View More <EastIcon className="right-arr" />
              </button>
            </Link>
          </div>
        </Container>
      </motion.section>
    </>
  );
};

export default Feature;
