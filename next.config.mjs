/** @type {import('next').NextConfig} */

const nextConfig = {
  env: {
    url: "https://destination.missionsummittreks.com",
  },
  // experimental: {
  //   serverActions: true,
  // },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "destination.missionsummittreks.com",
        port: "",
        // pathname: '/account123/**',
      },
    ],
  },
  distDir: "/build",
  trailingSlash: true,
  // webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
  //   config.plugins.push(
  //     new webpack.ProvidePlugin({
  //       $: "jquery",
  //       jQuery: "jquery",
  //       "window.jQuery": "jquery",
  //     })
  //   );
  //   return config;
  // },
  // images: {
  //   remotePatterns: [
  //     {
  //       protocol: "https",
  //       hostname: "destination.missionsummittreks.com/",
  //       // port: '',
  //       pathname: "images/",
  //     },
  //   ],
  // },
  //this is testing
  // images: {
  //   remotePatterns: [
  //     {
  //       hostname: "destination.missionsumittreks.com/",
  //     },
  //   ],
  // },
  //basePath: "/https://destination.missionsummittreks.com",
  // sassOptions: {
  //   includePaths: ["./src"],
  //   prependData: `@import "~@styles/styles.scss";`,
  // },
};

export default nextConfig;
