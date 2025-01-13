import { sendMessageToAI } from "./sendMessageToAI";

export default async function getSiteSeoData(keywords: string[], url:string, description: string) {
    // Generate the website's copy
    const copy = await sendMessageToAI(`Generate metadata (title, meta tags, og tags) and website copy (headings, paragraphs, content) for this website: ${url} that adhere to these keywords: ${keywords} and this description: ${description}. Return this as JSON data and say nothing else. Return the data in the form of {"metadata": {title: string, metaTags: string[], ogTags: string[]}, "content": {headings: string[], paragraphs: string[], content: string}}`);

    // Remove the backticks and "json" from the copy
    const regulatedCopy = copy?.replace(/`/g, '').replace(/json/g, '');

    return regulatedCopy;
}