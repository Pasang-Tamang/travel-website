import { Inter } from "next/font/google";

import "./globals.css";
import "./styles.css";

// import "@/styles/globals.css";
// import "../styles/styles.scss";
import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.min.js";
import Providers from "@/redux/Provider";

import "react-image-lightbox/style.css";
import Footer from "@/components/Footer";
import Header from "@/components/header/Header";
// import Head from "next/head";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Mission Summit Trek",
  description: "",
  image: "favIcon.png",
  // image: "/mission summit LOGO BLACK.png",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* <meta charset="utf-8" /> */}
        <link rel="icon" href="/Logo.png" />
        {/* <link rel="manifest" href="%PUBLIC_URL%/manifest.json" /> */}
        {/* <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script> */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
          integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        <link rel="canonical" href="https://www.missionsummittreks.com/" />
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=UA-139720900-1"
        ></script>
        <script
          async
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
          crossOrigin="anonymous"
        ></script>
        {/* <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"></script> */}
        {/* <script
          src="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js"
          integrity="sha512-QAc08ipPd7ElgrEsKMj9mFi1LOYhEBBeusKfVSXktZSjlm5BIThey5q7IEYtZVixxC+lIN6CnSZCfI4s00Dq3w=="
          crossorigin="anonymous"
          referrerpolicy="no-referrer"
        ></script> 
        
                <script src="https://cdnjs.cloudflare.com/ajax/libs/mobile-detect/1.4.5/mobile-detect.min.js"></script>
        */}
      </head>

      <body className={inter.className} suppressHydrationWarning={true}>
        <div>
          <Providers>
            <Header />

            {children}

            <Footer />
            {/* // {children} */}
          </Providers>
        </div>
        <script
          dangerouslySetInnerHTML={{
            __html: ` window.dataLayer = window.dataLayer || [];
      function gtag() {
        dataLayer.push(arguments);
      }
      gtag("js", new Date());
      gtag("config", "UA-139720900-1");`,
          }}
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              var Tawk_API = Tawk_API || {};
              var Tawk_LoadStart = new Date();
              (function () {
                var s1 = document.createElement("script"),
                  s0 = document.getElementsByTagName("script")[0];
                s1.async = true;
                s1.src = "https://embed.tawk.to/65a8f6990ff6374032c1b255/1hke06j06";
                s1.charset = "UTF-8";
                s1.setAttribute("crossorigin", "*");
                s0.parentNode.insertBefore(s1, s0);
              })();
            `,
          }}
        />
      </body>
    </html>
  );
}
