const { BrowserWindow, ipcMain } = require('electron');
const BuscaController = require('./controllers/BuscaController');

const CONFIGURACOES_INICIAIS = {
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
        nodeIntegration: true
    },

};

module.exports = {
    busca() {
        const win = new BrowserWindow(CONFIGURACOES_INICIAIS);
        win.loadFile('./pages/Busca/index.html');

        win.once('ready-to-show', () => {
            win.show();
        });

        ipcMain.handle('busca', async (evento, dados) => {
            const usuarios = await BuscaController.listar(dados.busca);
            return usuarios;
        });

        
        ipcMain.on('exibe-lista', (event, dados) => {
            event.preventDefault();
            // const win = new BrowserWindow(CONFIGURACOES_INICIAIS);
            win.loadFile('./pages/Lista/index.html');
            console.log(dados);
            ipcMain.handle('dados-lista', (evento, d) => {
                return dados;
            })
        });


        win.webContents.openDevTools();

        ipcMain.on('teste', (event, dados) => {     
            // const win = new BrowserWindow(CONFIGURACOES_INICIAIS);    
            win.loadFile('./pages/DetalhesPerfil/index.html');
            win.once('ready-to-show', () => {
                win.show();
            });
        })
    }
}