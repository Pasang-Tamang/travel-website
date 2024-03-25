import { fetchClientReview } from "@/app/page";
import EverestTrek from "@/components/EverestTrek/EverestTrek";
import React from "react";
const url = process.env.url;

export async function generateMetadata({ params }, parent) {
  const slug = params.tripId;
  console.log(slug, "---------------------------");

  const tripMeta = await fetchTripList(slug);
  const title = tripMeta?.meta_title ?? "Trips";
  const imageURL = tripMeta?.image;

  return {
    title: title,
    description: tripMeta?.meta_description,
    keywords: tripMeta?.meta_keyword,
    openGraph: {
      images: [
        {
          url: imageURL,
          width: 1200, // Adjust according to your image width
          height: 630,
        },
      ],
    },
  };
}

const fetchTripList = async (slug) => {
  const res = await fetch(`${url}/api/tour/${slug}`);
  const response = await res.json();
  return response;
};

async function page({ params }) {
  const review = await fetchClientReview();

  const tripId = params.tripId;
  // console.log(params, tripId, "********************** id");
  const tour = await fetchTripList(tripId);
  const itinerary = tour?.itinerary;
  console.log(tour, "]]]]]]]]]]]]]]]]]]]]]]]");
  //console.log(tour.id, "000000000000000000000000000000000000");

  return (
    <div>
      {" "}
      <EverestTrek
        review={review}
        tour={tour}
        tripId={tripId}
        tourId={tour.id}
        itinerary={itinerary}
      />
    </div>
  );
}

export default page;
