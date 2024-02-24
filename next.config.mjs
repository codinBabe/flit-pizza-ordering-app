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
                hostname:'pizza-ordering-app-414022.appspot.com'
            }
        ]
    }
};

export default nextConfig;
