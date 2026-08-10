/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
      images: {
        domains: [
            'images.unsplash.com',
            'picsum.photos',
            'via.placeholder.com',
            'ik.imagekit.io'
        ],
      },
};

export default nextConfig;
