/* eslint-disable array-callback-return */
"use client";
import React, { useState, useEffect } from "react";

// Toastify Check

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { InputLabel } from "@material-ui/core";

// import DatePicker from 'react-datepicker'
import { Container, Row, Col } from "react-bootstrap";
import ReactStar from "react-rating-stars-component";
// import Select from '../reuableComponent/Select'
// import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import InputField from "../reusableComponents/InputField";
// import DatePickerComponent from '../utilities/DatePicker'
// import CalendarMonth from '@mui/icons-material/CalendarMonth'
import TextArea from "../reusableComponents/TextArea";
import Checkbox from "@mui/material/Checkbox";
import { Link } from "next/link";
import Suscribe from "../Home/Suscribe";
import BreadCrump from "../utilities/BreadCrump";
import axios from "axios";
import { useParams, useRouter, useSearchParams } from "next/navigation";

import PopUpModel from "../reusableComponents/PopUpModel";
import EnqueryForm from "./EnqueryForm";

import { useDispatch } from "react-redux";
import { postBooking } from "@/redux/slices/slice";

import { useLocation } from "next/navigation";
import { Select } from "@material-ui/core";
import { MenuItem } from "@mui/material";

const TrekBooking = (departure_id) => {
  const [show, setShow] = useState(false);

  const handleInqueryForm = () => setShow(true);
  // const handleShow = () => setShow(true)
  const handleClose = () => setShow(false);
  const dispatch = useDispatch();
  const params = useParams();
  const searchParams = useSearchParams();
  // const departureId = parseInt(searchParams.get("departure_id"));
  const departureId = parseInt(searchParams.get("departure_id"));
  console.log(typeof departureId, "deptIghdfd");
  const tripId = params.tripId;
  console.log(params, "params");

  console.log(tripId, "tripId");

  // const location = useLocation();
  // const { departureData } = location?.state || {};

  // fetching data from tours
  const [data, setData] = useState();
  const url = process.env.url;
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${url}/api/tour/${tripId}`);
      setData(response?.data);
    };

    fetchData();
  }, [tripId]);

  const departId = data?.departures;
  console.log(departId, "departId");
  // console.log("data", data?.image);

  const [addItems, setAddItems] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${url}/api/addions`);
        return setAddItems(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const [selectedIds, setSelectedIds] = useState([]);
  const [add_ons, setaddOns] = useState([]);

  const handleSelectItem = (itemId, quantity, rate) => {
    // Check if the itemId is not already in the selectedIds array
    if (!selectedIds.includes(itemId)) {
      setSelectedIds((prevIds) => [...prevIds, itemId]);
    }

    // Find the index of the item in addOns array
    const index = selectedIds.findIndex((id) => id === itemId);

    // If the item is not in the addOns array, add it with its quantity
    if (index === -1) {
      setaddOns((prevQuantities) => [
        ...prevQuantities,
        { id: itemId, quantity, rate },
      ]);
    } else {
      // If the item is already in the addOns array, update its quantity and rate
      setaddOns((prevQuantities) => {
        const updatedQuantities = [...prevQuantities];
        updatedQuantities[index] = { id: itemId, quantity, rate };
        return updatedQuantities;
      });
    }
  };

  useEffect(() => {}, [selectedIds, add_ons, addItems]);

  const [bookForm, setBookForm] = useState({
    add_ons: "",
    booking_price: "",
    passport_no: "",
    expiry_date: "",
    no_of_travellers: 1,
    payment_status: "0",
    mode: "1",
    title: "Mr/Ms",
    tour_id: departureId,
    first_name: "",
    last_name: "",
    email: "",
    confirm_email: "",
    date_of_birth: "",
    nationality: "",
    country_code: "",
    mobile_number: "",
    pick_up_details: "",
    departure_id: departureId,
    // departure_id: data?.departure_id ? data?.departure_id : departureData?.id,
  });

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const bookData = (e) => {
    e.preventDefault();

    // Input validation logic
    console.log("asdsfghhjfd", bookForm);
    if (
      bookForm.first_name.trim() === "" ||
      bookForm.last_name.trim() === "" ||
      bookForm.email.trim() === "" ||
      bookForm.confirm_email.trim() === "" ||
      bookForm.date_of_birth.trim() === "" ||
      bookForm.nationality.trim() === "" ||
      bookForm.country_code.trim() === "" ||
      bookForm.mobile_number.trim() === "" ||
      bookForm.pick_up_details.trim() === ""
      // bookForm.departure_id.trim() === '' ||
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (bookForm.email !== bookForm.confirm_email) {
      toast.error("Email addresses do not match.");
      return;
    }
    if (!isChecked) {
      toast.error("Please tick the checkbox before submitting.");
      return;
    }

    bookForm.add_ons = add_ons;

    // let booking = new FormData();

    // booking.append("booking_price", bookForm.booking_price);
    // booking.append("add-ons", JSON.stringify(bookForm.add_ons));
    // booking.append("no_of_travellers", bookForm.no_of_travellers);
    // booking.append("passport_no", bookForm.passport_no);
    // booking.append("expiry-date", bookForm.expiry_date);
    // booking.append("mode", bookForm.mode);
    // booking.append("payment_status", bookForm.payment_status);
    // booking.append("tour_id", bookForm.tour_id);
    // booking.append("first_name", bookForm.first_name);
    // booking.append("last_name", bookForm.last_name);
    // booking.append("email", bookForm.email);
    // booking.append("confirm_email", bookForm.confirm_email);
    // booking.append("date_of_birth", bookForm.date_of_birth);
    // booking.append("nationality", bookForm.nationality);
    // booking.append("country_code", bookForm.country_code);
    // booking.append("mobile_number", bookForm.mobile_number);
    // booking.append("pick_up_details", bookForm.pick_up_details);
    // booking.append("departure_id", "deptId");
    console.log(departId, "de from booking");
    let a = departId;
    // setBookForm({ ...bookForm, departure_id: a });
    // setBookForm((prev) => {
    //   return {
    //     ...prev,
    //     departure_id: a,
    //   };
    // });

    dispatch(postBooking(bookForm));
  };

  const handleInput = (e) => {
    const value = e.target.value;
    setBookForm({ ...bookForm, [e.target.name]: value });
  };

  try {
    console.log(data?.prices, "data inside try");
    for (let i = 0; i < data?.prices?.length; i++) {
      console.log(bookForm?.no_of_travellers, "min");
      if (bookForm.no_of_travellers === data?.prices[i].min) {
        bookForm.booking_price = data?.prices[i]?.price;

        break;
      }
      if (
        bookForm.no_of_travellers >= data?.prices[i].min &&
        bookForm.no_of_travellers <= data?.prices[i]?.max
      ) {
        bookForm.booking_price = data?.prices[i]?.price;

        break;
      }
    }
  } catch (e) {
    console.log(e);
  }

  const option = {
    edit: false,
    color: "#DEDDDC",
    activeColor: "#fb8500",
    value: 4.5,
    isHalf: true,
    // size: window.innerWidth < 600 ? 20 : 25,
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await axios.get(`/api/tour/${id}`)
  //     return setTour(response.data)
  //   }
  //   fetchData()
  // }, []);

  console.log("check", data?.id);
  return (
    <>
      <PopUpModel
        show={show}
        handleclose={handleClose}
        header="Inquire More About This Trip  "
        body={<EnqueryForm bookingId={data?.id} />}
        className="enquery-modal"
      />
      <div className="breadcrump">
        <BreadCrump />
      </div>
      <Container>
        <div className="trek-booking-container">
          <div className="text-center book-trek-title">
            <span>Enquiry About:</span>
            <h1>{data?.title}</h1>
          </div>
          <div className="book-terk">
            <div className="trek-bookk-left">
              {/* %%%%%%%%%%%%  Form  %%%%%%%%%%%%%%%%% */}

              <form onSubmit={bookData}>
                {/* <div className="trek-right-top">
                  <p>
                    Your departure date and seats are secured for the next 10
                    minutes
                  </p>
                </div> */}

                <div className="traveler mt-3">
                  <div className="inner-travel">
                    <div className="d-flex align-items-center ">
                      <div className="circle-box">1</div>{" "}
                      <h6 className="ms-2">Travelers</h6>
                    </div>
                    <div className="no-tarveler mt-3">
                      <Row className="gy-4">
                        <Col xs={6} md={6}>
                          <h2>Number of Travelers </h2>
                        </Col>
                        {/* ******* Small discount information ********** */}
                        <Col xs={6} md={4}>
                          <div className="d-flex price-dis">
                            <div>
                              <h2>
                                US $
                                {bookForm.booking_price ||
                                  data?.prices[0]?.price}
                              </h2>{" "}
                              <span>Initial Price</span>
                            </div>
                            <div className="dis-box ms-2 ml-2">
                              <h2>US ${data?.previous_price}</h2>
                              <bottom className="dis">
                                Group Discount UpTo
                              </bottom>
                            </div>
                          </div>
                        </Col>
                        <Col md={2}>
                          <div className="mb-incre">
                            <div className="incre d-flex">
                              <span
                                className="plus"
                                onClick={() => {
                                  if (bookForm.no_of_travellers > 1) {
                                    setBookForm({
                                      ...bookForm,
                                      no_of_travellers:
                                        bookForm.no_of_travellers - 1,
                                    });
                                  }
                                }}
                              >
                                -
                              </span>
                              <input
                                className="value-input"
                                value={bookForm.no_of_travellers}
                                name="no_of_travellers"
                                inputCss="style-input"
                                onChange={handleInput}
                              />

                              <span
                                className="minus"
                                onClick={() =>
                                  setBookForm({
                                    ...bookForm,
                                    no_of_travellers:
                                      parseInt(bookForm.no_of_travellers) + 1,
                                  })
                                }
                              >
                                +
                              </span>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </div>

                {/* ************Additional Items for the trips************** */}

                <div className="tour-add mt-3">
                  <div className="d-flex align-items-center ">
                    <div className="circle-box" style={{ marginLeft: "-3px" }}>
                      2
                    </div>{" "}
                    <h6 className="ms-2">Tour Add-ons</h6>
                  </div>
                  <p>Add Ons are optional items.</p>

                  <div className="tour-add-box mt-3" style={{ border: "none" }}>
                    {addItems?.map((item, index) => {
                      const itemId = item.id;
                      const itemQuantityObj = add_ons.find(
                        (obj) => obj.id === itemId
                      ) || { quantity: 0, rate: item.price };
                      const { quantity, rate } = itemQuantityObj;
                      return (
                        <div
                          className="tour-add-box mt-0"
                          style={{ background: "transparent" }}
                          key={index}
                        >
                          <div className="tour-add-row d-flex align-items-center justify-content-between">
                            <div className="facilites">
                              <h2>{item?.name}</h2>
                            </div>
                            <div className="price">
                              <h2> US ${item?.price} (per item) </h2>
                            </div>
                            <div className="tour-inc-box">
                              <Col md={12} xs={12}>
                                <div className="mb-incre">
                                  <div className="add-on-btn incre d-flex">
                                    <span
                                      className="minus"
                                      onClick={() =>
                                        handleSelectItem(
                                          itemId,
                                          quantity + 1,
                                          rate
                                        )
                                      }
                                      style={{}}
                                    >
                                      +
                                    </span>

                                    <input
                                      type="text"
                                      value={quantity}
                                      className="value-input"
                                      name="addQuantity"
                                      inputCss="style-input"
                                      onChange={(e) => {
                                        const value =
                                          parseInt(e.target.value, 10) || 0;
                                        handleSelectItem(itemId, value, rate);
                                      }}
                                    />
                                    <span
                                      className="plus"
                                      onClick={() => {
                                        if (quantity > 0) {
                                          handleSelectItem(
                                            itemId,
                                            quantity - 1,
                                            rate
                                          );
                                        }
                                      }}
                                    >
                                      -
                                    </span>
                                  </div>
                                </div>
                              </Col>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* ************************** Main booking Details************************************************************************************ */}

                <div className="person-detail mt-3">
                  <div className="d-flex align-items-center ">
                    <div className="circle-box">3</div>{" "}
                    <h6 className="ms-2">Your Details</h6>
                  </div>

                  <div className="user-info">
                    <h2 className="mb-4">Traveller 1 (Lead Traveller)</h2>
                    <Row className="mt-4 gy-4">
                      <Col md={12}>
                        <InputLabel style={{ paddingBottom: "5px" }}>
                          Select Departure Date
                        </InputLabel>
                        <Select
                          className="departure-select"
                          name="departure_id"
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={bookForm.departure_id}
                          label="Hello"
                          onChange={handleInput}
                        >
                          {data?.departures.map((item, index) => (
                            <MenuItem
                              value={item.id}
                              key={item?.id}
                              className="departure-option"
                            >
                              From {item?.start_date} To {item?.end_date}
                            </MenuItem>
                          ))}
                        </Select>
                      </Col>

                      <Col md={6}>
                        <InputField
                          type={"text"}
                          value={bookForm.first_name}
                          name="first_name"
                          Placeholder="First Name"
                          inputCss="style-input"
                          onChange={handleInput}
                        />
                      </Col>

                      <Col md={6}>
                        <InputField
                          type={"text"}
                          value={bookForm.last_name}
                          name="last_name"
                          Placeholder="Last Name"
                          inputCss="style-input"
                          onChange={handleInput}
                        />
                      </Col>
                    </Row>
                    <Row className="mt-3 gy-4">
                      <Col md={6}>
                        <InputField
                          type={"text"}
                          value={bookForm.email}
                          Placeholder="Email Address"
                          name="email"
                          inputCss="style-input"
                          onChange={handleInput}
                        />
                      </Col>
                      <Col md={6}>
                        <InputField
                          type={"text"}
                          value={bookForm.confirm_email}
                          Placeholder="Confirm Email"
                          inputCss="style-input"
                          name="confirm_email"
                          onChange={handleInput}
                        />
                      </Col>
                    </Row>
                    <Row className="mt-0 gy-4">
                      <Col md={6}>
                        <label></label>
                        <InputField
                          type={"text"}
                          value={bookForm.passport_no}
                          Placeholder="Your Passport Number"
                          name="passport_no"
                          inputCss="style-input"
                          onChange={handleInput}
                        />
                      </Col>
                      <Col md={6}>
                        <label style={{ fontSize: "11px" }}>
                          Passport Expiry Date
                        </label>
                        <InputField
                          Placeholder="Passport's Expiry Date"
                          type={"date"}
                          value={bookForm.expiry_date}
                          inputCss="style-input"
                          name="expiry_date"
                          onChange={handleInput}
                          className="booking-date"
                        />
                      </Col>
                    </Row>
                    <Row className="mt-0 gy-4">
                      <Col md={6}>
                        <label className="" style={{ fontSize: "11px" }}>
                          {" "}
                          Date Of Birth
                        </label>
                        <InputField
                          name="date_of_birth"
                          type={"date"}
                          placeholderText="Date of Birth"
                          // style="select-date"
                          onChange={handleInput}
                          value={bookForm.date_of_birth}
                        />
                      </Col>
                      <Col md={6}>
                        <label></label>
                        <InputField
                          name="nationality"
                          type={"text"}
                          value={bookForm.nationality}
                          Placeholder="Select Nationality (American, French etc.)"
                          inputCss="style-input"
                          selectcss="select-title"
                          onChange={handleInput}
                        />
                      </Col>
                    </Row>
                    <Row className="mt-3 gy-3">
                      <Col md={6}>
                        <InputField
                          type={"number"}
                          value={bookForm.country_code}
                          Placeholder="Country code"
                          inputCss="style-input"
                          name="country_code"
                          onChange={handleInput}
                        />
                      </Col>
                      <Col md={6}>
                        <InputField
                          type={"number"}
                          value={bookForm.mobile_number}
                          Placeholder="Mobile number"
                          inputCss="style-input"
                          name="mobile_number"
                          onChange={handleInput}
                        />
                      </Col>
                      <Col md={12}>
                        <TextArea
                          type={"text"}
                          name="pick_up_details"
                          value={bookForm.pick_up_details}
                          onChange={handleInput}
                          inputCss="style-input"
                        />
                      </Col>
                    </Row>
                  </div>
                </div>
                {/* ************************************************************** */}

                {/* **********Payment and Confirm********** */}
                <div className="payment-box mt-3">
                  <div className="d-flex align-items-center ">
                    <div className="circle-box">3</div>{" "}
                    <h6 className="ms-2">Payment</h6>
                  </div>
                  <p></p>
                  <div className="payment-card">
                    <h3>Online Payment will be available soon</h3>

                    <div className="deposit-amount payment-card-inner ">
                      <h1>
                        You can pay for this trip via cash upon your arrival.!!!
                      </h1>
                      <p></p>
                    </div>
                    <div className="my-4">
                      <div className="check">
                        <div className="d-flex mb-2">
                          <Checkbox
                            checked={isChecked}
                            onChange={handleCheckboxChange}
                          />
                          <p>I Accept The Terms of Use</p>
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={!isChecked}
                        className="disabled confirm-book-btn"
                      >
                        Confirm Booking
                      </button>
                    </div>
                  </div>
                </div>
              </form>
              {/* %%%%%%%%%%%%  Form End  %%%%%%%%%%%%%%%%% */}
            </div>
            <div className="trek-book-right">
              <div className="trek-img">
                <img src={`${data?.image}`} alt="" className="img-fluid" />
              </div>
              <div className="trek-book-right-title">
                <h2>{data?.title}</h2>
                <div className="trek-star d-flex align-items-center mt-1">
                  <ReactStar {...option} />{" "}
                  <div className="review">{data?.no_of_reviews} Reviews</div>
                </div>
                <ul className="mt-4">
                  {data?.departures?.map((item, index) => {
                    if (item?.id === departureId) {
                      return (
                        <React.Fragment key={index}>
                          <li className="d-flex align-items-center justify-content-between">
                            <div className="left-sub">
                              <h3>Starts in</h3>
                            </div>
                            <div className="right-sub">
                              <h3>{item.start_date}</h3>
                            </div>
                          </li>
                          <li className="d-flex align-items-center justify-content-between">
                            <div className="left-sub">
                              <h3>Ends in</h3>
                            </div>
                            <div className="right-sub">
                              <h3>{item.end_date}</h3>
                            </div>
                          </li>
                        </React.Fragment>
                      );
                    }
                  })}

                  <li className="d-flex align-items-center justify-content-between">
                    <div className="left-sub">
                      <h3>Start Time</h3>
                    </div>
                    <div className="right-sub">
                      <h3>{data?.best_time}</h3>
                    </div>
                  </li>
                  <li className="d-flex align-items-center justify-content-between">
                    <div className="left-sub">
                      <h3>Type</h3>
                    </div>
                    <div className="right-sub">
                      <h3>{data?.activitie?.activity_name}</h3>
                    </div>
                  </li>
                  <li className="d-flex align-items-center justify-content-between">
                    <div className="left-sub">
                      <h3>Participants</h3>
                    </div>
                    <div className="right-sub">
                      <h3>{bookForm.no_of_travellers} person</h3>
                    </div>
                  </li>
                  <li className="d-flex align-items-center justify-content-between">
                    <div className="left-sub">
                      <h3>Base Price</h3>
                    </div>
                    <div className="right-sub">
                      <h3>
                        ${bookForm.booking_price || data?.prices[0]?.price}
                      </h3>
                    </div>
                  </li>
                </ul>
                <div className="help-box">
                  {/* <Link href={""}>
                    <button
                      onClick={handleInqueryForm}
                      style={{ background: "#FB8500", color: "white" }}
                    >
                      Have a Questions Regarding This Specific Trip?
                    </button>
                  </Link> */}

                  <button
                    onClick={handleInqueryForm}
                    style={{
                      background: "#FB8500",
                      color: "white",
                      borderRadius: "20px",
                      padding: "10px",
                    }}
                  >
                    Have a Questions Regarding This Specific Trip?
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Suscribe />
      <ToastContainer />
    </>
  );
};

export default TrekBooking;
