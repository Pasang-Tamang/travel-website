import Inquiry from "@/components/Contact/Inquiry";
import React from "react";

const page = () => {
  return (
    <>
      <section className="conatct">
        <div className="container">
          <div className="contact-1">
            <div className="contact-1-inner mt-2">
              <div className="breadcrump m-auto" style={{ width: "11%" }}>
                {/* <BreadCrump /> */}
              </div>
              <h1 className="text-center mt-4" id="contact">
                Contact us
              </h1>
              <div className="row">
                <div className="col-md-6">
                  {/************************************** Info Section********************************* */}
                  <h5>Mission Summit</h5>

                  {/* <p>Mailing Address: Post Box:21576, Kaldhara Marg, Thamel</p> */}
                  <ul>
                    <li>
                      <span>Whatsapp:</span>+977-9808262524
                    </li>
                    <li>
                      <span> E-Mail:</span> info.missionsummit@gmail.com
                    </li>

                    <li>
                      <span> Location:</span>Bihani Basti Goldhunga-05,
                      Tarakeshwar 44600 , Nepal, Near Nepal Yoga Home [Opening
                      hours – 8 Am to 7 Pm]
                    </li>
                  </ul>
                </div>
                <Inquiry />
              </div>
            </div>
          </div>

          <div className="map-container mt-5 mb-5">
            <div className="mapouter">
              <div className="gmap_canvas">
                <iframe
                  width="100%"
                  title="location"
                  height="500"
                  id="gmap_canvas"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3530.878471885815!2d85.28365137551108!3d27.751894176157098!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb1f0b5b1cbba3%3A0xa699ccd1b23175a3!2sMission%20Summit%20Treks%20%26%20Expedition!5e0!3m2!1sen!2snp!4v1695814642355!5m2!1sen!2snp"
                  frameborder="0"
                  scrolling="no"
                  marginheight="0"
                  marginwidth="0"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default page;
