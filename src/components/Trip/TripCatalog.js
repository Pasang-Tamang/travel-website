"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Row, Col } from "react-bootstrap";
import DoneIcon from "@mui/icons-material/Done";
import ReactStar from "react-rating-stars-component";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import StarIcon from "@mui/icons-material/Star";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import HikingIcon from "@mui/icons-material/Hiking";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ReactPaginate from "react-paginate";
import { useRouter, useSearchParams } from "next/navigation";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
//import { getToursData } from "@/app/trip/page";
var selectedPage;
const TripCatalog = (props) => {
  const today = new Date().toISOString().split("T")[0];
  const router = useRouter();

  // const handlePageClick = (data) => {
  //   selectedPage = data.selected + 1;
  //   console.log(selectedPage, "sele");
  //   router.push("/trip?page=" + selectedPage);

  //   let params = `page=${selectedPage}`;

  //   //props?.getToursData(params);
  //   ("use server");
  //   props?.getToursData(params);
  //   //console.log(props?.getToursData(params), "final-call");
  // };
  // console.log(props?.page, typeof props?.page, "props");
  const currentPage = parseInt(props?.page);
  const handlePageClick = (e, value) => {
    e.preventDefault();
    console.log(value, typeof value, "value");
    router.push("/trip?page=" + value);

    let params = `page=${value}`;
    console.log(
      typeof params,
      params,
      "params"
    )(
      //props?.getToursData(params);
      "use server"
    );
    props?.getToursData(params);
  };

  // useEffect(() => {
  //   // Update currentPage state if pageNum changes (e.g., when URL changes)
  //   setCurrentPage(pageNum);
  // }, [pageNum]);

  return (
    <>
      <div className="d-flex align-items-center justify-content-between title-trip py-3">
        <h1>{props?.place} Tours and Trips</h1>
      </div>
      <div className="content">
        <p className="para">
          Join us for short treks, easy and extreme treks, off the beaten trek,
          home stay, jungle safari, cultural tour, city tour, Bungee jump,
          Kayaking, peak climbing, rock climbing and many more outdoor
          activities. We encompass the best trekking guide with the best
          services in our trekking package. Here are the best treks in Nepal,
          Bhutan and Tibet.
        </p>
        {/* <h6 className="mt-4">{props?.tours?.data.length} trips in Nepal</h6> */}

        {props?.tours?.data?.length == 0 ? (
          <b>
            Sorry! No trips were found for these search tags <br /> Try Using
            The Filter To Your Left
          </b>
        ) : (
          <p>
            <b style={{ color: "#fb8500" }}>Great!</b> You Found a Trip
          </p>
        )}
      </div>

      {props?.tours?.data?.map((item, index) => {
        const options = {
          edit: false,
          color: "#DEDDDC",
          activeColor: "#fb8500",
          value: item?.overall_rating,
          isHalf: true,
          // size: window.innerWidth < 600 ? 20 : 20,
          count: 5,
        };

        return (
          <div
            className={index === 0 ? "package mt-2" : "package mt-4"}
            key={index}
          >
            <div className="img position-relative">
              <Link href={`/trip/${item?.slug}/`}>
                {item?.image ? (
                  <>
                    <img
                      src={
                        "https://destination.missionsummittreks.com/" +
                        item?.image
                      }
                      alt={item?.image_caption}
                      className="img-fluid img-style"
                    />
                    <button className="feature-btn mt-1">
                      <StarIcon className="me-2" />
                      BEST PRICE
                    </button>
                  </>
                ) : (
                  <>
                    <img
                      src="../../../Logo.png"
                      alt={item?.image_caption}
                      className="trip-logo"
                    />
                    {/* <button className="feature-btn mt-1">
                      <StarIcon className="me-2" />
                      BEST PRICE
                    </button> */}
                  </>
                )}
              </Link>
            </div>
            <div className="view-detail">
              <Row>
                <Col md={8} lg={8}>
                  <div className="img-content">
                    <h5>
                      {item?.title.length > 27
                        ? item.title.slice(0, 26) + "..."
                        : item.title}
                    </h5>
                    {item.no_of_reviews > 0 && (
                      <div className="d-flex align-items-center">
                        <ReactStar {...options} />{" "}
                        <span> of {item.no_of_reviews} reviews</span>
                      </div>
                    )}

                    <Row>
                      <Col xs={6} md={5}>
                        <div className="d-flex align-items-end ">
                          <DoneIcon className="tick mb-1 mr-2" />{" "}
                          <p>Free cancellation </p>
                        </div>
                        <div className="tour-type">
                          <ul>
                            {/*
                             */}
                            <li>Accommodation </li>
                            <li>Transport </li>
                            <li>Max Altitude </li>

                            {item?.departures?.map((departure, index) => {
                              if (departure?.start_date > today) {
                                return (
                                  <div key={index}>
                                    <li>Starts</li>
                                    <li>Ends </li>
                                  </div>
                                );
                              }
                            })}
                          </ul>
                        </div>
                      </Col>
                      <Col xs={6} md={7}>
                        <div className="text-start">
                          <div className="d-flex align-items-end">
                            <DoneIcon className="tick mb-1 mr-2" />
                            <p>Trip customizable</p>
                          </div>
                          <div className="tour-event">
                            <ul>
                              {/* <li>{item?.tour_type}</li>
                            <li>{item?.max_altitude}</li> */}
                              <li>
                                {item.accommodation
                                  ? item?.accommodation
                                  : "N/A"}
                              </li>
                              <li>
                                {item?.transport ? item?.transport : "N/A"}
                              </li>
                              <li>
                                {item?.max_altitude
                                  ? item?.max_altitude
                                  : "N/A"}
                              </li>
                              <ul>
                                {item?.departures?.map((departure, index) => {
                                  if (departure?.start_date > today) {
                                    return (
                                      //<li key={index}>
                                      <div key={index}>
                                        <li>
                                          {departure?.start_date
                                            ? departure?.start_date
                                            : "N/A"}
                                        </li>
                                        <li>
                                          {departure?.end_date
                                            ? departure.end_date
                                            : "N/A"}
                                        </li>
                                      </div>
                                    );
                                  }
                                })}
                              </ul>
                              {/* <li>{item?.departures[0]?.start_date}</li>
                            <li>{item?.departures[0]?.end_date}</li> */}
                            </ul>
                          </div>
                        </div>
                      </Col>
                      <Col></Col>
                    </Row>

                    <div className="trip-details">
                      <div className="trip-info">
                        <span className="trip-icon">
                          {" "}
                          <CalendarMonthIcon
                            className="icon"
                            style={{ fontSize: "40px" }}
                          />
                        </span>

                        <span className="trip-meta-detail">
                          <span className="trip-label">Duration</span>
                          <span className="trip-value">
                            {Math.ceil(
                              (new Date(item?.departures[0]?.end_date) -
                                new Date(item?.departures[0]?.start_date)) /
                                (1000 * 60 * 60 * 24)
                            )}{" "}
                            Days
                          </span>
                        </span>
                      </div>

                      <div className="trip-info">
                        <span className="trip-icon">
                          <HikingIcon
                            className="icon"
                            style={{ fontSize: "40px" }}
                          />
                        </span>
                        <span className="trip-meta-detail">
                          <span className="trip-label">Activity</span>
                          <span className="trip-value">
                            {" "}
                            {item.activity_name}
                          </span>
                        </span>
                      </div>

                      <div className="trip-info">
                        <span className="trip-icon">
                          <StarIcon
                            className="icon"
                            style={{ fontSize: "40px" }}
                          />
                        </span>
                        <span className="trip-meta-detail">
                          <span className="trip-label">Grade</span>
                          <span className="trip-value">
                            {" "}
                            {item?.trip_grade ? item.trip_grade : "N/A"}
                          </span>
                        </span>
                      </div>

                      <div className="trip-info">
                        <span className="trip-icon ">
                          <AttachMoneyIcon
                            className="icon"
                            style={{ fontSize: "40px" }}
                          />
                        </span>
                        <span className="trip-meta-detail">
                          <span className="trip-label">Price</span>
                          <span className="trip-value">
                            {" "}
                            {item.current_price}
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col md={4} lg={4} className="text-end">
                  <div className="expedition-box ">
                    <button className="view-btn">
                      <Link href={`/trip/${item?.slug}/`}>View Details</Link>
                    </button>
                    <div className="mt-2 next-p">
                      <p> Next Departures </p>
                      <div className="mt-2">
                        <span>
                          <AccessTimeIcon className="me-2" />
                          {item?.departures[0]?.start_date}
                        </span>
                        <div className="mt-2">
                          {" "}
                          <span>
                            <AccessTimeIcon className="me-2" />
                            {item?.departures[1]?.start_date}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        );
      })}

      <div className="mt-5 d-flex justify-content-center">
        {/* {console.log(
          props?.pageCount,
          "pagecount",
          props?.page,
          "currentpage",
          props,
          "props"
        )} */}
        {/* <ReactPaginate
          breakLabel="..."
          className="pagination"
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageCount={props.pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          //forcePage={props.page}
          // onPageActive={}
          activeClassName="paginate-active"
        /> */}

        <Pagination
          count={props?.pageCount}
          variant="outlined"
          shape="rounded"
          onChange={handlePageClick}
          page={currentPage}
        />

        {/* <Stack spacing={2}>
          <Pagination
            color="primary"
            count={props.pageCount}
            onChange={handleChange}
            variant="outlined"
            shape="rounded"
            className="pagination"
            page={props?.page ?? page}
          />
        </Stack>
        {console.log(props?.page, "page chec")} */}
      </div>
    </>
  );
};

export default TripCatalog;
