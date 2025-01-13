import { sendMessageToAI } from "./sendMessageToAI";

export async function getWebsiteKeywords(url: string, description: string) {
    const keywords = await sendMessageToAI(`Generate 10 SEO-rich, relevant keywords for the website ${url} which is ${description}`);

    return keywords;
}