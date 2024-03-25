import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import moment from "moment";
import axios, { isAxiosError } from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const url = process.env.url;
const initialState = {
  topDistination: [],
  message: null,
};

export const fetchTopPlace = createAsyncThunk("", async () => {
  const response = axios.get(`${url}/api/topdestinations`);
  return response;
});
export const fetchTourList = createAsyncThunk("tour/fetchtours", async () => {
  try {
    const list = await axios.get(`${url}/api/tours/list`);
    return list;
  } catch (error) {
    throw error;
  }
});
export const fetchBanner = createAsyncThunk("home/setting", async () => {
  try {
    const response = await axios.get(`${url}/api/settings`);
    // Extracting only the data field from the Axios response
    //console.log(response.data, "setting");
    return response.data;
  } catch (error) {
    throw error;
  }
});
export const fetchReview = createAsyncThunk("clint/review", async () => {
  const clint = await axios.get(`${url}/api/clientreviews`);
  return clint;
});

// import for enquiry form
export const postQuery = createAsyncThunk("clint/query", async (query) => {
  const clint = await axios.post(`${url}/api/asks`, {
    full_name: query.full_name,
    email: query.email,
    contact_number: query.contact_number,
    booking_details: query.booking_details,
    comments: query.comments,
    country: query.country,
    tour_id: query.tour_id,
  });
  console.log(clint, "clint");

  if (clint.status === 200) {
    toast.success("Your Query Was Sent Sucessfully");
  }
  <ToastContainer />;
  return console.log(clint.status);
});

export const postEmail = createAsyncThunk("clint/query", async (email) => {
  try {
    const clint = await axios.post(`${url}/api/subscribes`, { email: email });
    console.log("clint subscribe", clint);
    if (clint.status === 200) {
      toast.success(clint.data.message);
    }
  } catch (error) {
    if (isAxiosError(error)) {
      console.log(error.response.data);

      const errorData = error.response.data;
      console.log(errorData);

      if (errorData.message) {
        toast.error(error.message);
      } else if (errorData.errors.email) {
        toast.error(errorData.errors.email[0]);
      } else {
        toast.error("OOps somethng went wrong");
      }
    } else {
      toast.error("OOps somethng went wrong");
    }
  }
});

// For footer and contact page contact
export const postquery = createAsyncThunk("clint/query", async (enquery) => {
  const inquiry = await axios.post(`${url}/api/inquires`, {
    name: enquery.fullname,
    email: enquery.email,
    phone_no: enquery.number,
    message: enquery.message,
  });
  return alert("your data was submitted", inquiry);
});

// For client review
export const postReview = createAsyncThunk(
  "clientReview/psotReview",
  async (review) => {
    const clientReview = await axios.post(`${url}/api/clientreviews`, {
      name: review?.name,
      email: review?.email,
      country_name: review?.country_name,
      description: review?.description,
      tour_id: review?.tour_id,
      star_rating: review?.star_rating,
    });
    if (clientReview.status === 200) {
      toast.success("Thank You For Your Feedback");
    }
    <ToastContainer />;
  }
);

export const postBooking = createAsyncThunk("terk/booking", async (booking) => {
  try {
    console.log(booking, "booking.departure_id");
    console.log(typeof booking.departure_id, "id from c");

    const bookingDetails = await axios.post(`${url}/api/booking`, {
      booking_price: booking.booking_price,
      no_of_travellers: booking.no_of_travellers,
      add_ons: booking.add_ons,
      passport_no: booking.passport_no,
      expiry_date: booking.expiry_date,
      payment_status: booking.payment_status,
      mode: booking.mode,
      title: booking.title,
      tour_id: booking.tour_id,
      first_name: booking.first_name,
      last_name: booking.last_name,
      email: booking.email,
      confirm_email: booking.confirm_email,
      date_of_birth: booking.date_of_birth,
      nationality: booking.nationality,
      country_code: booking.country_code,
      mobile_number: booking.mobile_number,
      pick_up_details: booking.pick_up_details,
      departure_id: booking.departure_id,
    });
    console.log(bookingDetails, "bookingDetails");
    if (bookingDetails.status === 200) {
      toast.success("Your Form Has Been Submitted Sucessfully ");
    } else {
      toast.error("Opps! Something went wrong.");
    }
    <ToastContainer />;
    return;
  } catch (error) {
    throw error;
  }
});

// export const tourSearch = createAsyncThunk(
//   "tour/search",
//   async ({ selectPlace, activity, date }) => {
//     try {
//       const getTourList = await axios.get(
//         "https://destination.missionsummittreks.com/api/toursearches",

//         {
//           destination_id: selectPlace.toString(),
//           activity_id: activity.toString(),

//           // start_date: moment(date).format("YYYY-MM-D"),
//         }
//       );

//       console.log(getTourList, "getTOurlist");
//       return getTourList.data;
//     } catch (error) {
//       throw error;
//     }
//   }
// );

