const { BrowserWindow, ipcMain } = require('electron');
const BuscaController = require('./controllers/BuscaController');

const CONFIGURACOES_INICIAIS = {
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
        nodeIntegration: true
    },

};

let janelaBusca;
let janelaLista;


function criaJanelaBusca() {
    janelaBusca = new BrowserWindow(CONFIGURACOES_INICIAIS);
    janelaBusca.loadFile('./pages/Busca/index.html');

    janelaBusca.once('ready-to-show', () => {
        janelaBusca.show();
    });

    ipcMain.handle('busca', async (evento, dados) => {

        const usuarios = await BuscaController.listar(dados.busca);
        return usuarios;
    });

    ipcMain.on('exibe-lista', (evento, dados) => {
        
        janelaBusca.hide();
        
        if(!janelaLista) {
            criaJanelaLista(dados);
        } else {
            janelaLista.show();
        }
    });
    janelaBusca.on('closed', () => {
        janelaBusca = null;
    })

    
    // janelaBusca.webContents.openDevTools();
}

async function criaJanelaLista(dados) {
    janelaLista = new BrowserWindow({...CONFIGURACOES_INICIAIS, parent: janelaBusca, modal: true});    
    janelaLista.loadFile('./pages/Lista/index.html');
    
    let usuarios = await BuscaController.listar(dados);
    let novosDados = await BuscaController.listarComDadosCompletos(usuarios.items);
    console.log(novosDados);
    janelaLista.webContents.send('carrega-usuarios', novosDados);
    
    janelaLista.on('closed', () => {
        janelaLista = null;
        janelaBusca.show();
    });

    janelaLista.webContents.openDevTools();
}



module.exports = {
    criaJanelaBusca,
}