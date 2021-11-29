const WebSocketServer = require('./socket_server')
const WebSockeClient = require('./scoket_client.js')

const ScoketServer = new WebSocketServer()
const ScoketClient = new WebSockeClient()

/* 菜鸟控件的交互 */
ScoketServer.listenMessage('getAgentInfo', (msg) => {
    ScoketClient.send(msg)
})
ScoketClient.listenMessage('getAgentInfo', (msg) => {
    ScoketServer.send(msg)
})

ScoketServer.listenMessage('getPrinters', (msg) => {
    ScoketClient.send(msg)
})
ScoketClient.listenMessage('getPrinters', (msg) => {
    ScoketServer.send(msg)
})
ScoketServer.listenMessage('setPrinterConfig', (msg) => {
    ScoketClient.send(msg)
})
ScoketClient.listenMessage('setPrinterConfig', (msg) => {
    ScoketServer.send(msg)
})
ScoketServer.listenMessage('print', (msg) => {
    ScoketClient.send(msg)
})
ScoketClient.listenMessage('print', (msg) => {
    ScoketServer.send(msg)
})

module.exports = {}

