import { getWebsiteKeywords } from "@/lib/getWebsiteKeywords";
import type {NextRequest} from "next/server"
import { NextResponse } from "next/server"
import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium-min";


export async function POST(req: NextRequest) {
    // get the formdata from the request
    const {url, description} = await req.json();

    const isLocal = !!process.env.CHROME_EXECUTABLE_PATH;

    // Create a new puppetteer instance
    const browser = await puppeteer.launch({
        args: isLocal ? puppeteer.defaultArgs() : chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath: process.env.CHROME_EXECUTABLE_PATH || await chromium.executablePath('https://<Bucket Name>.s3.amazonaws.com/chromium-v126.0.0-pack.tar'),
        headless: chromium.headless,
    });
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

