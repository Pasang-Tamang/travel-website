"use client";
import React, { useState } from "react";
import Link from "next/link";
import { topDist, topPlaceContent } from "@/animation/Animation";
import { motion } from "framer-motion";

const Blog = ({ blog }) => {
  const [sliceTwo, setSliceTwo] = useState(6);
  const loadBlog = () => {
    setSliceTwo(sliceTwo + 6);
  };
  return (
    <>
      <section className="blog">
        <div className="container">
          <h1 className="text-center mt-5">Explore Our Blogs</h1>
          <div className="row gy-4 my-4">
            {blog?.slice(0, sliceTwo).map((item, index) => {
              return (
                <div className="col-md-4" key={index}>
                  <div
                    className="card"
                    style={{ width: "100%", height: "100%" }}
                  >
                    <motion.div
                      className="img-box"
                      variants={topDist}
                      transition={{
                        duration: 0.8,
                      }}
                    >
                      <Link href={`/${item?.slug}`}>
                        {item?.image && (
                          <img
                            className="card-img-top img-fluid"
                            alt={item?.title}
                            type="image/webp"
                            src={
                              "https://destination.missionsummittreks.com/" +
                              item?.image
                            }
                            style={{ height: "250px" }}
                          />
                        )}
                      </Link>
                      <motion.div variants={topPlaceContent}>
                        <div className="card-body">
                          <h5 className="card-title">
                            {item?.title.length > 30
                              ? item.title.slice(0, 29) + "..."
                              : item.title}
                          </h5>
                          <p className="card-text">
                            {item?.description.replace(/(<([^>]+)>)/gi, "")}
                          </p>
                          <button className=" btn-continue">
                            <Link href={`/${item?.slug}`}>
                              Continue Reading...
                            </Link>
                          </button>
                        </div>
                      </motion.div>
                    </motion.div>
                  </div>
                </div>
              );
            })}
            <div className="text-center">
              <button onClick={loadBlog} className="vew-more">
                Load more Blog
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Blog;
