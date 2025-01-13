import { sendMessageToAI } from "./sendMessageToAI";

export async function getWebsiteKeywords(url: string, description: string) {
    const keywords = await sendMessageToAI(`Generate 10 SEO-rich, relevant keywords for the website ${url} which is ${description}. Return the keywords in a comma separated list. Do not say anything else as this is a JSON response.`);

    /* Example output: {
  keywords: '"mvp development agency," "minimum viable product services," "startup mvp solutions," "custom 
  mvp development," "mvp app development," "product market fit analysis," "rapid prototyping agency," "mvp software development," "lean startup mvp," "mvp development process"'
  }  FOR CURSOR TO UNDERSTAND */
    const cleanedUpKeywords = keywords?.replace(/["']/g, "").split(",") || [];
    return cleanedUpKeywords;
}