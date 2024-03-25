"use client";
import React, { useState } from "react";
import { useScroll } from "../UseScroll";
import InputField from "../reusableComponents/InputField";

const Inquiry = () => {
  const [element, controls] = useScroll();
  //   const dispatch = useDispatch();

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
    // dispatch(postquery(enquery));
  };
  return (
    <div className="col-md-6">
      <h5>Any Queries? Let US Know</h5>
      <form action="" onSubmit={handleQuery}>
        <div className="mt-4">
          <label htmlFor="">
            Full Name <span>*</span>
          </label>
          <InputField
            type="text"
            Placeholder="Your name"
            inputCss="contact-input"
            name="fullname"
            onChange={handleChange}
            value={enquery.fullname}
          />
        </div>
        <div className="d-flex justify-content-between">
          <div className="mt-4" style={{ width: "48%" }}>
            <label htmlFor="">
              Email Address <span>*</span>
            </label>
            <InputField
              type="text"
              Placeholder="Email"
              className="foot-input"
              inputCss="contact-input"
              name="email"
              onChange={handleChange}
              value={enquery.email}
            />
          </div>
          <div className="mt-4" style={{ width: "48%" }}>
            <label htmlFor="">
              Contact Number<span>*</span>
            </label>

            <InputField
              type="text"
              Placeholder="Contact Number"
              inputCss="contact-input"
              name="number"
              onChange={handleChange}
              value={enquery.number}
            />
          </div>
        </div>
        <div className="mt-4 ">
          <label htmlFor="">
            Your message<span>*</span>
          </label>
          <div>
            <textarea
              name="message"
              id=""
              cols="10"
              inputCss="contact-input"
              rows="4"
              Placeholder="Message"
              className="contact-input"
              onChange={handleChange}
              value={enquery.message}

              //onChange={handleChange}
            ></textarea>
          </div>
        </div>
        <div className="text-end mt-4">
          <button className="contact-send ">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Inquiry;
