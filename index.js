const express = require('express')
const cors = require("cors");
const myCreativeBotRoute = require("./my-creative-bot");

const app = express()
app.use(cors())

app.use(express.json())

app.get('/api/v1/ping', (req, res) => {
  res.send('Hello World!')
})

app.use('/api/v1/my-creative-bot-chat', myCreativeBotRoute);

const port = process.env.PORT || 5050
app.listen(port, () => console.log(`Listening on port ${port}...`))
