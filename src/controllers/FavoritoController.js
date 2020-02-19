const { Usuario } = require('../database/models/');
const BuscaController = require('./BuscaController');

async function adicionarFavorito(dados) { 
    const usuario = await BuscaController.selecionar(dados.login);
    const favoritos = await Usuario.findOrCreate({
        where: {idGit: usuario.id}, 
        defaults: {
            idGit: usuario.id,
            login: usuario.login,
            nome: usuario.name,
            avatar_url: usuario.avatar_url,
            url: usuario.url,
            bio: usuario.bio,
            repos_url: usuario.repos_url
        }
    });
    console.log(favoritos);
    return true;
}
async function removerFavorito(dados) {   
    
    const favorito = await Usuario.destroy({
        where: {
            idGit: dados.id
        }
    });
    console.log(favorito);
    return true;
}

async function verificaFavorito(id) {
    const usuario = await Usuario.findOne({
        where: {idGit: id}
    });
    return usuario.dataValues;
}

module.exports = {
    adicionarFavorito,
    removerFavorito,
    verificaFavorito
}