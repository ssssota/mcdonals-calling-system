
const ws = new WebSocket(`ws://${location.host}`)
let queueState = {}

document.addEventListener('DOMContentLoaded', e => {
})

ws.addEventListener('open', () => console.log('WebSocket is opened.'))
ws.addEventListener('message', e => {
    queueState = JSON.parse(e.data.replace(/"/g, '\"'))
    console.log(queueState)
})
ws.addEventListener('close', console.log('WebSocket is closed.'))