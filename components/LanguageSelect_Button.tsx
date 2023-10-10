import { possible_locales, useI18N } from "@/i18n/i18n"
import { Button, Dropdown, MenuProps } from "antd"
import Link from "next/link"
import { TranslationOutlined } from "@ant-design/icons"

export function LanguageSelect_Button()
{
    const { text } = useI18N()

    const lang_select_menu: MenuProps["items"] = possible_locales.map(
        locale => ({
            key: locale, label: (<Link href={""} locale={locale}>
                {text.lang[locale as keyof typeof text.lang]}
            </Link>)
        })
    )

    return (<Dropdown menu={{ items: lang_select_menu }} placement="bottom"><Button size="large" shape="round">
        <TranslationOutlined />Language / 语言
    </Button></Dropdown>)
}