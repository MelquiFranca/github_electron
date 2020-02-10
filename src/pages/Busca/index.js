const { ipcRenderer } = require('electron');
function enviaFormulario() {
    const dados = {
        busca: document.getElementsByName('buscar')[0].value
    };
    ipcRenderer.send('busca', dados);
    return false;
}