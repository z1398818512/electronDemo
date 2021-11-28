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



// const wss = new WebSocket.WebSocketServer({ port: 9032 });


// wss.on('connection', ws => {
//   ws.on('message', message => {
//     console.log('received: %s', message);
//   });

//   ws.send('something');
// });

//  const socket = new WebSocket('ws://localhost:13528')


//  socket.onopen = () => {
//    console.log('aaa')
//  }