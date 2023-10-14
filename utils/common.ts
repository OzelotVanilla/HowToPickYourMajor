export function encodeURIWithQueryParameter(uri: string, params: Record<string, Object>): string
{
    const queries = Object.entries(params).map(
        ([query_key, query_value]) => `${query_key}=${encodeURIComponent(query_value.toString())}`
    ).join("&")
    return `${uri}?${queries}`
}

export const jsonfyResponse = (r: Response) => r.json()