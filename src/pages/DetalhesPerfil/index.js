const { ipcRenderer } = require('electron');

let dadosUsuario;


ipcRenderer.on('carrega-dados-usuario', (evento, dados) => {
    console.log(dados);
    // dadosUsuario = dados;
});