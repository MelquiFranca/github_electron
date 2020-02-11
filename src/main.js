const { app, BrowserWindow, ipcMain } = require('electron');
const {criaJanelaBusca} = require('./renderizaPaginas');

app.whenReady().then(criaJanelaBusca);

app.on('window-all-closed', () => {
    if(process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if(BrowserWindow.getAllWindows().length === 0) {
        criaJanelaBusca();
    }
});
