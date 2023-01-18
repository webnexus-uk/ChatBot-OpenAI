const { Configuration, OpenAIApi } = require("openai");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

require("dotenv").config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

const config = new Configuration({
  apiKey: process.env.API_TOKEN,
});

const openai = new OpenAIApi(config);

app.post("/message", (req, res) => {
  //{prompt: "this is the message"}
  const response = openai.createCompletion({
    model: "text-davinci-003",
    prompt: req.body.prompt,
    temperature: 0,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 256,
  });

  response.then((data) => {
      res.send({ message: data.data.choices[0].text});
    }).catch((err) => {
      res.send({ message: err });
    });
});

app.listen(3000, () => {
  console.log('Listennig on port 3000')
});
