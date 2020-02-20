const { Usuario } = require('../database/models/');
const BuscaController = require('./BuscaController');

const axios = require('axios');
const fs = require('fs');
const path = require('path');

async function adicionarFavorito(dados) { 
    const usuario = await BuscaController.selecionar(dados.login);
    const favorito = await Usuario.findOrCreate({
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

    // salvaAvatar(usuario.avatar_url);

    return favorito;
}
async function removerFavorito(dados) {   
    
    const favorito = await Usuario.destroy({
        where: {
            idGit: dados.id
        }
    });
    return true;
}

async function verificaFavorito(id) {
    const usuario = await Usuario.findOne({
        where: {idGit: id}
    });
    return usuario.dataValues;
}

async function salvaAvatar(id, url) {
    // const imagem = await axios.get(url);
    // const caminho = path.resolve('src', 'images', 'avatarFavoritos', `${id}.jpeg`);
    // console.log(imagem.data);
    // fs.writeFile(caminho, new URL(url), (err) => {
    //     if(err) console.log(err);

    // });

    return true;
}

async function excluiAvatar(url) {
    return true;
}
module.exports = {
    adicionarFavorito,
    removerFavorito,
    verificaFavorito,
    salvaAvatar,
    excluiAvatar
}