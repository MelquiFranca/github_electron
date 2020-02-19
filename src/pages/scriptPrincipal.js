
function criaBotaoFavoritar(id, funcao) {
    const btnFavoritar = document.createElement('button');
    btnFavoritar.setAttribute('class', 'btn-seguir fa fa-check');
    btnFavoritar.setAttribute('id', id);
    btnFavoritar.onclick = funcao;

    return btnFavoritar;
}

function criaBotaoDesfavoritar(id, funcao) {
    const btnDesfavoritar = document.createElement('button');
    btnDesfavoritar.setAttribute('class', 'btn-sair fa fa-close');
    btnDesfavoritar.setAttribute('id', id);
    btnDesfavoritar.onclick = funcao;

    return btnDesfavoritar;
}

module.exports = {
    favoritar,
    criaBotaoFavoritar,
    criaBotaoDesfavoritar  
}