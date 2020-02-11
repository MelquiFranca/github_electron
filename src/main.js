const { app, BrowserWindow, ipcMain } = require('electron');
const renderizaPaginas = require('./renderizaPaginas');

app.whenReady().then(renderizaPaginas.busca);

app.on('window-all-closed', () => {
    if(process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if(BrowserWindow.getAllWindows().length === 0) {
        renderizaPaginas.busca();
    }
});
