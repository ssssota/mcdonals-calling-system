const express = require('express')
const wsServer = require('ws').Server
const app = express()

const port = 8000

let queueState = {
    'request': [1, 2],
    'queue': [
        {'number': 1, 'people': 4},
        {'number': 2, 'people': 3},
        {'number': 3, 'people': 2},
        {'number': 4, 'people': 4}
    ]
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