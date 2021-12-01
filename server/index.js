const WebSocketServer = require('./socket_server')
const WebSockeClient = require('./scoket_client.js')

const ScoketServer = new WebSocketServer()
const ScoketClient_CAINIAO = new WebSockeClient('CAINIAO')
const ScoketClient_PDD = new WebSockeClient('PDD')







/* 菜鸟控件的交互 */
ScoketServer.listenMessage('getAgentInfo', (msg) => {
    ScoketClient_CAINIAO.send(msg)
})
ScoketClient_CAINIAO.listenMessage('getAgentInfo', (msg) => {
    ScoketServer.send(msg)
})

ScoketServer.listenMessage('getPrinters', (msg) => {
    ScoketClient_CAINIAO.send(msg)
})
ScoketClient_CAINIAO.listenMessage('getPrinters', (msg) => {
    ScoketServer.send(msg)
})
ScoketServer.listenMessage('setPrinterConfig', (msg) => {
    ScoketClient_CAINIAO.send(msg)
})
ScoketClient_CAINIAO.listenMessage('setPrinterConfig', (msg) => {
    ScoketServer.send(msg)
})
ScoketServer.listenMessage('print', (msg) => {
    ScoketClient_CAINIAO.send(msg)
})
ScoketClient_CAINIAO.listenMessage('print', (msg) => {
    ScoketServer.send(msg)
})


const { ipcMain } = require("electron");

ipcMain.on("sendMessage", (event, data) => {
    console.log(data);

})


module.exports = {}

ScoketServer.listenMessage('1.0', (msg) => {
    ScoketClient_PDD.send(msg)
}, { listenKey: 'version' })
ScoketClient_PDD.listenMessage('getPrinters', (msg) => {
    ScoketServer.send(msg)
})