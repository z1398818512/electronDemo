const WebSocket = require('ws');
const { writePrintLog } = require('./file')

/*
* sockeClinet socket客户端
* 工厂+单例
*/
class sockeClinet {
    constructor(platFormName) {
        this.platformMap = {
            'CAINIAO': "ws://localhost:13528",
            'PDD': 'ws://localhost:5000/'
        }

        if (sockeClinet.instanceMap && sockeClinet.instanceMap[platFormName]) {
            return sockeClinet.instanceMap[platFormName]
        }
        if (!sockeClinet.instanceMap) sockeClinet.instanceMap = {}
        sockeClinet.instanceMap[platFormName] = this;
        this.Ws = {};
        this.init(this.platformMap[platFormName] || "ws://localhost:13528");
        this.listenData = {}
        this.platFormName = platFormName
    };
    init(url = '') {
        const _this = this;
        _this.Ws = new WebSocket(url)
        _this.Ws.on('open', function open() {
            writePrintLog(`连接${url}成功`)
        });
        _this.Ws.on('message', (msg = '') => {
            var msgData;
            var message = msg.toString()
            writePrintLog('从打印机获取的数据：' + message)

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

    }
    send(msg) {
        this.Ws.send(JSON.stringify(msg));
        writePrintLog('发送给打印机的数据：' + JSON.stringify(msg))

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

}

module.exports = sockeClinet


