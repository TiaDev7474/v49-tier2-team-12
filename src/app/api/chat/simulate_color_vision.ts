import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

const system_message2 = "I want you to be an assistant who is able to simulate how the selected color might appear to users with different types of color vision deficiencies, ensuring inclusivity in design decisions. Simulate for Monochromacy (Complete Color Blindness), Deuteranomaly (reduced sensitivity to green light), Protanomaly (reduced sensitivity to red light) and Tritanomaly (reduced sensitivity to blue light). Always output the response in json object like this format {\n" +
"   \"normalVision\": {\n" +
"        \"name\": \"Red\",\n" +
"        \"code\": \"#4b0000\"\n" +
"        \"description\": \"Description following this example format: The color #4b0000 is a deep, rich red color. Here's how it might appear to users with different types of color vision deficiencies:\"\n" +
"    },\n" +
"    \"visionDeficiencies\": [\n" +
"        {\n" +
"            \"type\": \"Monochromacy (Complete Color Blindness):\",\n" +
"            \"name\": \"Gray\",\n" +
"            \"code\": \"#808080\"\n" +
"            \"description\": \"Description following this example format: For individuals with complete color vision deficiency, the color #4b0000 might appear as a shade of brown or a dark, muted gray. The saturation and brightness of the color might be reduced, making it harder to distinguish from other dark colors.\"\n" +
"        },\n" +
"        {\n" +
"            \"type\": \"Deuteranomaly (reduced sensitivity to green light):\",\n" +
"            \"name\": \"Muted Red\",\n" +
"            \"code\": \"#984b4b\"\n" +
"            \"description\": \"Description following this example format: Individuals with red-green colorblindness, who have trouble distinguishing between red and green, might perceive the color #4b0000 as a darker, more muted version of red. The hue might shift towards a brown or orange tone, with reduced saturation.\"\n" +
"        },\n" +
"        {\n" +
"            \"type\": \"Protanomaly (reduced sensitivity to red light):\",\n" +
"            \"name\": \"Brown\",\n" +
"            \"code\": \"#964B00\"\n" +
"            \"description\": \"Description following this example format: Those with protanomaly, who are sensitive to long wavelengths of light, might perceive the color #4b0000 as a darker, more muted version of orange or brown. The color might appear over-darkened or washed out, making it difficult to distinguish from other dark colors.\"\n" +
"        },\n" +
"        {\n" +
"            \"type\": \"Tritanomaly (reduced sensitivity to blue light):\",\n" +
"            \"name\": \"Burgundy\",\n" +
"            \"code\": \"#800020\"\n" +
"            \"description\": \"Description following this example format: Individuals with tritanomaly, who have trouble distinguishing between blue and yellow, might perceive the color #4b0000 as a darker, more muted version of red or burgundy. The hue might shift towards a blue or purple tone, with reduced saturation.\"\n" +
"        },\n" +
"    ]\n" +
" }"


export async function POST(request: Request) {
    const { colorHex } = await request.json(); 
    const prompt2 = `Hex color code: ${colorHex}`;

    const completion2 = await openai.chat.completions.create({
         messages: [
             { role: "system", content: system_message2 },
             { role: "user", content: prompt2 }
         ],
         model: "gpt-3.5-turbo",

    });
    console.log(completion2.choices[0])
    return Response.json({ data: completion2.choices[0]})
}
