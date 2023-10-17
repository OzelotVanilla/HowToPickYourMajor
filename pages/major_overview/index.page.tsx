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
    let [major_list, setMajorList] = useState<MajorData["majors"]>([])
    const cookie = useCookie()

    const { text } = useI18N()

    const cookie_name_major_data = "major_cache_data"

    // onLoad
    useEffect(() =>
    {
        const cached_major_data: Partial<MajorData> = cookie.get(cookie_name_major_data) ?? {}
        // console.log(`Now major_cache_data_version: ${cached_major_data.current_version}`)

        fetchMajorOverviewData({
            cache_data_version: "0", // cached_major_data.current_version,
            onSuccess: s =>
            {
                // Code here is problematic: when "name" changed, or there is data deletion.
                //
                // let new_major_data;
                //
                // // Merge the incoming data with cache.
                // if (cached_major_data.majors == undefined || cached_major_data.majors.length == 0)
                // {
                //     new_major_data = s
                // }
                // else
                // {
                //     for (const major_to_update of s.majors)
                //     {
                //         const old_data_position =
                //             cached_major_data.majors.findIndex((m) => m.name == major_to_update.name)
                //         if (old_data_position >= 0) { cached_major_data.majors[old_data_position] = major_to_update }
                //         else { cached_major_data.majors.push(major_to_update) }
                //     }
                //     cached_major_data.current_version = s.current_version
                //     new_major_data = cached_major_data as MajorData
                // }

                let new_major_data = s;
                setMajorList(new_major_data.majors);
                cookie.set(cookie_name_major_data, JSON.stringify(new_major_data))
            }
        })
    }, [])

    function getSideMenu()
    {
        type MenuItem = Required<MenuProps>["items"]

        const grouped_by_category = groupElementBy(major_list, "category")
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
        return (<Menu mode="inline" items={menu_items} defaultOpenKeys={[...grouped_by_category.keys()]} />)
    }

    return (<SubPage_Layout><Layout id="MajorOverviewPage_Layout">
        <Sider theme="light" style={{ height: "auto" }} width="max(200px, 20vw)" collapsible={true}>
            {getSideMenu()}
        </Sider>
    </Layout></SubPage_Layout>)
}