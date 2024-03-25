import React from "react";
import { Container } from "react-bootstrap";
import SliderComponent from "../Home/Popular";
import Blog from "../Blog/Blog";

const AboutDetails = ({ aboutDetails, popularTour, blog }) => {
  return (
    <div>
      <div className="blog">
        <Container className="blog">
          <div>
            <h1 className="fw-bold mt-3 text-center  ">{aboutDetails?.name}</h1>
            <div
              className="about-style"
              dangerouslySetInnerHTML={{ __html: [aboutDetails?.content] }}
            />
          </div>

          <SliderComponent popularTour={popularTour} />
          <Blog blog={blog} />

          {/* <div>
            <h1 className="fw-bold mt-3 text-center">
              {aboutDetails?.subtitle[0]?.name}
            </h1>
            <div
              className="about-style"
              dangerouslySetInnerHTML={{
                __html: [aboutDetails?.subtitle[0]?.content],
              }}
            />
          </div> */}
        </Container>
      </div>
    </div>
  );
};

export default AboutDetails;
