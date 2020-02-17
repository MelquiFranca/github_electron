const { BrowserWindow, ipcMain } = require('electron');
const BuscaController = require('./controllers/BuscaController');
const FavoritoController = require('./controllers/FavoritoController');

const CONFIGURACOES_INICIAIS = {
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
        nodeIntegration: true
    },

};

let janelaBusca;
let janelaLista;
let janelaPerfil;

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

async function criaJanelaLista(busca) {
    janelaLista = new BrowserWindow({...CONFIGURACOES_INICIAIS, parent: janelaBusca, modal: true});    
    janelaLista.loadFile('./pages/Lista/index.html');
    
    let usuarios = await BuscaController.listar(busca);    
    janelaLista.webContents.send('carrega-usuarios', usuarios);
    
    ipcMain.on('exibe-perfil', async (evento, dados) => {      
        
        if(!janelaPerfil) {
            criaJanelaPerfil(dados);
        } else {
            janelaPerfil.show();
        }
        janelaLista.hide();

    });

    ipcMain.handle('adicionar-favorito', async (evento, dados) => {
        return FavoritoController.adicionarFavorito(dados);
    })

    janelaLista.on('closed', () => {
        janelaLista = null;
        ipcMain.removeHandler('adicionar-favorito');
        if(!janelaBusca) {
            criaJanelaBusca();
        } else {
            janelaBusca.show();
        }
    });

    janelaLista.on('close', () => {
        janelaLista = null;        
    });
    // janelaLista.webContents.openDevTools();
}

async function criaJanelaPerfil(dados) {
    janelaPerfil = new BrowserWindow({...CONFIGURACOES_INICIAIS, parent: janelaLista, modal: true});
    janelaPerfil.loadFile('./pages/DetalhesPerfil/index.html');

    const usuario = await BuscaController.selecionar(dados.login);
    const repositorios = await BuscaController.listaRepositorios(usuario.repos_url);

    janelaPerfil.webContents.send('carrega-dados-usuario', {usuario, repositorios});

    ipcMain.handle('adicionar-favorito-individual', async (evento, dados) => {
        return FavoritoController.adicionarFavorito(dados);
    });

    janelaPerfil.on('closed', () => {
        ipcMain.removeHandler('adicionar-favorito-individual');
        janelaPerfil = null;
        janelaLista.show();
    });   

    // janelaPerfil.webContents.openDevTools();
}


module.exports = {
    criaJanelaBusca,
}