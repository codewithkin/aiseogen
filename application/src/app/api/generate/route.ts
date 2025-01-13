import { getWebsiteKeywords } from "@/lib/getWebsiteKeywords";
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

    // Clean up the output - get the text content of the page
    const text = await page.evaluate(() => {
        const body = document.body.innerText;
        return body;
    });

    const keywords = await getWebsiteKeywords(url, description);

    // Close the browser
    await browser.close();

    return NextResponse.json({keywords})
}

