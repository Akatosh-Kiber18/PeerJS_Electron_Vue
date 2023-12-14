const { app, BrowserWindow } = require('electron');

let mainWindow;

function createWindow() {
    if (!mainWindow) {
        mainWindow = new BrowserWindow({
            width: 800,
            height: 600,
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false,
            }
        });

        mainWindow.loadFile('index.html');

        mainWindow.on('closed', function () {
            mainWindow = null;
        });
    }
}


app.on('ready', createWindow);

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function () {
    if (mainWindow === null) createWindow();
});