"use server";
import Suscribe from "@/components/Home/Suscribe";
import Filter from "@/components/Trip/Filter";
// import Trip from "@/components/Trip/Trip";
import TripCatalog from "@/components/Trip/TripCatalog";
import BreadCrump from "@/components/utilities/BreadCrump";

import React, { Suspense } from "react";
import { Container } from "react-bootstrap";

//import Loading from "../loading";

const url = process.env.url;

export async function getToursData(params) {
  console.log("main api");
  console.log("main params", params);

  const res = await fetch(`${url}/api/tours/list?${params}`);

  const response = await res.json();
  //console.log(response, "-----------------");
  return response;
}

async function page({ searchParams }, context) {
  const qp = searchParams.page ?? 1;
  console.log(qp, "page from server");
  const activity_id = searchParams.activity_id ?? "";

  const destination_id = searchParams.destination_id ?? "";
  const date_id = searchParams.date_id ?? "";

  console.log("page");
  const tours = await getToursData(
    `page=${qp}&activity_id=${activity_id}&destination_id=${destination_id}&date_id=${date_id}`
  );

  return (
    <div>
      <div className="breadcrump">
        <BreadCrump />
      </div>
      <Container>
        <div className="expedition">
          <div className="filter-box no-tablet">
            <Filter filterActivities={getToursData} />
          </div>
          <div className="triplist">
            <TripCatalog
              getToursData={getToursData}
              tours={tours}
              pageCount={tours?.meta?.last_page}
              page={qp}
            />
          </div>
        </div>
      </Container>
      <Suscribe />
    </div>

    // <>
    //   {tours ? (
    //     <Trip
    //       tours={tours}
    //       qp={qp}
    //       getToursData={getToursData}
    //       pageCount={tours?.meta?.last_page}
    //       page={qp}
    //     />
    //   ) : (
    //     "hello"
    //   )}
    // </>
    // <Suspense fallback={<Loading />}>
    //   <Trip
    //     tours={tours}
    //     qp={qp}
    //     getToursData={getToursData}
    //     pageCount={tours?.meta?.last_page}
    //     page={qp}
    //   />
    // </Suspense>
  );
}

export default page;
