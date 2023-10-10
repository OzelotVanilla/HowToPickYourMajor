import { Button, Space, Typography } from "antd"
import "./index.page.scss"
import { DotChartOutlined, SnippetsOutlined, UnorderedListOutlined } from "@ant-design/icons"
import Link from "next/link"
import { LanguageSelect_Button } from "@/components/LanguageSelect_Button"
import { useI18N } from "@/i18n/i18n"

const { Title } = Typography

export default function Page()
{
    const { text } = useI18N()

    return (<>
        <div id="HomePage_Frame">
            <Title className="MainTitle" level={1}>{text.home.title}</Title>
            <Title className="SubTitle" level={3}>{text.home.title_explaination}</Title>
            <Space size={"large"}>
                <Button type="primary" size="large" shape="round">
                    <DotChartOutlined />{text.home.pick_now}
                </Button>
                <Button size="large" shape="round">
                    <SnippetsOutlined />{text.home.compare}
                </Button>
                <Link href="/major_overview"><Button size="large" shape="round">
                    <UnorderedListOutlined />{text.home.overview}
                </Button></Link>
            </Space>
        </div>
        <div id="HomePage_LangSelectButton"><LanguageSelect_Button /></div>
    </>)
}