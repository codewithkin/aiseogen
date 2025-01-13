

export async function getBestKeywords(keywords: string[]) {
    // API credentials
    const apiUsername = "admin@aiseogen.com";
    const apiPassword = process.env.DATA_FOR_SEO_PASSWORD;

    // API Endpoint URL
    const apiUrl = "https://api.dataforseo.com/v3/serp/google/organic/live/advanced";

    // Request payload
    const payload = [{keyword: keywords[0], language_code:"en", location_code: 2826, depth: 10}];

    // Create a best keywords array to store the best keywords
    const bestKeywords = [];

    // Get each keyword's ranking
    const res = await fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Basic ${Buffer.from(`${apiUsername}:${apiPassword}`).toString("base64")}`
        },
        body: JSON.stringify(payload)
    });

    const data = await res.json();

    const results = data.tasks[0]?.result || [];
    console.log(data.tasks[0].result[0].items);

    const bestKywords = results
            .map((result: any) => ({
                keyword: result.keyword,
                maxTrendValue: Math.max(...result.trends.map((trend: any) => trend.value))
            }))
            .sort((a: any, b: any) => b.maxTrendValue - a.maxTrendValue);

    console.log(bestKywords);

    // Remove keywords with a low ranking

    // Repeat generation of the keywords with a low ranking

    // Check the new keywords' ranking

    // Populate the bestkeywords array with the new generated keywords
    bestKeywords.push("");

    // Get the keywords from the response
    return keywords;
}