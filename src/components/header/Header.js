"use client";
import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

import { Container, Col, Row } from "react-bootstrap";
import Link from "next/link";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import MenuItem from "./MenuItem";
import { useSelector, useDispatch } from "react-redux";

import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import ChatIcon from "@mui/icons-material/Chat";
import { fetchBanner, fetchMenu } from "@/redux/slices/slice";

const Header = () => {
  const dispatch = useDispatch();
  const data = useSelector((item) => item.bannerSetting.setting);
  const menuTitle = useSelector((item) => item.nav.menu);

  const depthLevel = 0;
  const [fix, setFix] = useState(false);

  const [sideMenu, setSideMenu] = useState(false);
  const setFixed = () => {
    if (typeof window !== "undefined") {
      if (window.scrollY >= 150) {
        setFix(true);
      } else {
        setFix(false);
      }
    }
  };
  useEffect(() => {
    dispatch(fetchBanner());
    dispatch(fetchMenu());
  }, [dispatch]);
  if (typeof window !== "undefined") {
    window.addEventListener("scroll", setFixed);
  }
  const togggleMenu = () => {
    setSideMenu(!sideMenu);
  };

  const openGmail = () => {
    const email = "info@missionsummittreks.com"; // Replace with your Gmail email address
    const subject = "[Your Query Subject Here]"; // Subject line for the email
    const body =
      "Dear Mission Summit, I was wondering if I could get more information regarding [Best time of arrival/ Next departures of a trip/ Customizing a certain Travel Package]...."; // Body text for the email

    const url = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    // Open Gmail compose in a new window or tab
    if (typeof window !== "undefined") {
      window.open(url, "_blank");
    }
  };

  const makeWARedirect = (phone) => {
    return phone?.replace(/\D/g, "");
  };

  return (
    <>
      <header>
        <div className="innr-top">
          <Container>
            <div className="header-top">
              <h2>
                Nepal Trek Booking Open For 2024 <span></span> 2025
              </h2>
            </div>
          </Container>
        </div>
        <Container>
          <div className="mid-header">
            <Row>
              <Col md={6}>
                <div className="logo ">
                  <Link href="/">
                    <img src="../../Logo.png" alt="" className="img-fluid" />
                  </Link>
                </div>
              </Col>
              <Col md={3}>
                <div className="email">
                  <div className="iocon">
                    <EmailOutlinedIcon className="icon" />
                  </div>
                  <div className="contENT ms-1">
                    <span>Quick Questions? Click Here </span>
                    <Link href="" onClick={openGmail}>
                      <h5>(info@missionsummittreks.com)</h5>
                    </Link>
                  </div>
                </div>
              </Col>
              <Col md={3}>
                <div className="email">
                  <div className="iocon">
                    <WhatsAppIcon className="icon" />
                  </div>
                  <div className="contENT ms-1">
                    <span>Direct Talk to an Expert</span>
                    <h5>
                      <a
                        target="_blank"
                        style={{ color: "#707070" }}
                        title="redirect to whatsapp"
                        href={`https://wa.me/${makeWARedirect(data?.contact)}`}
                      >
                        ({data?.contact})
                      </a>
                    </h5>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
        <div className={fix ? "fix-menu" : "menu"}>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
              <div
                className="mb-logo"
                style={{ backgroundColor: "white", borderRadius: "5px" }}
              >
                <img src="../../Logo.png" alt="" className="img-fluid" />
              </div>

              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
                onClick={togggleMenu}
              >
                {sideMenu ? (
                  <CloseIcon className=" MenuIcon" />
                ) : (
                  <MenuIcon className=" MenuIcon" />
                )}
              </button>
              <div
                className="collapse navbar-collapse  "
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav mb-2 mb-lg-0 ms-auto ">
                  <li className=" nav-item ">
                    <Link
                      href="/"
                      className=" nav-link active d-flex align-items-center mb-menu"
                    >
                      Home
                    </Link>
                  </li>
                  {menuTitle?.map((menu, index) => {
                    return (
                      <MenuItem
                        menu={menu}
                        key={index}
                        depthLevel={depthLevel}
                      />
                    );
                  })}

                  {/* <li className=" nav-item ">
                    <Link
                      href="/about"
                      className=" nav-link active d-flex align-items-center mb-menu"
                    >
                      About
                    </Link>
                  </li> */}

                  <li className=" nav-item ">
                    <Link
                      href="/blog"
                      className=" nav-link active d-flex align-items-center mb-menu"
                    >
                      Blog
                    </Link>
                  </li>

                  <li className=" nav-item nav-drop">
                    <Link
                      href="/"
                      className=" nav-link active d-flex align-items-center mb-menu"
                    >
                      Destination
                    </Link>

                    <div className="dropdown-content">
                      <Link href="/">Nepal</Link>
                      <Link href="/">Bhutan</Link>
                      <Link href="/">Tibet</Link>
                    </div>
                  </li>

                  <li className=" nav-item nav-drop">
                    <Link
                      href={"/"}
                      className=" nav-link active d-flex align-items-center mb-menu"
                    >
                      Activity
                    </Link>

                    <div className="dropdown-content">
                      <Link href="/">Trekking</Link>
                      <Link href="/">Expedition</Link>
                      <Link href="/">Tour and Sight Seeing</Link>
                      <Link href="/">White Water Seeing</Link>
                      <Link href="/">Jungle Safari</Link>
                      <Link href="/">Bunjee Jumping</Link>
                    </div>
                  </li>

                  <li className=" nav-item ">
                    <Link
                      href={"/contact"}
                      className=" nav-link active d-flex align-items-center mb-menu"
                    >
                      Contact
                    </Link>
                  </li>
                  <li className=" nav-item ">
                    <Link
                      href={"/trip"}
                      className=" nav-link active d-flex align-items-center mb-menu"
                    >
                      All Trips
                    </Link>
                  </li>

                  <div className=" nav-search mt-2">
                    <input
                      type="text"
                      id="search-bar"
                      placeholder="Search..."
                    ></input>
                    <span className="search-icon">
                      <SearchIcon />
                    </span>
                  </div>
                </ul>
              </div>
            </div>
          </nav>
        </div>

        <div className="inquiry">
          <a href="/contact" title="Go To Inquiry Form" target="_blank">
            <ChatIcon fontSize="24px" />
          </a>

          <a href="https://wa.link/lap2ej" title="WhatsApp" target="_blank">
            <WhatsAppIcon fontSize="24px" />
          </a>
        </div>
      </header>
    </>
  );
};

export default Header;
