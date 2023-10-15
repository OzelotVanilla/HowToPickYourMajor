import { Layout, Menu, MenuProps } from "antd"
import "./major_overview.scss"
import SubPage_Layout from "../subpage_layout"
import { useEffect, useState } from "react"
import { AvailableCategory, MajorData, fetchMajorOverviewData } from "./major_overview_tool"
import { useCookie } from "next-cookie"
import { groupElementBy } from "@/utils/common"
import { useI18N } from "@/i18n/i18n"
const { Sider } = Layout

export default function MajorOverviewPage()
{
    let [major_data, setMajorData] = useState<MajorData["majors"]>([])
    const cookie = useCookie()

    const { text } = useI18N()

    const cookie_name_major_data_version = "major_cache_data_version"
    const cookie_name_major_data = "major_cache_data"

    // onLoad
    useEffect(() =>
    {
        // console.log(`Now major_cache_data_version: ${cookie.get(cookie_name_major_data_version)}`)

        fetchMajorOverviewData({
            cache_data_version: cookie.get(cookie_name_major_data_version),
            onSuccess: s =>
            {
                setMajorData(s.majors);
                cookie.set(cookie_name_major_data, s.majors)
                cookie.set(cookie_name_major_data_version, s.current_version)
            }
        })
    }, [])

    function getSideMenu()
    {
        type MenuItem = Required<MenuProps>["items"]

        const grouped_by_category = groupElementBy(major_data, "category")
        const menu_items: MenuItem = [...grouped_by_category.entries()].map(
            ([category, majors]) => ({
                key: category,
                label: text.major_category_name[category as keyof typeof text.major_category_name],
                children: majors.map((major) => (
                    { key: major.name, label: text.major_name[major.name as keyof typeof text.major_category_name] }
                ))
            })
        )

        // console.log(menu_items)
        // console.log(...grouped_by_category.keys())
        return (<Menu mode="inline" items={menu_items} openKeys={[...grouped_by_category.keys()]} />)
    }

    return (<SubPage_Layout><Layout id="MajorOverviewPage_Layout">
        <Sider theme="light" style={{ height: "auto" }}>{getSideMenu()}</Sider>
    </Layout></SubPage_Layout>)
}