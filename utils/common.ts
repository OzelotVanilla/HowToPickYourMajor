export function encodeURIWithQueryParameter(uri: string, params: Record<string, Object>): string
{
    const queries = Object.entries(params).map(
        ([query_key, query_value]) => `${query_key}=${encodeURIComponent(query_value.toString())}`
    ).join("&")
    return `${uri}?${queries}`
}

export const jsonfyResponse = (r: Response) => r.json()

export function groupElementBy
    <EleType extends Object, GroupingKey extends keyof EleType>
    (arr: EleType[], group_by: GroupingKey)
{
    let result = new Map<EleType[GroupingKey], EleType[]>()
    arr.forEach(
        (value) =>
        {
            const key_name = value[group_by]
            if (!result.has(key_name)) { result.set(key_name, []) }
            result.get(key_name)?.push(value)
        }
    )

    return result
}