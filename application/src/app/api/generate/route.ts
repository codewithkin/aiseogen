import { getWebsiteKeywords } from "@/lib/getWebsiteKeywords";
import type {NextRequest} from "next/server"
import { NextResponse } from "next/server"
import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium-min";
import { getBestKeywords } from "@/lib/getBestKeywords";
import getSiteSeoData from "@/lib/getSiteSeoData";

export async function POST(req: NextRequest) {
    // get the formdata from the request
    const {
      url, 
      description
    } = await req.json();
    const dummyKeywords = ["mvp development agency", "minimum viable product services", "startup mvp solutions", "custom mvp development", "mvp app development", "product market fit analysis", "rapid prototyping agency", "mvp software development", "lean startup mvp", "mvp development process"];

    const isLocal = !!process.env.CHROME_EXECUTABLE_PATH;

    // Create a new puppetteer instance
    const browser = await puppeteer.launch({
        args: isLocal ? puppeteer.defaultArgs() : chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath: process.env.CHROME_EXECUTABLE_PATH || await chromium.executablePath('https://<Bucket Name>.s3.amazonaws.com/chromium-v126.0.0-pack.tar'),
        headless: chromium.headless,
    });

    // Create a new pave instance
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

    // Get the website's AI-genrated keywords
    const keywords = await getWebsiteKeywords(url, description);

    // Find out which keywords are best perfoming and return them
    // const bestKeywords = await getBestKeywords(keywords);

    // Get the website's copy
    const seoData = await getSiteSeoData(keywords, url, description);

    // Close the browser
    await browser.close();
    
    const origin = req.headers.get("origin");
    const allowedOrigins = [
      "www.aiseogen.com",
      "https://www.aiseogen.com",
      "https://aiseogen.com",
      "http://localhost:3000"
    ]
    const accessOrigin = allowedOrigins.find((myOrigin: string) => myOrigin === origin);

    return NextResponse.json({
      seoData
    }, {
      headers: {
        "Access-Control-Allow-Origin": accessOrigin || allowedOrigins[0]
      }
    })
}

