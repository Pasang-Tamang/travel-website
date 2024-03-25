import React, { useState } from "react";
import InputField from "../reusableComponents/InputField";
import TextArea from "../reusableComponents/TextArea";
import { ToastContainer, toast } from "react-toastify";
import { postQuery } from "@/redux/slices/slice";
import { useDispatch } from "react-redux";

const EnqueryForm = (props) => {
  //console.log(tour, "tour");
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    full_name: "",
    email: "",
    contact_number: "",
    comments: "",
    tour_id: `${props?.tourId ? props?.tourId : props?.bookingId}`,
  });

  const handleChnge = (e) => {
    const value = e.target.value;
    setUser({ ...user, [e.target.name]: value });
    //console.log(user);
  };

  const queryForm = (e) => {
    e.preventDefault();

    if (
      user.full_name.trim() === "" ||
      user.email.trim() === "" ||
      user.contact_number.trim() === "" ||
      user.comments.trim() === "" ||
      user.country.trim() === ""
    ) {
      return toast.error("Please fill all the required fields");
    }

    // let query = new FormData();
    // query.append("full_name", user.full_name);
    // query.append("email", user.email);
    // query.append("contact_number", user.contact_number);
    // query.append("comments", user.comments);
    // query.append("country", user.country);
    // query.append("tour_id", user.tour_id);

    dispatch(postQuery(user));
  };
  return (
    <div>
      {" "}
      <div className="enquery-form mt-3 ">
        <form action="" onSubmit={queryForm}>
          <div className="mb-3 mt-4">
            <InputField
              type={"hidden"}
              name="tour_id"
              value={props?.tourId}
              onChange={handleChnge}
            />
            <InputField
              type={"text"}
              name="full_name"
              //value={user.full_name}
              value={user.full_name}
              Placeholder="Full Name"
              inputCss="style-input"
              onChange={handleChnge}
            />
          </div>
          <div className="mb-3 mt-4">
            <InputField
              type={"text"}
              name="email"
              // value={user.email}
              value={user.email}
              Placeholder="E-mail"
              inputCss="style-input"
              onChange={handleChnge}
            />
          </div>
          <div className="mb-3 mt-4">
            <InputField
              type={"text"}
              name="contact_number"
              value={user.contact_number}
              // value={user.contact_number}
              Placeholder="Phone Number"
              inputCss="style-input"
              onChange={handleChnge}
            />
          </div>
          <div className="mb-3 mt-4">
            <InputField
              type={"text"}
              name="country"
              value={user.country}
              // value={user.country}
              Placeholder="Country Name"
              inputCss="style-input"
              onChange={handleChnge}
            />
          </div>

          <div className="mb-3 mt-4">
            <TextArea
              placeholder="Write your query here ......  "
              name="comments"
              // value={user.comments}
              onChange={handleChnge}
            />
          </div>

          <button type="submit" className="contact-send">
            Submit
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default EnqueryForm;
