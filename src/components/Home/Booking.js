"use client";
import { React, useState } from "react";

import Link from "next/link";
import SkateboardingIcon from "@mui/icons-material/Skateboarding";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import HikingIcon from "@mui/icons-material/Hiking";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ReactStar from "react-rating-stars-component";
import { motion } from "framer-motion";

import { useScroll } from "../UseScroll";
import { testimonialsAnimations } from "@/animation/Animation";

const Booking = ({ featuredHome }) => {
  const url = process.env.url;
  const options = {
    edit: false,
    color: "#fb8500",
    activeColor: "#fb8500",
    value: 4.5,
    isHalf: true,
    fontSize: 30,
    count: 5,
  };

  if (typeof window !== "undefined") {
    options.size = window.innerWidth < 600 ? 30 : 46;
  }
  const [element, controls] = useScroll();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await axios.get(
  //       "https://destination.missionsummittreks.com/api/tours/featuredHome"
  //     );
  //     setFeaturedHome(response.data);
  //   };
  //   fetchData();
  // }, []); // Empty dependency array to fetch data only once on mount

  return (
    <>
      <section
        className="booking"
        style={{
          backgroundImage: `url(${`${url}/${featuredHome?.image}`})`,
          backgroundSize: "cover",
        }}
        ref={element}
      >
        <motion.div
          className="content pt-3"
          variants={testimonialsAnimations}
          animate={controls}
          transition={{
            delay: 0.1,
            type: "tween",
            duration: 0.8,
          }}
        >
          <div className="booking-cont">
            <div className="d-flex align-items-center justify-content-around mt-4">
              <div className="circle ">
                <HikingIcon className="hike-icon " />
              </div>
            </div>
            <h2
              className=" text-center mt-4"
              style={{ fontSize: "50", fontWeight: "200" }}
            >
              {featuredHome?.title}
            </h2>
            <h2
              className="text-center mt-4"
              style={{ fontSize: "64", fontWeight: "200" }}
            >
              Holiday
            </h2>
            <div className=" d-flex justify-content-center align-items-center mt-4 ">
              <div>
                <div className="tour">
                  <div className=" d-flex align-items-center p-3">
                    <SkateboardingIcon
                      className="icon-tour"
                      style={{ fontSize: "300%" }}
                    />
                    <div>
                      <span className="booking-text">Grade</span>{" "}
                      <p className="booking-text">{featuredHome?.trip_grade}</p>
                    </div>
                  </div>
                  <div className=" d-flex align-items-center p-3  event-type">
                    <AccessTimeIcon
                      className="icon-tour"
                      style={{ fontSize: "300%" }}
                    />{" "}
                    <div>
                      <span className="booking-text">Duration</span>{" "}
                      <p className="booking-text">
                        {Math.ceil(
                          (new Date(featuredHome?.departures?.[0]?.end_date) -
                            new Date(
                              featuredHome?.departures?.[0]?.start_date
                            )) /
                            (1000 * 60 * 60 * 24) +
                            1
                        )}{" "}
                        days
                      </p>
                    </div>
                  </div>

                  <div className="  d-flex align-items-center p-3 event-type ">
                    <HikingIcon
                      className="icon-tour"
                      style={{ fontSize: "300%" }}
                    />{" "}
                    <div>
                      <span className="booking-text">Activity</span>{" "}
                      <p className="booking-text">
                        {featuredHome?.activitie?.activity_name}
                      </p>
                    </div>
                  </div>

                  <div className=" d-flex align-items-center ms-5 event-type">
                    <div className="price me-3 ">
                      <AttachMoneyIcon
                        className="icon-tou me-0"
                        style={{ fontSize: "300%" }}
                      />
                    </div>
                    <div>
                      <span className="d-price">
                        From US ${featuredHome?.previous_price}
                      </span>{" "}
                      <p> US${featuredHome?.current_price}</p>
                    </div>
                  </div>
                </div>
                <div className="star d-flex align-items-center justify-content-center mt-4 ">
                  {/* <ReactStar {...options} />{" "} */}
                  <span className="ms-4">
                    {featuredHome?.no_of_reviews} Reviews
                  </span>
                </div>
                <div className="book-btn d-flex center align-items-center justify-content-center  mt-4">
                  <Link href={`/trip/${featuredHome.slug}`}>
                    <button className="btn ">Book Today</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </>
  );
};

export default Booking;
