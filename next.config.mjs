/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
      images: {
        remotePatterns: [{hostname: 'ik.imagekit.io'}],
      },
};

export default nextConfig;
