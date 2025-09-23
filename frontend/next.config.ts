import type { NextConfig } from "next";

const nextConfig = {
    experimental: {
        // ✅ valeur attendue : chemin de ton frontend
        outputFileTracingRoot: __dirname,
    },
};


export default nextConfig;
