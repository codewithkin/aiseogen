import OpenAI from "openai";
const openai = new OpenAI();

export async function sendMessageToAI(message: string) {
    const completion = await openai.chat.completions.create({
        model: "gpt-4o",
        store: true,
        messages: [
            {"role": "user", "content": message}
        ]
    });

    return completion.choices[0].message.content;
}
