const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow

let mainWindow

const edge = require('edge-js');
const path = require('path');

let myFunction = edge.func({
    assemblyFile: path.join(__dirname, 'MyNativeNet.dll'),
    typeName: 'MyNativeNet.Helper',
    methodName: 'Add'
});

function createWindow () {
  mainWindow = new BrowserWindow({width: 800, height: 600})

  mainWindow.loadURL(`file://${__dirname}/index.html`)

  myFunction(1,2, function(error, result) {
    if (error) throw error;
    console.log(result);
    });

  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})
