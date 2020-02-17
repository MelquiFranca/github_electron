const ScriptPrincipal = require('../scriptPrincipal');

const { ipcRenderer } = require('electron');

let usuariosEncontrados;

ipcRenderer.on('carrega-usuarios', (event, dados) => {
    usuariosEncontrados = dados.items;
    carregaLista();
});

function carregaLista() {
    const listaUsuarios = document.getElementById('lista-usuarios');

    usuariosEncontrados.map(usuario => {
        const usuarioItem = document.createElement('div');
        const usuarioItemLink = document.createElement('div');
        const usuarioItemDados = document.createElement('div');
        const itemDadosNome = document.createElement('div');
        const imagem = document.createElement('img');
        const acoes = document.createElement('div');
        const btnFavoritar = ScriptPrincipal.criaBotaoFavoritar(usuario.id, favoritar);
        const btnDesfavoritar =  ScriptPrincipal.criaBotaoDesfavoritar(usuario.id);
        const inputHidden = document.createElement('input');
        
        usuarioItem.setAttribute('class', 'lista-usuario-item');
        usuarioItemLink.setAttribute('class', 'usuario-item-link');
        usuarioItemLink.onclick = acessaPerfil;
        usuarioItemDados.setAttribute('class', 'usuario-item-dados');
        itemDadosNome.setAttribute('class', 'nome');
        imagem.setAttribute('src', usuario.avatar_url);
        acoes.setAttribute('class', 'acoes');
        inputHidden.setAttribute('type', 'hidden');        
        inputHidden.setAttribute('name', 'dadosUsuario');
        inputHidden.setAttribute('value', usuario.id);        
        itemDadosNome.textContent = usuario.login;

        usuarioItemDados.appendChild(itemDadosNome);
        usuarioItemDados.appendChild(inputHidden);
        usuarioItemLink.appendChild(imagem);
        usuarioItemLink.appendChild(usuarioItemDados);
        acoes.appendChild(btnFavoritar);
        acoes.appendChild(btnDesfavoritar);

        usuarioItem.appendChild(usuarioItemLink);
        usuarioItem.appendChild(acoes);

        listaUsuarios.appendChild(usuarioItem);
                    
    });
}

function acessaPerfil(e) {
    const nome = e.target.parentElement.getElementsByClassName('nome')[0].textContent;
    const dadosUsuario = e.target.parentElement.querySelector('[name=dadosUsuario]');
    const usuario = usuariosEncontrados.filter(usu => usu.id == dadosUsuario.value);
    // console.log(usuario);
    ipcRenderer.send('exibe-perfil', usuario[0]);
}

function favoritar(e) {
    e.preventDefault();
    
    const usuario = usuariosEncontrados.filter(usu => usu.id == e.target.id);

    ipcRenderer.invoke('adicionar-favorito', usuario[0])
        .then(retorno => {
            // console.log(retorno);
        }
    );
}