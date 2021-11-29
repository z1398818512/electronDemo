const { app, BrowserWindow, webContents } = require('electron')
const WebSocket = require('ws');
const path = require('path')
require('./server/index')


/* 打开index.html */
function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    },
    webContents: {
      openDevTools: true
    }
  })

  win.loadFile('index.html')
  win.webContents.openDevTools()

}

app.on('ready', () => {
  process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'//关闭web安全警告
})

/* 平台准备好后的回调 */
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    console.log('activate', BrowserWindow.getAllWindows())
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

/* 退出应用的回调 */
app.on('window-all-closed', function () {
  console.log('window-all-closed', process.platform) // 平台
  app.quit()
})