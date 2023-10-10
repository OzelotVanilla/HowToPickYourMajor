import { Layout } from "antd"
import "./major_overview.scss"
import SubPage_Layout from "../subpage_layout"
const { Sider } = Layout

export default function MajorOverviewPage()
{
    return (<SubPage_Layout><Layout id="MajorOverviewPage_Layout">
        <Sider theme="light" style={{ height: "auto" }}></Sider>
    </Layout></SubPage_Layout>)
}