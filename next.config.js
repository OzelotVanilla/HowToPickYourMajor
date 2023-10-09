const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    pageExtensions: ["page.tsx"],
    /**
     * Disable module CSS, 
     *  from "https://stackoverflow.com/questions/67934463/how-to-turn-off-css-module-feature-in-next-js".
     */
    webpack(config)
    {
        config.module.rules.forEach(
            (rule) =>
            {
                const { oneOf } = rule;
                if (oneOf)
                {
                    oneOf.forEach((one) =>
                    {
                        if (!`${one.issuer?.and}`.includes('_app')) return;
                        one.issuer.and = [path.resolve(__dirname)];
                    });
                }
            }
        )
        return config;
    },
}

module.exports = nextConfig
