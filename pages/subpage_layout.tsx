import { ConfigProvider, Layout, Typography } from "antd"
import "./subpage_layout.scss"
import { useI18N } from "@/i18n/i18n"
import Link from "next/link"
import { LanguageSelect_Button } from "@/components/LanguageSelect_Button"
const { Header, Content } = Layout
const { Title } = Typography

export default function SubPage_Layout({ children }: React.PropsWithChildren)
{
    const { text } = useI18N()
    const white = "#ffffff"

    return (<ConfigProvider theme={{ components: { Layout: { headerBg: white, } } }}>
        <div id="SubPage_Layout">
            <Header id="SubPage_Layout_Header">
                <div id="SubPage_Layout_Header_LogoArea">
                    <Title level={3} style={{ margin: "0px", userSelect: "none" }}><Link href="/">
                        <span style={{ color: "#000000" }}>{text.navbar.project_name}</span>
                    </Link></Title>
                </div>
                <div id="SubPage_Layout_Header_LanguageButton"><LanguageSelect_Button /></div>
            </Header>
            <Content id="SubPage_Layout_Content">{children}</Content>
        </div>
    </ConfigProvider>)
}