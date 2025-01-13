import type {NextRequest} from "next/server"
import { NextResponse } from "next/server"
import puppeteer from "puppeteer"

export async function POST(req: NextRequest) {
    // get the formdata from the request
    const {url, description} = await req.json();

    // Create a new puppetteer instance
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Navigate to the URL
    await page.goto(url);

    // Get the page content
    const content = await page.content();
    console.log(content);

    return NextResponse.json({message: "Hello World"})
}

