const express = require('express')
const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config()
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express();
app.use(bodyParser.json())
app.use(cors())
const port = 8000;


const configuration = new Configuration({
    organization: "org-AMndm5kuAyM5roeGXA19K4yH",
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

app.post('/api/v1', async (req, res) => {
    
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: req.body.message,
        max_tokens: 100,
        temperature: 0,
    })
    res.json({
        "message": response.data.choices[0].text
    })
    console.log(response.data.choices[0].text)
})

app.listen(port, () => {
    console.log(`Server running on https://localhost:${port}`);
})