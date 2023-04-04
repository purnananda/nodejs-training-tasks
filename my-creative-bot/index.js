//------------------------------------------------------------------------------
// Author: Purnananda Behera, Youtube: @TechyPurna
// Description: Building API endpoint to connect OpenAI GPT-3 model 
// to generate the text based on the requested prompt.
//------------------------------------------------------------------------------
const express = require('express')
const router = express.Router()

const { Configuration, OpenAIApi } = require('openai')
const YOUR_API_KEY = 'YOUR_OPENAI_API_KEY'

const configuration = new Configuration({
  apiKey: YOUR_API_KEY
})
const openai = new OpenAIApi(configuration)

// Function to generate text using GPT-3 model
const GPT3 = async prompt => {
  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: prompt,
    max_tokens: 50,
    top_p: 0.3,
    frequency_penalty: 0.5,
    presence_penalty: 0,
    temperature: 0.3,
    stop: ['{}']
  })

  return response.data.choices[0].text
}

router.post('/', async (req, res) => {
  // Get the prompt from the request
  const { prompt } = req.body
  console.log(`Prompt: ${JSON.stringify(prompt)}`)

  try {
    let response = await GPT3(prompt)
    res.send(response)
  } catch (err) {
    console.log(`Error: ${JSON.stringify(err)}`)
    res.status(500).json({ error: err })
  }
})

module.exports = router
