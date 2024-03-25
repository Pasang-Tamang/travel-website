import React from "react";
import { Container } from "react-bootstrap";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import Link from "next/link";

const Company = () => {
  return (
    <>
      <div className="company-detail">
        <Container>
          <h1 className='className="text-center mb-4 fw-light"'>
            <span className="">Mission Summit Treks And Expedition</span> - Best
            Travel
            <br /> and Trekking Agency in Nepal
          </h1>
          <p>
            Mission Summit treks and Expedition is one of the best trekking
            company in Nepal. It is a fast growing up local trekking agency
            providing its services since 2019AD. We are renowned for our best
            services and trip management. Our company is established for
            organizing trekking and expedition in Nepal, Tibet and Bhutan. We
            are legally authorized travel company of Nepal working as per
            company act of Government of Nepal and holding the authorship via
            Tourism department under the Ministry of Culture, Tourism and Civil
            Aviation of Nepal.
          </p>
          <p>
            The company is operating trekking, hiking, climbing, mountaineering,
            cultural tours, charity treks, white-water rafting, Jungle safari
            etc since beginning. All the trekking and tour includes guidance of
            licensed local expert with eco-friendly travel. We provide group
            discount, secure and easy booking, trip customization, best
            hospitality, safe and happy travel. We guaranteed your security,
            best service and certified your trekking with us.
          </p>

          <div className="com-btn text-center mt-5">
            <Link href={"/about"}>
              <button className="vew-more">
                Read More
                <ArrowRightAltIcon className="ar-icon right-arr" />
              </button>
            </Link>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Company;
