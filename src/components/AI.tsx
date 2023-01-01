import _ from "lodash";
import { FormEvent, useState } from "react";
import { Configuration, OpenAIApi } from "openai";
import { training as trainingModel } from "../assets/training.json";
import loadingGif from "../assets/loading.gif";

const configuration = new Configuration({
  apiKey: process.env.REACT_APP_OPENAI_KEY,
});
const openai = new OpenAIApi(configuration);

const AI: React.FC = () => {
  const [prompt, setPrompt] = useState("");
  const [botResponse, setBotResponse] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const getResponse = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      let temp = trainingModel;
      temp += `You: ${prompt}\n`;
      const completion = await openai.createCompletion({
        model: "text-davinci-002",
        prompt: temp,
        max_tokens: 60,
        temperature: 0.5,
        top_p: 0.3,
        presence_penalty: 0,
        frequency_penalty: 0.5,
      });
      const response = completion.data.choices[0].text;
      const cleanedRes =
        response?.replace("Marv:", "").replace(/[\r\n]/gm, "") || "";
      setBotResponse(cleanedRes);
      setLoading(false);
      setPrompt("");
    } catch (error: any) {
      setLoading(false);
      if (error.response) {
        console.log(error.response.status);
        console.log(error.response.data);
      } else {
        console.log(error.message);
      }
    }
  };

  return (
    <div className="ai-container">
      <form onSubmit={getResponse} className="ai-form">
        <input
          className="ai-input"
          placeholder="Ask the bot anything"
          onChange={(evt) => setPrompt(evt.target.value)}
          value={prompt}
        />
      </form>
      <h4>
        {botResponse && !loading
          ? botResponse
          : loading && <img width="40" src={loadingGif} alt="loading..." />}
      </h4>
    </div>
  );
};

export default AI;
