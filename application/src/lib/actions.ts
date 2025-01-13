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
    console.log(data)

    return data;
}