export const tourSearch = createAsyncThunk("tour/search", async (params) => {
  try {
    console.log(params, "search params");
    const getTourList = await axios.get(`${url}/api/toursearches?${params}`);

    console.log(getTourList, "getTOurlist");
    return getTourList.data;
  } catch (error) {
    throw error;
  }
});
export const fetchMenu = createAsyncThunk("fetch/menu/fulfilled", async () => {
  try {
    const menu = await axios.get(`${url}/api/menus`, {});
    // Extracting only the data field from the Axios response
    return menu.data;
  } catch (error) {
    throw error;
  }
});

const TopDistination = createSlice({
  name: "top place",
  initialState,
  // extraReducers: {
  //   [fetchTopPlace.pending]: (state, action) => {},
  //   [fetchTopPlace.fulfilled]: (state, action) => {
  //     state.topDistination = action.payload;
  //     state.message = "sucess";
  //   },
  //   [fetchTopPlace.rejected]: (state, action) => {
  //     state.message = action.error.message;
  //   },
  // },

  extraReducers: (builder) => {
    builder.addCase(fetchTopPlace.pending, (state, action) => {}),
      builder.addCase(fetchTopPlace.fulfilled, (state, action) => {
        state.topDistination = action.payload;
        state.message = "success";
      }),
      builder.addCase(fetchTopPlace.rejected, (state, action) => {
        state.message = action.error.message;
      });
  },
});
const bannerSetting = createSlice({
  name: "setting",
  initialState: {
    setting: [],
    message: null,
  },

  extraReducers: (builder) => {
    builder.addCase(fetchBanner.pending, (state, action) => {}),
      builder.addCase(fetchBanner.fulfilled, (state, action) => {
        state.setting = action.payload;
      }),
      builder.addCase(fetchBanner.rejected, (state, action) => {
        state.message = action.error.message;
      });
  },
});
const tourList = createSlice({
  name: "tour list",
  initialState: {
    Tourlist: [],
  },
  // extraReducers: {
  //   [fetchTourList.pending]: (state, action) => {},
  //   [fetchTourList.fulfilled]: (state, action) => {
  //     state.Tourlist = action.payload;
  //     state.message = "sucess";
  //   },
  //   [fetchTourList.rejected]: (state, action) => {
  //     state.message = action.error.message;
  //   },
  // },
  extraReducers: (builder) => {
    builder.addCase(fetchTourList.pending, (state, action) => {}),
      builder.addCase(fetchTourList.fulfilled, (state, action) => {
        state.Tourlist = action.payload;
        state.message = "sucess";
      }),
      builder.addCase(fetchTourList.rejected, (state, action) => {
        state.message = action.error.message;
      });
  },
});
const clintReview = createSlice({
  name: "clint review",
  initialState: {
    review: [],
  },
  // extraReducers: {
  //   [fetchReview.pending]: (state, action) => {},
  //   [fetchReview.fulfilled]: (state, action) => {
  //     state.review = action.payload;
  //     state.message = "sucess";
  //   },
  //   [fetchReview.rejected]: (state, action) => {
  //     state.message = action.error.message;
  //   },
  // },

  extraReducers: (builder) => {
    builder.addCase(fetchReview.pending, (state, action) => {}),
      builder.addCase(fetchReview.fulfilled, (state, action) => {
        state.review = action.payload;
        state.message = "sucess";
      }),
      builder.addCase(fetchReview.rejected, (state, action) => {
        state.message = action.error.message;
      });
  },
});
const suscribEmail = createSlice({
  name: "suscribemail",
  initialState: {
    message: "",
  },
  // extraReducers: {
  //   [postEmail.pending]: (state, action) => {},
  //   [postEmail.fulfilled]: (state, action) => {
  //     console.log(action);
  //     state.message = action.payload;
  //   },
  //   [postEmail.rejected]: (state, action) => {
  //     state.message = action.error.message;
  //   },
  // },

  extraReducers: (builder) => {
    builder.addCase(postEmail.pending, (state, action) => {}),
      builder.addCase(postEmail.fulfilled, (state, action) => {
        state.message = action.payload;
      }),
      builder.addCase(postEmail.rejected, (state, action) => {
        state.message = action.error.message;
      });
  },
});
const menu = createSlice({
  name: "menu",
  initialState: {
    menu: [],
  },

  extraReducers: (builder) => {
    builder.addCase(fetchMenu.pending, (state, action) => {}),
      builder.addCase(fetchMenu.fulfilled, (state, action) => {
        state.menu = action.payload;
        state.message = "sucess";
      }),
      builder.addCase(fetchMenu.rejected, (state, action) => {
        state.message = action.error.message;
      });
  },
});

