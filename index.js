const express = require('express')
const wsServer = require('ws').Server
const app = express()

const port = 8000

let queueState = {
    'request': [],
    'queue': []
}

app.use(express.static('public'))
const server = app.listen(port, () => console.log(`Server is listening at ${port}.`))

const wss = new wsServer({ server })
wss.on('connection', ws => {
    ws.on('message', message => {
        queueState = JSON.parse(message)

        wss.clients.forEach(client => {
            client.send(JSON.stringify(queueState))
        })
    })

    ws.send(JSON.stringify(queueState))
})