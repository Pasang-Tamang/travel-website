import Link from "next/link";
import React, { lazy } from "react";

import Feature from "@/components/Home/Feature";
import Banner from "@/components/Home/Banner";
import Service from "@/components/Home/Service";
import SliderComponent from "@/components/Home/Popular";
import Booking from "@/components/Home/Booking";
import Company from "@/components/Home/Company";
//import ClintReview from "@/components/Home/ClintReview";
import Suscribe from "@/components/Home/Suscribe";
// import ScrollToTopButton from "@/components/utilities/ScrollTop";
import Top from "@/components/Home/Top";
import ClintReview from "@/components/Home/ClintReview";

const url = process.env.url;

const meta = await fetchMeta();
export const metadata = {
  title: meta?.meta_title,
  description: meta?.meta_description,
  keywords: meta?.meta_keyword,
};
async function fetchSearch() {
  const res = await fetch(`${url}/api/searches`);
  const response = res.json();
  return response;
}

async function fetchBanner() {
  const res = await fetch(`${url}/api/sliders`);

  const response = res.json();
  return response;
}
async function fetchFeature() {
  const res = await fetch(`${url}/api/tours/featuredHolidays`, "utf-8");
  const response = await res.json();
  return response.data;
}

export async function fetchPopular() {
  const res = await fetch(`${url}/api/tours/popular`);

  const response = await res.json();

  return response.data;
}
export async function fetchClientReview() {
  const res = await fetch(`${url}/api/clientreviews`);
  const response = await res.json();

  return response;
}

async function fetchMeta() {
  const res = await fetch(`${url}/api/settings`);
  const response = await res.json();
  return response;
}

async function fetchTops() {
  const res = await fetch(`${url}/api/topdestinations`);

  const response = await res.json();
  console.log(response, "++++++++++++++++");
  return response;
}

async function featureHome() {
  const res = await fetch(`${url}/api/tours/featuredHome`);
  const response = await res.json();
  return response;
}
// const meta = await fetchMeta();
// // console.log(meta?.meta_keyword, "????????????????????");
// export const metadata = {
//   title: meta?.meta_title,
//   description: meta?.meta_description,
//   keywords: meta?.meta_keyword,
// };
export default async function Home() {
  const search = await fetchSearch();
  const banner = await fetchBanner();
  const featureTour = await fetchFeature();
  const popularTour = await fetchPopular();
  const clientReview = await fetchClientReview();

  // console.log(meta, "metaaa");
  const destination = await fetchTops();
  const featuredHome = await featureHome();

  //console.log("banner", banner, "search", search);
  //console.log("pops", popularTour);

  return (
    <main className="main-page">
      {/* <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="this is the home page" />
        <title>{meta?.meta_title}</title>
        <meta name="title" content={meta?.meta_title} />
        <meta name="keywords" content={meta?.meta_keyword} />
      </head> */}
      <Banner banner={banner} search={search} />
      <Service />
      <SliderComponent popularTour={popularTour} />
      <Feature featureTour={featureTour} />
      <Booking featuredHome={featuredHome} />
      <Company />
      <Top destination={destination} />
      <ClintReview clintReview={clientReview} />
      <Suscribe />
    </main>
  );
}
