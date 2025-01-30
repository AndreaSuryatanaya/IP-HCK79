// import { data } from "react-router";
import axios from "../config/axiosInstance";
import { useState } from "react";

export default function GeminiTalk() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  console.log(input, `<-- prAi`);

  async function talkGemini(e) {
    e.preventDefault();
    try {
      const { data } = await axios({
        method: "POST",
        url: "/which-is-better",
        data: {
          input,
        },
      });
      console.log(data, `<--geminiJSX`);
      setOutput(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">🤖 Ngobrol Santai With AI</h2>

      <div className="mb-3">
        <textarea
          className="form-control"
          rows="4"
          placeholder="Ketik pertanyaanmu di sini..."
          onChange={(e) => setInput(e.target.value)}
        ></textarea>
      </div>

      <div className="text-center">
        <button
          className="btn btn-primary px-4"
          onClick={talkGemini}
          //   disabled={loading}
        >
          Ask me
        </button>
      </div>

      <div className="mt-4 p-3 border rounded bg-light">
        <strong>Answer:</strong>
        <p className="mt-2">{output.kesimpulan}</p>
      </div>
    </div>
  );
}
