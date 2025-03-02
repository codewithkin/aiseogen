import { getWebsiteKeywords } from "@/lib/getWebsiteKeywords";
import type {NextRequest} from "next/server"
import { NextResponse } from "next/server"
import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium-min";
import { getBestKeywords } from "@/lib/getBestKeywords";
import getSiteSeoData from "@/lib/getSiteSeoData";

chromium.setHeadlessMode = true;
chromium.setGraphicsMode = false;

export async function POST(req: NextRequest) {
  try {
    // get the formdata from the request
    const {
      url, 
      description
    } = await req.json();
    const isLocal = !!process.env.CHROME_EXECUTABLE_PATH;

    // Create a new puppetteer instance
    const browser = await puppeteer.launch({
        args: isLocal ? puppeteer.defaultArgs() : [...chromium.args, "--no-sandbox", "--hide-scrollbars", "--incognito"],
        defaultViewport: chromium.defaultViewport,
        executablePath: process.env.CHROME_EXECUTABLE_PATH || await chromium.executablePath("https://drive.google.com/file/d/1DUEBvx-W_JHwWWa4jsSi5_bAGR_gX1tj/view?usp=sharing"),
        headless: chromium.headless,
    })

    // Create a new page instance
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
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": accessOrigin || allowedOrigins[0]
      }
    }) 
  } catch (e) {
    console.log(e);
    
    return NextResponse.json({
      error: e
    }, {
      status: 500
    })
  }
}

