"use client";
import "@/app/globals.css";
import "@/app/styles.css";
import TripCatalog from "@/components/Trip/TripCatalog";
import { Container } from "react-bootstrap";
import Filter from "./Filter";

export default function Trip(props) {
  return (
    <>
      <Container>
        <div className="expedition">
          <div className="filter-box no-tablet">
            {/* <Filter filterActivities={props.getToursData} /> */}
          </div>
          <div className="triplist">
            {/* <TripCatalog
              getToursData={props.getToursData}
              tours={props.tours}
              pageCount={props.pageCount}
            /> */}
          </div>
          {/* <Trip tours={tours} qp={qp} /> */}
          {/* {a && <Trip tours={tours} qp={qp} />} */}
          {/* <div className="triplist">
            <TripCatalog
              getToursData={getToursData}
              tours={tours}
              pageCount={tours?.meta?.last_page}
              page={qp}
            />
          </div> */}
        </div>
      </Container>
    </>
  );
}

//export default Trip;
