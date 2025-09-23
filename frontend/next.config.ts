import type { NextConfig } from "next";
/** @type {import('next').NextConfig} */

const nextConfig = {
    experimental: {
        outputFileTracingRoot: __dirname,
    },
};

export default nextConfig;
