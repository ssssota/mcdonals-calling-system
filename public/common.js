const url = new URL(location.href)
const getURLParam = key => {
    return url.searchParams.get(key)
}


document.addEventListener('DOMContentLoaded', e => {
    // 表示タイプ
    const type = getURLParam('type')
    if (!type) return
    switch (type){
        // 受付
        case 'receipt':
            document.querySelectorAll('.type-selector,.streaming').forEach(node => {
                node.style.display = 'none'
            })
            // 受け付けた際の処理
            const $number = document.querySelector('#number')
            const $people = document.querySelector('#people')
            document.querySelector('#addRequest').addEventListener('submit', e => {
                e.preventDefault();

                queueState.queue.push({'number': $number.value, 'people': $people.value})
                ws.send(JSON.stringify(queueState))

                $number.value = Number($number.value) + 1
                $people.value = null
                $number.focus()
            })
            break
        // 呼出
        case 'request':
            document.querySelectorAll('.type-selector,.add-request,.streaming').forEach(node => {
                node.style.display = 'none'
            })
            break
        // 表示
        case 'display':
            document.querySelectorAll('.type-selector,.add-request').forEach(node => {
                node.style.display = 'none'
            })
            document.querySelector('#container').classList.add('display')
            break
    }
    let chime
    if (confirm('通知音をオンにしますか？')) {
        chime = new Audio('./se.mp3')
        chime.load()
    }

    document.title = type

    // WebSocket接続
    const ws = new WebSocket(`ws://${location.host}`)
    let queueState = {}

    // elementの取得
    const $queue = document.querySelector('#queue')
    const $request = document.querySelector('#request')
    const $latency = document.querySelector('#latency')

    // stateの更新時に表示を更新
    const reset = () => {
        if (chime) chime.play()
        // 受付済みの更新
        $queue.textContent = ''
        queueState.queue.forEach((value, index) => {
            $queue.insertAdjacentHTML('beforeend', `<li id="queue${value.number}">${value.number}番 ${value.people}名</li>`)
            if (type === 'request') {
                document.querySelector(`#queue${value.number}`).addEventListener('click', e => {
                    if (queueState.request.indexOf(value.number) == -1) {
                        queueState.request.push(value.number)
                        ws.send(JSON.stringify(queueState))
                    }
                })
            }
        })

        // 呼び出し中の更新
        $request.textContent = ''
        queueState.request.forEach((value, index) => {
            $request.insertAdjacentHTML('beforeend', `<span id="request${value}">${value}, </span>`)
            if (type !== 'display') {
                document.querySelector(`#request${value}`).addEventListener('click', e => {
                    queueState.request.splice(index, 1)
                    queueState.queue.forEach((val, index) => {
                        if (val.number === value) {
                            queueState.queue.splice(index, 1)
                        }
                    })
                    ws.send(JSON.stringify(queueState))
                })
            }
        })

        // 待ち時間の更新
        $latency.textContent = queueState.queue.length * 4
    }

    ws.addEventListener('open', () => console.log('WebSocket is opened.'))
    ws.addEventListener('message', e => {
        queueState = JSON.parse(e.data.replace(/"/g, '\"'))
        console.log(queueState)

        reset()
    })
    ws.addEventListener('close', console.log('WebSocket is closed.'))
})
