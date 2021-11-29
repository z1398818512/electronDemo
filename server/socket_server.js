const WebSocket = require('ws');
const { writePrintLog } = require('./file')

class WebSocketServer {
    constructor() {
        if (WebSocketServer.instance) {
            return WebSocketServer.instance
        }
        WebSocketServer.instance = this;
        this.ws;
        this.listenData = {}
        this.init()
    }
    init() {
        const Ws = new WebSocket.WebSocketServer({ port: 9032 }); // 占用9032端口
        const _this = this
        Ws.on('connection', ws => {
            _this.ws = ws
            writePrintLog('监听9032端口建立socket服务')
            ws.on('message', (msg = '') => {
                console.log('get chorme message', msg.toString())
                var msgData;
                var message = msg.toString()
                writePrintLog('从chrome获取的数据：' + message)
                try {
                    msgData = JSON.parse(message) || { cmd: '' }
                } catch (err) {
                    msgData = { cmd: message }
                }
                Object.keys(msgData).some(key => {
                    const msgKey = String(key) + String(msgData[key] || '')
                    const currentListen = _this.listenData[msgKey];
                    if (!currentListen || !currentListen.callback) return
                    currentListen.callback(msgData)
                    return true
                })
            });
        });

    }
    /*
    * 监听获取的消息
    * value[String]: 需匹配的value值
    * callback[Function]: 匹配后执行的回调
    * parmse[Object]
    *   listenKey: 需要监听的key值，不传则默认为cmd。    比如要监听返回消息中有{'cmd': 'getAgentInfo'}, 则listenKey传'cmd'， value传'getAgentInfo'
    */
    listenMessage(value = '', callback = () => { }, parmse = {}) {
        const { listenKey = 'cmd' } = parmse
        this.listenData[String(listenKey) + String(value)] = {
            value,
            callback,
            listenKey
        }
    }
    send(msg) {
        this.ws.send(JSON.stringify(msg))
        writePrintLog('发送给chrome数据：' + JSON.stringify(msg))
    }
}

module.exports = WebSocketServer;