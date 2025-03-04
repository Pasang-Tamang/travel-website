"use client";
import React, { useState, useRef, useEffect } from "react";
import { Col, Row, Container, Table, Button, Carousel } from "react-bootstrap";
import ReactStar from "react-rating-stars-component";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import Link from "next/link";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import StarRateIcon from "@mui/icons-material/StarRate";
import HikingIcon from "@mui/icons-material/Hiking";
import LocalHotelIcon from "@mui/icons-material/LocalHotel";
import EscalatorWarningIcon from "@mui/icons-material/EscalatorWarning";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import "react-image-lightbox/style.css";
import Lightbox from "react-image-lightbox";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import PopUpModel from "../reusableComponents/PopUpModel";
import EnqueryForm from "./EnqueryForm";

const EverestTrek = ({ tour, tripId, tourId, review, itinerary }) => {
  const [fix, setFix] = useState(false);
  const [fixMid, setFixs] = useState(false);
  const [show, setShow] = useState(false);
  const [navfix, setNavFix] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [rating, setRating] = useState(0);
  const [faq, setFaq] = useState([]);

  const targetRefs = [
    useRef(),
    useRef(),
    useRef(),
    useRef(),
    useRef(),
    useRef(),
    useRef(),
    useRef(),
  ];

  const [option, setOption] = useState({
    edit: true,
    color: "#DEDDDC",
    activeColor: "#fb8500",
    value: 5,
    isHalf: true,
    //size: window.innerWidth < 600 ? 20 : 12,
  });

  const [options, setOptions] = useState({
    edit: false,
    color: "#DEDDDC",
    activeColor: "#fb8500",
    value: 4.5, // Initial value
    isHalf: true,
    // size: window.innerWidth < 600 ? 20 : 28,
    count: 5,
  });

  var ratingSize;
  if (typeof window !== "undefined") {
    ratingSize = window.innerWidth < 600 ? 20 : 28;
  }
  const ratingOptions = {
    edit: false,
    count: 5,
    //color: "#DEDDDC",
    color: "#fb8500",
    value: rating, // Initial value
    isHalf: true,
    size: ratingSize,
    //
  };
  const handleRatingChange = (value) => {
    setRating(value); // Update the rating value in the state
  };
  useEffect(() => {}, [options.value]);
  useEffect(() => {
    // Assuming tour?.itinerary and tour?.faq are your original arrays
    const initialItinerary = tour?.itinerary || [];
    const initialFaq = tour?.faq || [];

    // Create a new array with isOpen property set to false for each item
    const itemsWithOpenProperty = initialItinerary.map((item) => ({
      ...item,
      isOpen: false,
    }));

    const faqWithOpenProperty = initialFaq.map((item) => ({
      ...item,
      isOpen: false,
    }));
    // Now, you have separate arrays for items and FAQ items with the isOpen property.
    // Set the states accordingly.
    setItems(itemsWithOpenProperty);
    setFaq(faqWithOpenProperty);
  }, [tour?.itinerary, tour?.faq]);
  const expandAll = () => {
    setItems((prevItems) =>
      prevItems.map((item) => ({ ...item, isOpen: true }))
    );
  };

  const collapseAll = () => {
    setItems((prevItems) =>
      prevItems.map((item) => ({ ...item, isOpen: false }))
    );
  };

  const expandAllFaq = () => {
    setFaq((prevFaq) => prevFaq.map((item) => ({ ...item, isOpen: true })));
  };

  const collapseAllFaq = () => {
    setFaq((prevFaq) => prevFaq.map((item) => ({ ...item, isOpen: false })));
  };

  const toggleItem = (itemId) => {
    //console.log("itinary working", itemId);
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, isOpen: !item.isOpen } : item
      )
    );
  };

  const toggleFaq = (itemId) => {
    // console.log("toggleFaq working", itemId);
    setFaq((prevFaq) =>
      prevFaq?.map((item) =>
        item?.id === itemId ? { ...item, isOpen: !item?.isOpen } : item
      )
    );
  };

  // Function to handle scrolling for a specific target
  const handleScroll = (targetIndex) => {
    // Get the ref object for the target
    const targetRef = targetRefs[targetIndex];

    // Calculate the scroll position for the target element
    const targetScrollPosition = targetRef.current.offsetTop;

    if (typeof window !== "undefined") {
      window.scrollTo({
        top: targetScrollPosition,
        behavior: "smooth", // You can adjust scrolling behavior as needed
      });
    }
    // Scroll to the target element
  };
  const handleInqueryForm = () => setShow(true);

  const isShowRating = tour?.overall_rating > 0;
  const setfixMid = () => {
    if (typeof window !== "undefined") {
      if (window.scrollY <= 600) {
        setFixs(true);
      } else {
        setFixs(false);
      }
    }
  };

  const handleReviewForm = () => setShowReview(true);
  const [more, setMore] = useState("");
  const [, setLess] = useState("");
  const [text, setText] = useState("View More");
  const handleMore = () => {
    if (more === "") {
      setMore(
        <div>
          {review
            ?.filter(
              (item, index) =>
                tour?.departures[index]?.tour_id === tour?.tour_id
            )
            ?.slice(0, 15)
            ?.map((item, index) => (
              <div key={index} className="mt-3">
                <div className="d-flex">
                  <h6>{review[index]?.name},</h6>
                  <span className="ms-1">{review[index]?.country_name}</span>
                </div>
                <ReactStar {...option} />
                <div className="review-content">
                  <p>{review[index]?.description}</p>
                </div>
              </div>
            ))}
        </div>
      );
      setText("View Less");
      setLess("");
    } else if (more !== "") {
      setLess(
        <div>
          {review
            ?.filter(
              (item, index) =>
                tour?.departures[index]?.tour_id === tour?.tour_id
            )
            ?.slice(0, 3)
            ?.map((item, index) => (
              <div key={index} className="mt-3">
                <div className="d-flex">
                  <h6>{review[index]?.name},</h6>
                  <span className="ms-1">{review[index]?.country_name}</span>
                </div>
                <ReactStar {...option} />
                <div className="review-content">
                  <p>{review[index]?.description}</p>
                </div>
              </div>
            ))}
        </div>
      );
      setMore("");
      setText("View More");
    }
  };
  const setFixed = () => {
    if (typeof window !== "undefined") {
      if (window.scrollY >= 600) {
        setFix(true);
        const distanceFromBottom =
          document.documentElement.scrollHeight -
          window.innerHeight -
          window.scrollY;

        // Define a threshold value (e.g., 300 pixels from the bottom)
        const threshold = 518;

        // Check if the distance from the bottom is less than or equal to the threshold
        if (distanceFromBottom <= threshold) {
          // Your condition when close to the bottom of the page

          setFix(false);
        } else {
          setFix(true);
        }
      } else {
        setFix(false);
      }
    }
  };

  const setFixscroll = () => {
    if (typeof window !== "undefined") {
      if (window.scrollY >= 650) {
        setNavFix(true);
      } else if (window.scrollY <= 500) {
        setNavFix(false);
      }
    }
  };
  if (typeof window !== "undefined") {
    window.addEventListener("scroll", setFixed);
    window.addEventListener("scroll", setfixMid);
    window.addEventListener("scroll", setFixscroll);
  }
  const handleClose = () => setShow(false);
  return (
    <>
      <PopUpModel
        show={show}
        handleclose={handleClose}
        header="Inquire More About This Trip  "
        body={<EnqueryForm tourId={tour?.id} />}
        className="enquery-modal"
      />
      <Container>
        <div className="everest-container">
          <div className="everest-right">
            <div>
              <div className="flex-xs-column e-title  d-flex  align-items-center justify-content-between ">
                <div className="my-3">
                  <h1>{tour?.title}</h1>
                  <div className="hide-on-desktop">
                    <Row>
                      <Col xs={6}>
                        <span className="">
                          <TaskAltIcon className="me-1 task-icon" /> Best price
                          guaranteed{" "}
                        </span>
                      </Col>
                      <Col xs={6}>
                        <span className=" me-3">
                          <TaskAltIcon className="me-1 task-icon" />
                          No booking fees
                        </span>
                      </Col>
                      <Col xs={8}>
                        <span className="">
                          <TaskAltIcon className="me-1 task-icon" />
                          E-ticket/Mobile voucher
                        </span>
                      </Col>
                    </Row>
                  </div>
                  <div className="mt-2 hide-on-mb">
                    <span className="ps-0">
                      <TaskAltIcon className=" task-icon" /> Best price
                      guaranteed{" "}
                    </span>
                    <span className="px-3 mid-span">
                      <TaskAltIcon className="me-1 task-icon  " />
                      No booking fees
                    </span>
                    <span className="mt-3">
                      <TaskAltIcon className="me-1 task-icon" />
                      E-ticket/Mobile voucher
                    </span>
                  </div>
                </div>
                {isShowRating && (
                  <div>
                    <div className="star-box d-flex align-items-center">
                      <ReactStar
                        key={rating}
                        {...ratingOptions}
                        onChange={handleRatingChange}
                      />
                      <div className="num-box ms-2">{tour?.overall_rating}</div>
                    </div>
                    <span>Based on {tour?.no_of_reviews} Reviews</span>
                  </div>
                )}
              </div>
            </div>
            <Carousel controls={false}>
              {tour?.galleries?.slice(0, 6).map((image, index) => {
                return (
                  <Carousel.Item key={`image_${index}`}>
                    <div className="everest-img">
                      <img src={image} alt="" className="img-fluid" />
                    </div>
                  </Carousel.Item>
                );
              })}
            </Carousel>

            <div className="activity mt-5">
              <Row>
                <Col md={12}>
                  <table>
                    <tbody>
                      <tr>
                        <td>
                          {" "}
                          <div className="activity-box">
                            <div className="text-center">
                              <h4>DURATION</h4>
                              <CalendarMonthIcon className="activity-icon" />
                              <h6>
                                {" "}
                                {Math.ceil(
                                  (new Date(tour?.departures[0]?.end_date) -
                                    new Date(tour?.departures[0]?.start_date)) /
                                    (1000 * 60 * 60 * 24) +
                                    1
                                )}{" "}
                                Days
                              </h6>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="activity-box">
                            <div className="text-center">
                              <h4>ACTIVITY</h4>
                              <DirectionsBikeIcon className="activity-icon" />
                              <h6>{tour?.activitie?.activity_name}</h6>
                            </div>
                          </div>
                        </td>
                        <td>
                          {" "}
                          <div className="activity-box">
                            <div className="text-center">
                              <h4>MAX ALTITUDE</h4>
                              <HikingIcon className="activity-icon" />
                              <h6>{tour?.max_altitude}</h6>
                            </div>
                          </div>
                        </td>
                        <td>
                          {" "}
                          <div className="activity-box">
                            <div className="text-center">
                              <h4>TRIP GRADE</h4>
                              <StarRateIcon className="activity-icon" />
                              <h6>{tour?.trip_grade}</h6>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="activity-box">
                            <div className="text-center">
                              <h4>GROUP SIZE</h4>
                              <LocalHotelIcon className="activity-icon" />
                              <h6>Min. {tour?.group_size} Pax.</h6>
                            </div>
                          </div>
                        </td>
                        <td>
                          {" "}
                          <div className="activity-box">
                            <div className="text-center">
                              <h4>ACCOMODATE</h4>
                              <EscalatorWarningIcon className="activity-icon" />
                              <h6>{tour?.accommodation}</h6>
                            </div>
                          </div>
                        </td>
                        <td>
                          {" "}
                          <div className="activity-box">
                            <div className="text-center">
                              <h4>TRANSPORT</h4>
                              <AccessTimeIcon className="activity-icon" />
                              <h6>{tour?.transport}</h6>
                            </div>
                          </div>
                        </td>

                        <td>
                          {" "}
                          <div className="activity-box">
                            <div className="text-center">
                              <h4>BEST SEASON</h4>
                              {/* {console.log("tour", tour)} */}
                              <WbSunnyIcon className="activity-icon" />
                              {tour?.best_time ? (
                                <h6>{tour?.best_time}</h6>
                              ) : (
                                <h6>N/A</h6>
                              )}
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </Col>
                <Col md={4} className="text-center"></Col>
              </Row>
            </div>
            {/* ********************************** Tabs needed ************************************ */}
            <div className="trip-review my-5 ">
              <Row className={navfix ? "fixed-top info-nav" : "info-nav"}>
                {tour?.over_view !== null && (
                  <Col onClick={() => handleScroll(0)}>
                    {" "}
                    <Button className="nav-btn">Trip Overview</Button>{" "}
                  </Col>
                )}

                {tour?.itinerary !== null && (
                  <Col onClick={() => handleScroll(1)}>
                    <Button className="nav-btn">Itinerary</Button>{" "}
                  </Col>
                )}
                {Array.isArray(tour?.includes) &&
                  tour?.includes?.length > 0 && (
                    <Col onClick={() => handleScroll(2)}>
                      <Button className="nav-btn">Cost Includes</Button>{" "}
                    </Col>
                  )}

                <Col onClick={() => handleScroll(5)}>
                  <Button className="nav-btn">Cost & Date</Button>{" "}
                </Col>
                {Array.isArray(tour?.galleries) &&
                  tour?.galleries?.length > 0 && (
                    <Col onClick={() => handleScroll(3)}>
                      <Button className="nav-btn">Gallery</Button>{" "}
                    </Col>
                  )}
                {Array.isArray(tour?.faq) && tour?.faq?.length > 0 && (
                  <Col onClick={() => handleScroll(4)}>
                    <Button className="nav-btn">FAQs</Button>{" "}
                  </Col>
                )}

                {tour?.more_information !== null && (
                  <Col onClick={() => handleScroll(6)}>
                    <Button className="nav-btn">More Info</Button>{" "}
                  </Col>
                )}
                {Array.isArray(tour?.reviews) && tour?.reviews?.length > 0 && (
                  <Col onClick={() => handleScroll(7)}>
                    <Button className="nav-btn">Reviews</Button>{" "}
                  </Col>
                )}
              </Row>
              <br />
              <p ref={targetRefs[0]}></p>
              <p></p>
              <p></p>
              {tour?.over_view !== null && (
                <>
                  <h2 className="booking-header mb-2 ">Overview</h2>
                  <div
                    className="about-style sm-only blog-desc"
                    dangerouslySetInnerHTML={{ __html: [tour?.over_view] }}
                  />
                  <br />
                </>
              )}

              {Array.isArray(tour?.itinerary) &&
                tour?.itinerary?.length > 0 && (
                  <div
                    className="container"
                    // style={{ marginLeft: "-10px" }}
                    ref={targetRefs[1]}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <h2 className="booking-header">Itinerary</h2>
                      <div>
                        {/* <button onClick={expandAll} className=" ec-btn me-1 ">
                          Expand All
                        </button>
                        <button onClick={collapseAll} className="ec-btn ">
                          Collapse All
                        </button> */}
                      </div>
                    </div>
                    <div className="sm-only">
                      {itinerary?.map((item, index) => (
                        <div class="faq-drawer" key={item.id}>
                          <input
                            class="faq-drawer__trigger"
                            id={item.id}
                            type="checkbox"
                          />
                          <label class="faq-drawer__title" for={item.id}>
                            <h3>{item?.title}</h3>
                            {/* {item?.title} */}
                          </label>
                          <div class="faq-drawer__content-wrapper">
                            <div class="faq-drawer__content">
                              <p>
                                {item.description.replace(/(<([^>]+)>)/gi, "")}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              <p ref={targetRefs[2]}></p>
              <br />
              {Array.isArray(tour?.includes) &&
                tour?.includes?.length > 0 &&
                Array.isArray(tour?.excludes) &&
                tour?.excludes?.length > 0 && (
                  <div className="cost">
                    <h2 className="booking-header">COST INCLUDES</h2>
                    {Array.isArray(tour?.includes) &&
                      tour?.includes?.length > 0 && (
                        <>
                          <h3 className="mt-4">THIS TRIP INCLUDES</h3>
                          <ul>
                            {tour?.includes.map((include, index) => {
                              return (
                                <li key={`include_${index}`}>
                                  <CheckCircleIcon className="check" />
                                  <span>{include.content}</span>
                                </li>
                              );
                            })}
                          </ul>
                        </>
                      )}

                    {Array.isArray(tour?.excludes) &&
                      tour?.excludes?.length > 0 && (
                        <>
                          <div className="cost mt-4">
                            <h3>THIS TRIP EXCLUDES</h3>
                            <ul>
                              {tour?.excludes.map((exclude, index) => {
                                return (
                                  <li key={`exclude_${index}`}>
                                    <CancelIcon className="cross" />
                                    <span>{exclude.content}</span>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        </>
                      )}
                  </div>
                )}
              <br />
              <div className="join-trip">
                {Array.isArray(tour?.includes) &&
                  tour?.includes?.length > 0 && (
                    <>
                      <h2 className="booking-header" ref={targetRefs[5]}>
                        Cost and Date
                      </h2>
                      <Row className="mt-3">
                        <Col md={9}>
                          <div className="join-content">
                            <p className="overview-desc">
                              Book this trip with us. Here are the upcoming
                              dates. Feel free to share this trip with your
                              friends and family. For custom trips or general
                              inquiries contact us.
                            </p>
                          </div>
                        </Col>
                        <Col md={3} ref={targetRefs[6]}>
                          {/* <DatePickerComponent
                      style="select-date"
                      placeholderText="Select Date"
                      Icon={<CalendarMonthIcon className="month" />}
                    /> */}
                        </Col>
                      </Row>
                      <div className="trip-table mt-5">
                        <Table>
                          <thead className="table-head">
                            <tr className="table-row">
                              {tour?.departures !== null && (
                                <th>DEPARTURE DATE</th>
                              )}
                              {tour?.current_price !== null && <th>PRICE</th>}
                              <th></th>
                              <th style={{ width: "100vw" }}></th>
                            </tr>
                          </thead>
                          <tbody>
                            {tour?.departures?.map((item, index) => {
                              return (
                                <tr key={index}>
                                  <td>
                                    <h6>
                                      {Math.ceil(
                                        (new Date(
                                          tour?.departures[index]?.end_date
                                        ) -
                                          new Date(
                                            tour?.departures[index]?.start_date
                                          )) /
                                          (1000 * 60 * 60 * 24)
                                      ) + 1}{" "}
                                      Days
                                    </h6>
                                    <p>
                                      {tour?.departures[index]?.start_date} -{" "}
                                      {tour?.departures[index]?.end_date}
                                    </p>
                                  </td>
                                  <td>
                                    <span className="cut">
                                      ${tour?.previous_price}
                                    </span>
                                    <div>
                                      <span>${tour?.current_price}</span>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="status"></div>
                                  </td>
                                  <td className="">
                                    <Link href={""}>
                                      <button
                                        className="enquery"
                                        onClick={handleInqueryForm}
                                      >
                                        Enquiry Now
                                      </button>
                                    </Link>
                                    {/* <Link
                                      href={`/trip/${tripId}/booking?departure_id=${tour?.departures[index]?.id}`}
                                      state={{
                                        departureData: tour?.departures[index],
                                      }}
                                    > */}

                                    <Link
                                      href={`/trip/${tripId}/package-booking?departure_id=${tour?.departures[0]?.id}`}
                                    >
                                      <button className="nook-btn">
                                        Book Now
                                      </button>
                                    </Link>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </Table>
                      </div>
                    </>
                  )}
              </div>

              <br></br>
              {Array.isArray(tour?.galleries) &&
                tour?.galleries?.length > 0 && (
                  <div className="" ref={targetRefs[3]}>
                    <h2 className="booking-header mb-2">Gallery</h2>

                    <Row className="gy-2 gx-2">
                      {tour?.galleries?.map((image, index) => {
                        return (
                          <Col md={4} key={`img_${index}`}>
                            <div className="ind-img-box">
                              <img
                                id="img_open"
                                src={image}
                                alt=""
                                className="img-fluid"
                                onClick={() => {
                                  setIsViewerOpen(!isViewerOpen);
                                  setCurrentImage(index);
                                }}
                              />
                            </div>
                          </Col>
                        );
                      })}
                      {isViewerOpen && (
                        <Lightbox
                          mainSrc={tour?.galleries[currentImage]}
                          onCloseRequest={() => setIsViewerOpen(false)}
                        />
                      )}
                    </Row>
                  </div>
                )}

              <br />
              {Array.isArray(tour?.faq) && tour?.faq?.length > 0 && (
                <div
                  className="container"
                  // style={{ marginLeft: "-10px" }}
                  ref={targetRefs[4]}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <h2 className="booking-header mb-2">FAQs</h2>
                    {/* <div className="mob-btn-ec">
                      <button onClick={expandAllFaq} className=" ec-btn ">
                        Expand All
                      </button>
                      <button onClick={collapseAllFaq} className="ec-btn ">
                        Collapse All
                      </button>
                    </div> */}
                  </div>
                  <div className="sm-only">
                    {tour?.faq?.map((item, index) => (
                      <div class="faq-drawer" key={item.id}>
                        <input
                          class="faq-drawer__trigger"
                          id={item.id}
                          type="checkbox"
                        />
                        <label class="faq-drawer__title" for={item.id}>
                          <h3>{item?.question}</h3>
                          {/* {item?.title} */}
                        </label>
                        <div class="faq-drawer__content-wrapper">
                          <div class="faq-drawer__content">
                            <p>{item.answer.replace(/(<([^>]+)>)/gi, "")}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <br />
              {tour?.more_information !== null && (
                <div>
                  {tour?.more_information !== null && (
                    <h2 className="booking-header mb-2">More Info</h2>
                  )}

                  <div
                    className="about-style sm-only blog-desc"
                    dangerouslySetInnerHTML={{
                      __html: [tour?.more_information],
                    }}
                  />
                  <br />
                </div>
              )}

              {Array.isArray(tour?.reviews) && tour?.reviews?.length > 0 && (
                <div className="review">
                  {tour?.review !== null && (
                    <h2 className="booking-header mb-2">Reviews</h2>
                  )}

                  {/* &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& */}
                  {more === ""
                    ? review
                        ?.filter(
                          (item, index) =>
                            tour?.departures[index]?.tour_id === tour?.tour_id
                        )
                        ?.slice(0, 6)
                        ?.map((item, index) => (
                          <div key={index} className="mt-3" ref={targetRefs[7]}>
                            <div className="d-flex">
                              <h6>{review[index]?.name},</h6>
                              <span className="ms-1">
                                {review[index]?.country_name}
                              </span>
                            </div>
                            <ReactStar {...option} />
                            <div className="review-content">
                              <p>{review[index]?.description}</p>
                            </div>
                          </div>
                        ))
                    : more !== ""
                    ? more
                    : ""}
                  <div className="text-end mt-2">
                    <Link href={""}>
                      <button className="enquery" onClick={handleReviewForm}>
                        Write Review
                      </button>
                    </Link>
                    <Link href={""}>
                      <button onClick={handleMore} className="nook-btn">
                        {text}
                      </button>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="everest-left ">
            <div className={fix ? "fix-right" : "left-container"}>
              <div className="left-top">
                <div className="mt-3">
                  <h3>US ${tour?.current_price}</h3>
                </div>
                <div className="grp-btn">Group</div>
              </div>

              {fixMid && (
                <div className="mid-container ">
                  <div className="mid-title d-flex align-items-center justify-content-between">
                    <div>
                      <h5>No. of Persons</h5>
                    </div>
                    <div>
                      <h5>Price Per Person</h5>
                    </div>
                  </div>
                  {tour?.prices.map((item, index) => {
                    return (
                      <div
                        className="price-person d-flex align-items-center justify-content-between mt-2 "
                        key={index}
                      >
                        <p
                          className=""
                          style={{
                            marginTop: "-5px",
                            marginRight: "10px",
                            marginLeft: "-10px",
                          }}
                        >
                          {item?.min} - {item?.max} pax{" "}
                        </p>{" "}
                        <p
                          className="ml-3"
                          style={{ marginTop: "-7px", marginRight: "-5px" }}
                        >
                          {" "}
                          US ${item?.price}{" "}
                        </p>
                      </div>
                    );
                  })}

                  <div className="offer  mt-5">
                    <div className="mt-2">
                      <span>Best Price Guarantee</span>
                    </div>
                    <div className="mt-2">
                      <span>Hassle-Free Booking</span>
                    </div>
                    <div className="mt-2">
                      <span>No Booking or Credit Card Fees</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="bottom-container ">
                <div>
                  {isShowRating && (
                    <div className="excelent d-flex align-items-center  justify-content-center mb-2">
                      <ReactStar
                        key={rating}
                        {...ratingOptions}
                        onChange={handleRatingChange}
                      />{" "}
                      <span>
                        <div className="ex ms-1">
                          <p>{tour?.overall_rating} Excellent</p>
                        </div>
                      </span>
                    </div>
                  )}

                  <div>
                    <Link
                      href={`/trip/${tripId}/package-booking?departure_id=${tour?.departures[0]?.id}`}
                      state={{ departureData: tour?.departures[0] }}
                    >
                      <button className="book-trip">Book your trip</button>
                    </Link>
                  </div>
                  <div>
                    <Link href={""} onClick={handleInqueryForm}>
                      <button className="ask-btn">Ask Inquire</button>
                    </Link>
                  </div>
                  <div>
                    {tour?.pdf && (
                      <div>
                        <a
                          href={
                            "https://destination.missionsummittreks.com/" +
                            tour?.pdf
                          }
                          rel="noreferrer"
                          target="_blank"
                          download="mission.pdf"
                        >
                          <button className="ask-btn">Download PDF</button>
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {fix && (
                <div
                  className="map-box mt-3"
                  onClick={() => {
                    setIsMapOpen(!isMapOpen);
                  }}
                >
                  {/*   const [isMapOpen, setIsMapOpen] = useState(false) */}
                  <img
                    alt=""
                    src={tour?.map}
                    title=" Free Online"
                    className="img-fluid"
                    style={{ height: "100%" }}
                  ></img>
                  {isMapOpen && (
                    <Lightbox
                      mainSrc={tour?.map}
                      onCloseRequest={() => setIsMapOpen(false)}
                    />
                  )}
                  {tour?.map ? (
                    <p
                      style={{
                        fontWeight: "bold",
                        color: "#023047",
                        textAlign: "center",
                      }}
                    >
                      Click The Map
                    </p>
                  ) : null}
                  {/* Other JSX elements */}
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default EverestTrek;
