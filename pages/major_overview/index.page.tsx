import "./major_overview.scss"
import SubPage_Layout from "../subpage_layout"
import { useEffect, useState } from "react"
import { AvailableCategory, MajorData, fetchMajorOverviewData } from "./major_overview_tool"
import { useCookie } from "next-cookie"
import { groupElementBy } from "@/utils/common"
import { useI18N } from "@/i18n/i18n"
import { Layout, List, Menu, MenuProps, Tooltip, Typography } from "antd"
const { Title, Paragraph } = Typography
const { Sider, Content } = Layout
import major_text_res from "./major_overview_text.json"

export default function MajorOverviewPage()
{
    let [major_list, setMajorList] = useState<MajorData["majors"]>([])
    let [selected_major_name, setSelectedMajorName] = useState("")
    const cookie = useCookie()

    const { text, locale } = useI18N()
    const major_text: typeof major_text_res["en"] = major_text_res[locale]
    type MajorName = keyof typeof major_text.major_name
    type MajorCategory = keyof typeof major_text.category

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
        if (major_list.length == 0) { return (<></>) }

        type MenuItem = Required<MenuProps>["items"]

        const grouped_by_category = groupElementBy(major_list, "category")
        const menu_items: MenuItem = [...grouped_by_category.entries()].map(
            ([category, majors]) => ({
                key: category,
                label: (<Tooltip placement="right" title={major_text.category[category as MajorCategory]}>
                    {major_text.category[category as MajorCategory]}
                </Tooltip>),
                children: majors.map((major) => ({
                    key: major.name, label: major_text.major_name[major.name as MajorName]
                })),
            })
        )

        console.log(`Major list:\n`, major_list)
        // console.log(menu_items)
        // console.log(...grouped_by_category.keys())
        return (<Menu mode="inline"
            items={menu_items} onClick={e => setSelectedMajorName(e.key)}
            defaultOpenKeys={[...grouped_by_category.keys()]} />)
    }

    const selected_major = major_list.find(major => major.name == selected_major_name)

    return (<SubPage_Layout><Layout id="MajorOverviewPage_Layout">
        <Sider theme="light" style={{ height: "auto" }} width="max(200px, 20vw)" collapsible={true}>
            {getSideMenu()}
        </Sider>
        {selected_major != undefined &&
            <Content id="MajorOverviewPage_Content">
                <Title level={1}>
                    {major_text.major_name[selected_major_name as MajorName]}
                </Title>
                {/* Major Description */}
                <Paragraph>{text.major_overview.major_desc_label}: {selected_major.description}</Paragraph>
                {/* Future Job */}
                <Paragraph>
                    {text.major_overview.future_job_label}:
                    {<List id="MajorOverviewPage_FutureJob_List" bordered={true}
                        dataSource={selected_major.employments_after_graduate}
                        renderItem={item => (<List.Item><Paragraph>{item}</Paragraph></List.Item>)}
                    />}
                </Paragraph>
            </Content>
        }
    </Layout></SubPage_Layout>)
}