import { encodeURIWithQueryParameter, jsonfyResponse } from "@/utils/common"

export type AvailableCategory = ""

const major_overview_fetch_url = "/api/getMajorData"

type fetchMajorOverviewData_Args = {
    cache_data_version?: string
    onSuccess: (data: MajorData) => void
    onFail?: (reason: string) => void
}

type MajorOverview_Response = {
    majors: {
        name: string
        category: AvailableCategory
        description: string
        employments_after_graduate: string[]
    }[],
    current_version: number
}

export type MajorData = MajorOverview_Response;

export function fetchMajorOverviewData(
    { cache_data_version = "0", onSuccess, onFail = console.error }: fetchMajorOverviewData_Args
)
{
    const fetch_url = encodeURIWithQueryParameter(major_overview_fetch_url, {
        current_version: cache_data_version
    })

    fetch(fetch_url, { method: "get" })
        .then(jsonfyResponse)
        // .then(s => { console.log("/api/getMajorData"); console.log(s); return s })
        .then(onSuccess)
        .catch(onFail)
}