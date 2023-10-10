import { ConfigProvider } from "antd";
import { AppProps } from "next/app";

export default function AppGlobalWrapper({ Component, pageProps }: AppProps)
{
    return (
        <ConfigProvider theme={{
            token: {
                fontFamily: "Consolas, 'LXGW Wenkai Mono', LXGWWenKaiMono, serif"
            }
        }}>
            <Component {...pageProps} />
        </ConfigProvider>
    )
}