const { app, BrowserWindow } = require('electron');
const path = require('path');
const { spawn } = require('child_process');

let backendProcess;

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    minWidth: 750,
    maxWidth: 800,
    height: 850,

    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  win.setMenu(null);
  win.loadFile(path.join(__dirname, 'dist/qr-code-front/browser/index.html'));
}

function startBackend() {
  const backendPath = path.join(__dirname, 'api/net9.0/QRCodeApi.exe');

  backendProcess = spawn(backendPath, [], {
    detached: true,
    stdio: 'ignore',
    windowsHide: true
  });

  backendProcess.unref();
}

app.whenReady().then(() => {
  startBackend();
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('quit', () => {
  if (backendProcess) {
    backendProcess.kill();
  }
});