// extraReducers: {
//   [tourSearch.pending]: (state, action) => {},
//   [tourSearch.fulfilled]: (state, action) => {
//     state.searchTour = action.payload;
//   },
//   [tourSearch.rejected]: (state, action) => {
//     state.message = action.error.message;
//   },
// },
const searchTour = createSlice({
  name: "searchtour",
  initialState: {
    searchTour: [],
  },

  extraReducers: (builder) => {
    builder.addCase(tourSearch.pending, (state, action) => {}),
      builder.addCase(tourSearch.fulfilled, (state, action) => {
        state.searchTour = action.payload;
        console.log(state, "state", state.searchTour, "searchTour");
      }),
      builder.addCase(tourSearch.rejected, (state, action) => {
        state.message = action.error.message;
      });
  },
});
const clientQuery = createSlice({
  name: "clint",
  initialState: {
    isLoading: false,
    error: null,

    user: [],
    isSuccess: null,
  },
  reducers: {},
  // extraReducers: {
  //   [postQuery.pending]: (state) => {
  //     state.isLoading = true;
  //     state.error = null;
  //   },

  //   [postQuery.fulfilled]: (state, action) => {
  //     state.isLoading = false;
  //     state.user = [];
  //     state.isSuccess = action.payload;
  //   },

  //   [postQuery.rejected]: (state, action) => {
  //     state.isLoading = false;
  //     state.user = [];
  //     state.error = action.error.message;
  //   },
  // },

  extraReducers: (builder) => {
    builder.addCase(postQuery.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    }),
      builder.addCase(postQuery.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = [];
        state.isSuccess = action.payload;
      }),
      builder.addCase(postQuery.rejected, (state, action) => {
        state.isLoading = false;
        state.user = [];
        state.error = action.error.message;
      });
  },
});
const clientBook = createSlice({
  name: "bookingDetails",
  initialState: {
    isLoading: false,
    error: null,
    user: [],
    isSuccess: null,
  },
  reducers: {},
  // extraReducers: {
  //   [postBooking.pending]: (state) => {
  //     state.isLoading = true;
  //     state.error = null;
  //   },

  //   [postBooking.fulfilled]: (state, action) => {
  //     state.isLoading = false;
  //     state.user = [];
  //     state.isSuccess = action.payload;
  //   },

  //   [postBooking.rejected]: (state, action) => {
  //     state.isLoading = false;
  //     state.user = [];
  //     state.error = action.error.message;
  //   },
  // },

  extraReducers: (builder) => {
    builder.addCase(postBooking.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    }),
      builder.addCase(postBooking.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = [];
        state.isSuccess = action.payload;
      }),
      builder.addCase(postBooking.rejected, (state, action) => {
        state.isLoading = false;
        state.user = [];
        state.error = action.error.message;
      });
  },
});

const inquireQuery = createSlice({
  name: "clint",
  initialState: {
    isLoading: false,
    error: null,

    user: [],
    isSuccess: null,
  },
  reducers: {},
  // extraReducers: {
  //   [postquery.pending]: (state) => {
  //     state.isLoading = true;
  //     state.error = null;
  //   },

  //   [postquery.fulfilled]: (state, action) => {
  //     state.isLoading = false;
  //     state.user = [];
  //     state.isSuccess = action.payload;
  //   },

  //   [postquery.rejected]: (state, action) => {
  //     state.isLoading = false;
  //     state.user = [];
  //     state.error = action.error.message;
  //   },
  // },
  extraReducers: (builder) => {
    builder.addCase(postquery.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    }),
      builder.addCase(postquery.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = [];
        state.isSuccess = action.payload;
      }),
      builder.addCase(postquery.rejected, (state, action) => {
        state.isLoading = false;
        state.user = [];
        state.error = action.error.message;
      });
  },
});

const postClientReview = createSlice({
  name: "Post Review",
  initialState: {
    isLoading: false,
    error: null,

    user: [],
    isSuccess: null,
  },
  reducers: {},
  // extraReducers: {
  //   [postquery.pending]: (state) => {
  //     state.isLoading = true;
  //     state.error = null;
  //   },

  //   [postquery.fulfilled]: (state, action) => {
  //     state.isLoading = false;
  //     state.user = [];
  //     state.isSuccess = action.payload;
  //   },

  //   [postquery.rejected]: (state, action) => {
  //     state.isLoading = false;
  //     state.user = [];
  //     state.error = action.error.message;
  //   },
  // },

  extraReducers: (builder) => {
    builder.addCase(postquery.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    }),
      builder.addCase(postquery.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = [];
        state.isSuccess = action.payload;
      }),
      builder.addCase(postquery.rejected, (state, action) => {
        state.isLoading = false;
        state.user = [];
        state.error = action.error.message;
      });
  },
});

export const ClientReview = postClientReview.reducer;
export const inquiries = inquireQuery.reducer;
export const BookPackage = clientBook.reducer;
export const askQuery = clientQuery.reducer;
export const Top = TopDistination.reducer;
export const Tourlist = tourList.reducer;
export const setting = bannerSetting.reducer;
export const Review = clintReview.reducer;
export const email = suscribEmail.reducer;
export const filterTour = searchTour.reducer;
export const Menu = menu.reducer;
