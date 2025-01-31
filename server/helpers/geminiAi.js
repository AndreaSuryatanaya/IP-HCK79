const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const gemini = async (input) => {
  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY);
  // Access your API key as an environment variable (see "Set up your API key" above)
  // ...
  // The Gemini 1.5 models are versatile and work with most use cases
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  // ...
  // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
  const prompt = `${input}. anda adalah seorang assisten pribadi yang memiliki pengetahuan yang luas tentang apapun.
  response with a data json yang memiliki property kesimpulan dari semua informasi nya di dapat. create without \`\`\`json and \`\`\`
  Struktur JSON harus seperti ini:
    {
      "kesimpulan": "Ringkasan jawaban dalam satu kalimat."
    }`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  let text = response.text();
  console.log(text);
  text = JSON.parse(text.trim());
  return text;
};

module.exports = gemini;
