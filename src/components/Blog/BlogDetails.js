"use client";
import React from "react";
import { Row, Col } from "react-bootstrap";
//import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Container } from "react-bootstrap";
import Link from "next/link";
import { usePathname } from "next/navigation";
//import BreadCrump from "../Components/utilities/BreadCrump";
import {
  FacebookIcon,
  WhatsappIcon,
  LinkedinIcon,
  TwitterIcon,
  PinterestIcon,
  XIcon,
} from "react-share";
import {
  FacebookShareButton,
  LinkedinShareButton,
  PinterestShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import { useRouter } from "next/navigation";
import BreadCrump from "../utilities/BreadCrump";

const BlogDetails = ({ blogDetailList }) => {
  const url = process.env.url;
  const router = useRouter();
  const pathname = usePathname();
  console.log(pathname, "pathname");

  //const shareURL = `${url}${pathname}`;
  const shareURL =
    typeof window !== "undefined" ? `${window.location.href}` : "";
  console.log(shareURL, "url");

  // }
  //const imageURL =
  "https://destination.missionsummittreks.com/" + blogDetailList?.image;
  //console.log(imageURL);
  return (
    <div>
      <div className="banner">
        <div className="blogs-img">
          <img src="https://images.unsplash.com/photo-1583364481915-dacea3e06d18?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"></img>
        </div>
        <div className="blogs-header">
          {/* <h1>BLOG</h1> */}
          <p className="title">BLOG</p>

          <div className="breadcrump">
            <BreadCrump />
          </div>
        </div>
      </div>

      <div className="blogs-container">
        <Row>
          <Col md={8}>
            <div className="blogs-content-container">
              <div className="blogs-img-container">
                <img
                  src={
                    "https://destination.missionsummittreks.com/" +
                    blogDetailList?.image
                  }
                ></img>
              </div>

              <div className="blogs-content-details">
                <h1 className="blogs-title">{blogDetailList?.title}</h1>
                <div className="blogs-info ">
                  <div>
                    <span>Tent Camping</span>

                    <span className="blog-date">24 May 2023</span>
                  </div>

                  <div className="social-media-share ">
                    <div>
                      <FacebookShareButton
                        url={shareURL}
                        // title={blogDetailList?.meta_title}
                        // image={imageURL}
                        // description={blogDetailList?.description}
                      >
                        <FacebookIcon size={32} round />
                      </FacebookShareButton>
                    </div>

                    <div>
                      <WhatsappShareButton
                        url={shareURL}
                        //url={imageURL}
                        // separator=" "
                        // title={blogDetailList?.meta_title}
                        // image={imageURL}
                        // description={blogDetailList?.description}
                      >
                        <WhatsappIcon size={32} round />
                      </WhatsappShareButton>
                    </div>

                    <div>
                      <LinkedinShareButton
                        url={shareURL}
                        //url={imageURL}
                      >
                        <LinkedinIcon size={32} round />
                      </LinkedinShareButton>
                    </div>

                    <div>
                      <TwitterShareButton
                        // url={shareURL}
                        url={shareURL}
                        // title={blogDetailList?.meta_title}
                        // description={blogDetailList?.meta_description}
                      >
                        {/* <TwitterIcon size={32} round /> */}

                        <XIcon size={32} round />
                      </TwitterShareButton>
                    </div>

                    <div>
                      <PinterestShareButton
                        media={`https://destination.missionsummittreks.com/${blogDetailList?.image}`}
                        url={shareURL}
                      >
                        <PinterestIcon size={32} round />
                      </PinterestShareButton>
                    </div>
                  </div>
                </div>

                <div
                  className="blog-desc"
                  dangerouslySetInnerHTML={{
                    __html: blogDetailList?.description,
                  }}
                />
              </div>
              <div className="text-center">
                <Link href={"/blog"}>
                  <button className="vew-more mb-5 text-center ">
                    Back To Blog
                  </button>
                </Link>
              </div>
            </div>
          </Col>
          <Col md={4}>
            <div className="blogs-news">
              <h2 className="news-header">RECENT NEWS</h2>

              <div className="news-content">
                <Row>
                  <Col md={4}>
                    <div className="news-img">
                      <img src="https://images.unsplash.com/photo-1491555103944-7c647fd857e6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"></img>
                    </div>
                  </Col>

                  <Col>
                    <div className="news-title">
                      <h5>
                        50 Resources And Tools To Turbocharge Amazon Product
                        Scraper{" "}
                      </h5>
                    </div>
                  </Col>
                </Row>
              </div>

              <div className="news-content">
                <Row>
                  <Col md={4}>
                    <div className="news-img">
                      <img src="https://images.unsplash.com/photo-1491555103944-7c647fd857e6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"></img>
                    </div>
                  </Col>

                  <Col>
                    <div className="news-title">
                      <h5>
                        50 Resources And Tools To Turbocharge Amazon Product
                        Scraper{" "}
                      </h5>
                    </div>
                  </Col>
                </Row>
              </div>

              <div className="news-content">
                <Row>
                  <Col md={4}>
                    <div className="news-img">
                      <img src="https://images.unsplash.com/photo-1491555103944-7c647fd857e6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"></img>
                    </div>
                  </Col>

                  <Col>
                    <div className="news-title">
                      <h5>
                        50 Resources And Tools To Turbocharge Amazon Product
                        Scraper{" "}
                      </h5>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
        </Row>
      </div>

      {/* <ClintReview clintReview={clientReview} /> */}
    </div>
  );
};

export default BlogDetails;
