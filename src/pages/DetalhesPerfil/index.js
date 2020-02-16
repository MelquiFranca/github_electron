const { ipcRenderer } = require('electron');

let dadosUsuario;

function carregaDadosUsuario(usuario) {
    // const detalhesUsuario = document.getElementById('detalhes-usuario');
    const avatar = document.getElementsByName('avatar')[0];
    const nome = document.getElementsByName('nome')[0];
    const bio = document.getElementsByName('bio')[0];

    avatar.setAttribute('src', usuario.avatar_url);
    nome.textContent = usuario.login;
    bio.textContent = usuario.bio || "Sem Biografia...";
}

function carregaDadosRepositorios(repositorios) {
    const listaRepositorio = document.getElementById('lista-repositorios');

    repositorios.map(rep => {
        const nome = document.createElement('div');
        const descricao = document.createElement('div');
        const item = document.createElement('li');
        nome.setAttribute('class', 'repositorio-nome');
        descricao.setAttribute('class', 'repositorio-descricao');
        item.setAttribute('class', 'item-repositorios');

        nome.textContent = rep.name;
        descricao.textContent = rep.description;

        item.appendChild(nome);
        item.appendChild(descricao);
        listaRepositorio.appendChild(item);

    });
}

ipcRenderer.on('carrega-dados-usuario', (evento, dados) => {
    // console.log(dados.repositorios);
    dadosUsuario = dados;
    carregaDadosUsuario(dados.usuario);
    carregaDadosRepositorios(dados.repositorios);
    
});