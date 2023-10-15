const path = require('path');

const possible_locale = ["en", "zh"]

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    pageExtensions: ["page.tsx"],
    i18n: {
        locales: possible_locale,
        defaultLocale: "en"
    },
    publicRuntimeConfig: {
        locales: possible_locale
    },
    /**
     * Rewrite api call to different IP address.
     */
    async rewrites()
    {
        return [
            { source: "/api/getMajorData", destination: "http://10.8.25.245/webapi/getUpdatedMajorData/" }
        ]
    },
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
