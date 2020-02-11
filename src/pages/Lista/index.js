const { ipcRenderer } = require('electron');

function carregaLista() {
    ipcRenderer.invoke('dados-lista', {}).then((event, dados) => {
        console.log(dados);
    });
}

carregaLista();