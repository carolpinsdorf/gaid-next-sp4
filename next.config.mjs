/** @type {import('next').NextConfig} */
const nextConfig = {
    compiler: {
        styledComponents: true,
    },
    images: {
        unoptimized: true,
        domains: [], // adicione aqui os domínios externos se estiver usando imagens de CDN
    },
};

export default nextConfig;