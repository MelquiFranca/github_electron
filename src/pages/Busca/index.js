const { ipcRenderer } = require('electron');
function enviaFormulario() {
    const dados = {
        busca: document.getElementsByName('buscar')[0].value
    };
    ipcRenderer.invoke('busca', dados).then(retorno => {
        carregaPreLista(retorno);
    });
    return false;
}

function carregaPreLista(dados) {
    const { items } = dados;
    const boxLista = document.getElementsByClassName('busca-pre-lista')[0];    
    const botaoExibirLista = document.getElementById('exibir-lista');    
    const lista = document.getElementsByClassName('lista')[0];
    
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

        // console.log(user);
    })

    boxLista.style.display = 'flex';
    botaoExibirLista.style.display = 'block';
}