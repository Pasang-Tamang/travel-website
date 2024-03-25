import React from "react";
import BlogDetails from "@/components/Blog/BlogDetails";
import { fetchPopular } from "../page";
import { fetchBlogs } from "../blog/page";
import AboutDetails from "@/components/About/AboutDetails";
import OurTeam from "@/components/OurTeam/page";
import Terms from "../../components/FooterPages/Terms";
import LegalDocument from "@/components/FooterPages/LegalDocument";

const url = process.env.url;
const fetchBlogDetailList = async (slug) => {
  const res = await fetch(`${url}/api/blog/${slug} `);
  const response = await res.json();

  return response;
};

const fetchAbout = async (slug) => {
  const res = await fetch(`${url}/api/menudetail/${slug}`);
  const response = await res.json();
  console.log("about", response);
  return response;
};

export async function generateMetadata({ params }, parent) {
  const slug = params.slug;
  console.log(slug, "---------------------------");

  if (slug === "about") {
    const aboutMeta = await fetchAbout(slug);
    const desc = aboutMeta?.meta_description?.toString();

    return {
      title: aboutMeta?.meta_title,
      description: aboutMeta?.meta_description.replace(/(<([^>]+)>)/gi, ""),
      // description: (
      //   <div dangerouslySetInnerHTML={{ __html: "<p>hie this is me</p>" }} />
      // ),
      keywords: aboutMeta?.meta_keywords,
    };
  } else if (slug === "our-team") {
    return {
      title: "Our Team",
      description: "Our Team Description",
      keyword: "OUr Team keywords",
      //description: <div dangerouslySetInnerHTML={{ __html: desc }} />,
    };
  } else if (slug === "terms-conditions") {
    return {
      title: "Terms and Conditions",
      description: "Terms and Conditions Description",
      keyword: "Terms and Conditions keywords",
      //description: <div dangerouslySetInnerHTML={{ __html: desc }} />,
    };
  } else if (slug === "legal-document") {
    return {
      title: "Legal Document",
      description: "Legal Document Description",
      keyword: "Legal Documentkeywords",
      //description: <div dangerouslySetInnerHTML={{ __html: desc }} />,
    };
  } else {
    const blogMeta = await fetchBlogDetailList(slug);

    //const previousImages = (await parent.openGraph?.images) || [];
    //const image = Image()
    const title = blogMeta?.meta_title;
    //console.log("----------------------------------------------------", blogMeta);
    //const imageURL = "https://destination.missionsummittreks.com/" + blogMeta
    const imageURL = blogMeta?.image;
    //console.log(image, "iamgeeee");

    return {
      title: blogMeta?.meta_title,
      description: blogMeta?.meta_description,
      keywords: blogMeta?.meta_keyword,

      openGraph: {
        // images: [imageURL, ...previousImages],
        // title: blogMeta?.meta_title,
        // description: blogMeta?.meta_description,
        // keyword: blogMeta?.meta_keyword,
        // url:`https://destination.missionsummittreks.com/${blogMeta?.slug}`,
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
}
export default async function slug({ params, searchParams }) {
  const slug = params.slug;
  console.log(slug);

  //console.log("++++++++++++++", params);
  // if (slug === "about" || slug === "our-team")
  if (slug === "about") {
    const aboutDetails = await fetchAbout(slug);
    const popularTour = await fetchPopular();
    const blog = await fetchBlogs();
    return (
      <AboutDetails
        aboutDetails={aboutDetails}
        popularTour={popularTour}
        blog={blog}
      />
    );
  } else if (slug === "our-team") {
    const aboutDetails = await fetchAbout(slug);
    const popularTour = await fetchPopular();
    const blog = await fetchBlogs();
    return (
      <AboutDetails
        aboutDetails={aboutDetails}
        popularTour={popularTour}
        blog={blog}
      />
    );
  } else if (slug === "terms-conditions") {
    return <Terms />;
  } else if (slug === "legal-document") {
    return <LegalDocument />;
  } else {
    const blogDetailList = await fetchBlogDetailList(slug);

    console.log(slug, "************************************");
    return <BlogDetails blogDetailList={blogDetailList} />;
  }

  // return (
  //   <>

  //   {
  //     if(slug === "about")
  //       return "hi"

  //   }
  //     {/* {slug === "about"
  //       ? // <AboutDetails
  //         //   aboutDetails={aboutDetails}
  //         //   popularTour={popularTour}
  //         //   blog={blog}
  //         // />
  //         "about"
  //       : "hello"} */}

  //     {/* {slug === "about" && "hi"} */}
  //     {/* {slug === "about" ? (
  //       <AboutDetails
  //         aboutDetails={aboutDetails}

  //       />
  //     ) : slug === "our Team" ? (
  //       <OurTeam />
  //     ) : (
  //       <BlogDetails blogDetailList={blogDetailList} />
  //     )} */}
  //     {/* {slug === "about" ? "working" : "not working"} */}
  //     {/* <BlogDetails blogDetailList={blogDetailList} />

  //     {slug} */}
  //   </>
  // );
}
