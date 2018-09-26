const express = require('express')
const wsServer = require('ws').Server
const app = express()

const port = 8000

const queueState = {
    'request': '00',
    'queue': [
        '00'
    ]
}

app.use(express.static('public'))
const server = app.listen(port, () => console.log(`Server is listening at ${port}.`))

const wss = new wsServer({ server })
wss.on('connection', ws => {
    ws.on('message', msg => {
        queueState = JSON.parse(message)
    })

    ws.send(JSON.stringify(queueState))
})