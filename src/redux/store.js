import { configureStore } from "@reduxjs/toolkit";
import { Top } from "./slices/slice";
import { Tourlist } from "./slices/slice";
import { setting } from "./slices/slice";
import { Review } from "./slices/slice";
import { Menu } from "./slices/slice";
import { email } from "./slices/slice";
import { filterTour } from "./slices/slice";

export const store = configureStore({
  reducer: {
    Tours: Top,
    listTour: Tourlist,
    bannerSetting: setting,
    review: Review,
    nav: Menu,
    clientEmail: email,
    filter: filterTour,

    // middleware: (getDefaultMiddleware) =>
    //   getDefaultMiddleware({
    //     serializableCheck: false,
    //   }), //middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  },
});
export default store;
