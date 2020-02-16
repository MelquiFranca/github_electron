const { ipcRenderer } = require('electron');

let listaUsuarios;
function enviaFormulario() {
    const dados = {
        busca: document.getElementsByName('buscar')[0].value
    };
    ipcRenderer.invoke('busca', dados).then(retorno => {
        listaUsuarios = retorno;
        carregaPreLista(retorno);
    });
    return false;
}

function carregaPreLista(dados) {

    const { items, total_count } = dados;
    const boxLista = document.getElementsByClassName('busca-pre-lista')[0];    
    const botaoExibirLista = document.getElementById('exibir-lista');    
    const lista = document.getElementsByClassName('lista')[0];
    
    lista.textContent = '';
    botaoExibirLista.textContent = '';

    items.slice(0, 3).map(user => {
        const li = document.createElement('li');
        const usuario =  document.createElement('div');
        const img =  document.createElement('img');
        const dados =  document.createElement('div');
        
        usuario.setAttribute('class', 'usuario');
        img.setAttribute('src', user.avatar_url);        
        dados.setAttribute('class', 'dados');
        dados.textContent = user.login;

        usuario.appendChild(img);
        usuario.appendChild(dados);
        li.appendChild(usuario);
        lista.appendChild(li);

    });
    
    document.getElementById('items').value = dados;
    boxLista.style.display = 'flex';
    botaoExibirLista.style.display = 'block';
    botaoExibirLista.textContent = `Exibir todos os ${total_count} usuários`;
}

function exibePaginalistaCompleta() {
    // const busca = document.getElementsByName('buscar')[0].value;    
    ipcRenderer.send('exibe-lista', listaUsuarios.items);
}