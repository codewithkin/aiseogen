"use server"

export async function submit(formData: FormData) {
    const url = formData.get("url") as string
    const description = formData.get("description") as string

    console.log(url, description)

    const res = await fetch(`${process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://aiseogen.com"}/api/generate`, {
        method: "POST",
        body: JSON.stringify({url, description})
    })

    const data = await res.json();

    // Get the keywords from the response
    const keywords = data.keywords;

    // Find out which keywords are best perfoming
    const bestKeywords = await getBestKeywords(keywords);

    return keywords;
}