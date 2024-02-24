/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[
            {
                protocol:'https',
                hostname:'*.googleusercontent.com'
            },
            {
                protocol:'https',
                hostname:'storage.googleapis.com'
            }
        ]
    }
};

export default nextConfig;
