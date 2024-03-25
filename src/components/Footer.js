/* eslint-disable no-unused-vars */
"use client";
import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import EastOutlinedIcon from "@mui/icons-material/EastOutlined";

import YouTubeIcon from "@mui/icons-material/YouTube";
import TwitterIcon from "@mui/icons-material/Twitter";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";

import Link from "next/link";
import { InView, useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { useScroll } from "./UseScroll";
import { testimonialsAnimations } from "@/animation/Animation";
import { useDispatch, useSelector } from "react-redux";
import { postquery } from "@/redux/slices/slice";

import axios from "axios";
import ScrollToTopButton from "./utilities/ScrollTop";
const Footer = () => {
  const url = process.env.url;
  const dispatch = useDispatch();
  const [down, setDown] = useState(false);
  const [element, controls] = useScroll();
  const [arrow, setArrow] = useState("");
  const { ref, inView } = useInView();

  const [page, setPage] = useState();
  useEffect(() => {
    const response = axios.get(`${url}/api/settings`).then(({ data }) => {
      setPage(data);
    });
  }, []);

  const [partners, setPartners] = useState();

  useEffect(() => {
    async function fetchAffiliatedData() {
      try {
        const response = await axios.get(`${url}/api/affiliated`);
        setPartners(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchAffiliatedData();
  }, []);

  const [enquery, SetEnquery] = useState({
    name: "",
    email: "",
    phone_no: "",
    message: "",
  });

  const handleChange = (e) => {
    const value = e.target.value;
    SetEnquery({ ...enquery, [e.target.name]: value });
  };
  const handleQuery = (e) => {
    e.preventDefault();
    dispatch(postquery(enquery));
  };
  return (
    <>
      <footer className="sm-only">
        <div className="footer sm">
          <Container>
            <Row>
              <Col md={6} lg={4}>
                <h4>Misson Summit Trek</h4>
                <ul className="mt-4">
                  <li>Phone: +977-9808262524 </li>
                  <li>WhatsApp (Nepal) : +977-9808262524 </li>
                  <li>WhatsApp (Australia) : +61-480 170 491 </li>
                  <li>Email: info.missionsummit@gmail.com</li>
                  <li>
                    Address: Bihani Basti Goldhunga-05, Tarakeshwar 44600 ,
                    Nepal, Near Nepal Yoga Home
                  </li>
                </ul>
                <div className="icon-container" ref={element}>
                  <motion.div
                    variants={testimonialsAnimations}
                    animate={controls}
                    transition={{
                      delay: 0.1,
                      type: "tween",
                      duration: 0.8,
                    }}
                    className="social-nedia-icon ms-0"
                  >
                    <a href={page?.whatsaap_link}>
                      <div className="icon-box">
                        <WhatsAppIcon />
                      </div>
                    </a>
                  </motion.div>
                  <motion.div
                    variants={testimonialsAnimations}
                    animate={controls}
                    transition={{
                      delay: 0.03,
                      type: "tween",
                      duration: 0.8,
                    }}
                    className="social-nedia-icon"
                  >
                    <a href={page?.youtube_link}>
                      <div className="icon-box">
                        <YouTubeIcon />
                      </div>
                    </a>
                  </motion.div>
                  <motion.div
                    variants={testimonialsAnimations}
                    animate={controls}
                    transition={{
                      delay: 0.03,
                      type: "tween",
                      duration: 0.8,
                    }}
                    className="social-nedia-icon"
                  >
                    <a href={page?.twitter_link}>
                      <div className="icon-box">
                        <TwitterIcon />
                      </div>
                    </a>
                  </motion.div>
                  <motion.div
                    variants={testimonialsAnimations}
                    animate={controls}
                    transition={{
                      delay: 0.03,
                      type: "tween",
                      duration: 0.8,
                    }}
                    className="social-nedia-icon"
                  >
                    <a href={page?.instagram_link}>
                      <div className="icon-box">
                        <InstagramIcon />
                      </div>
                    </a>
                  </motion.div>

                  <motion.div
                    variants={testimonialsAnimations}
                    animate={controls}
                    transition={{
                      delay: 0.03,
                      type: "tween",
                      duration: 0.8,
                    }}
                    className="social-nedia-icon"
                  >
                    <a href={page?.facebook_link}>
                      <div className="icon-box">
                        <FacebookIcon />
                      </div>
                    </a>
                  </motion.div>
                </div>
              </Col>
              <Col md={6} lg={4}>
                <div className="inquery-form">
                  <h3>Inquiry Form </h3>

                  <form
                    action=""
                    className="mt-4"
                    onSubmit={handleQuery}
                    id="inquery"
                  >
                    <input
                      type="text"
                      placeholder="Your name"
                      className="foot-input"
                      name="fullname"
                      onChange={handleChange}
                      value={enquery.fullname}
                    />
                    <input
                      type="text"
                      placeholder="Phone no."
                      name="number"
                      onChange={handleChange}
                      value={enquery.number}
                      className="foot-input"
                    />
                    <input
                      type="text"
                      placeholder="Email"
                      className="foot-input"
                      name="email"
                      onChange={handleChange}
                      value={enquery.email}
                    />
                    <textarea
                      name="message"
                      id=""
                      cols="10"
                      rows="4"
                      placeholder="Message"
                      className="foot-input"
                      onChange={handleChange}
                      value={enquery.message}
                    ></textarea>
                    <button className="btn-send">
                      Send
                      <EastOutlinedIcon className="ms-2" />
                    </button>
                  </form>
                </div>
              </Col>
              <Col md={6} lg={2} xs={6}>
                <div className="">
                  <h3>Info Page</h3>
                  <ul className="mt-4">
                    <li>
                      <Link href={"/"}> Home</Link>{" "}
                    </li>
                    <li>
                      <Link href={"our-team"}>Our Team </Link>
                    </li>

                    <li>
                      <Link href="terms-conditions">Terms & Conditions </Link>
                    </li>
                    <li>
                      <Link href={"/make-a-payment"}>Make a Payment</Link>{" "}
                    </li>
                    <li>
                      <Link href={"about"}>About Us</Link>{" "}
                    </li>
                    <li>
                      <Link href={"/gallery"}>Gallery</Link>
                    </li>
                  </ul>
                </div>
                {/* <div className="mb-query">
                  <Accordion defaultActiveKey="1">
                    <Accordion.Item eventKey="0">
                      <Accordion.Header
                        onClick={() => {
                          setDown(!down)
                          setArrow('second')
                        }}
                      >
                        Info Page
                        <KeyboardArrowDownIcon
                          className={
                            down === true && arrow === 'second'
                              ? 'rotate down'
                              : 'down'
                          }
                        />
                      </Accordion.Header>
                      <Accordion.Body>
                        <ul className="mt-4">
                          <li>
                            <Link to={'/'}> Home</Link>{' '}
                          </li>

                          <li>
                            <Link to={''}>About Us</Link>{' '}
                          </li>
                          <li>
                            <Link to={''}>Our Team </Link>
                          </li>
                          <li>
                            <Link to={''}>CSR</Link>{' '}
                          </li>
                          <li>
                            <Link to={''}>Terms & Conditions </Link>
                          </li>
                          <li>
                            <Link to={''}>Make a Payment</Link>{' '}
                          </li>
                          <li>
                            <Link to={''}>Why Us?</Link>{' '}
                          </li>
                          <li>
                            <Link to={''}>Gallery</Link>
                          </li>
                        </ul>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </div> */}
              </Col>
              <Col md={6} lg={2} xs={6}>
                <div className="travel-info ">
                  <ul className="mt-5">
                    <li>
                      <Link href={"/travel"}>Travel Info</Link>{" "}
                    </li>
                    <li>
                      <Link href={"blog"}>Blog </Link>
                    </li>
                    <li>
                      <Link href={"/best-deals"}>Best Deals </Link>
                    </li>
                    <li>
                      <Link href={"/contact"}>Contact Us </Link>
                    </li>
                    <li>
                      {" "}
                      <Link href={"/faqs"}>FAQs </Link>
                    </li>
                    <li>
                      <Link href={"legal-document"}>Legal Document</Link>
                    </li>
                  </ul>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        <section className="brand-section">
          <Container>
            <div className="brand">
              <Row>
                <Col xs={6} md={8}>
                  <span className="mb-4">We accept</span>
                  <Row className="gy-3">
                    <Col md={2}>
                      <Link href={""}>
                        <img
                          src="https://www.travel2riga.com/images/uploaded/MasterCard_Logo.png"
                          alt=""
                          className="img-fluid"
                          loading="lazy"
                        />
                      </Link>
                    </Col>
                    <Col md={2}>
                      <Link href={""}>
                        <img
                          src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Visa.svg/1200px-Visa.svg.png"
                          alt=""
                          className="img-fluid"
                          loading="lazy"
                        />
                      </Link>
                    </Col>
                  </Row>
                </Col>
                <Col xs={6} md={4}>
                  <span>Affiliated Partners </span>

                  <div>
                    {partners?.map((item, index) => {
                      return (
                        <img
                          src={item?.image}
                          alt=""
                          className="pe-3"
                          //className="img-fluid"
                          height={35}
                          width={50}
                          loading="lazy"
                        />
                      );
                    })}
                  </div>
                </Col>
              </Row>
            </div>
          </Container>
        </section>
        <section className="bottom">
          <Container>
            <div className="footer-bottom">
              <h3>
                All Contents & Photographs Copyright © by Mission Summit |
                Developed By MegabyteTech
              </h3>
            </div>
          </Container>
        </section>

        <ScrollToTopButton />
      </footer>
    </>
  );
};

export default Footer;
