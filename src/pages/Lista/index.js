const { ipcRenderer } = require('electron');

let usuariosEncontrados;
ipcRenderer.on('carrega-usuarios', (event, dados) => {
    usuariosEncontrados = dados;
    carregaLista();
    console.log(usuariosEncontrados);
});

function carregaLista() {
    const listaUsuarios = document.getElementById('lista-usuarios');

    usuariosEncontrados.map(usuario => {
        const usuarioItem = document.createElement('div');
        const usuarioItemLink = document.createElement('div');
        const usuarioItemDados = document.createElement('div');
        const itemDadosNome = document.createElement('div');
        const itemDadosBio = document.createElement('div');
        const imagem = document.createElement('img');
        const acoes = document.createElement('form');
        const btnAcoes = document.createElement('button');
        const inputHidden = document.createElement('input');
        
        usuarioItem.setAttribute('class', 'lista-usuario-item');
        usuarioItemLink.setAttribute('class', 'usuario-item-link');
        usuarioItemDados.setAttribute('class', 'usuario-item-dados');
        itemDadosNome.setAttribute('class', 'nome');
        itemDadosBio.setAttribute('class', 'bio');
        imagem.setAttribute('src', usuario.avatar_url);
        acoes.setAttribute('class', 'acoes');
        btnAcoes.setAttribute('class', 'btn-seguir');
        inputHidden.setAttribute('type', 'hidden');        
        inputHidden.setAttribute('value', {...usuario});        
        
        btnAcoes.textContent = 'Seguir';
        itemDadosNome.textContent = usuario.login;
        itemDadosBio.textContent = usuario.bio || 'Sem Biografia...';

        usuarioItemDados.appendChild(itemDadosNome);
        usuarioItemDados.appendChild(itemDadosBio);
        usuarioItemLink.appendChild(imagem);
        usuarioItemLink.appendChild(usuarioItemDados);

        acoes.appendChild(btnAcoes);

        usuarioItem.appendChild(usuarioItemLink);
        usuarioItem.appendChild(acoes);

        listaUsuarios.appendChild(usuarioItem);
                    
    });
}