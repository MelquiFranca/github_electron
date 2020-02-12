const axios = require('axios');

async function selecionar(busca) {
    const retorno = await axios.get(`https://api.github.com/users/${busca}`);
    return retorno.data;
}

async function listar(busca) {
    const retorno = await axios.get(`https://api.github.com/search/users?q=${busca}`);
    return retorno.data;
}

async function listarComDadosCompletos(busca) {

    // let usuarios = [];
    
    let dados = busca.map(async user => {
        const retorno = await selecionar(user.login);

        return retorno;
    });      
    return dados;

}


module.exports = {
    selecionar,
    listar,
    listarComDadosCompletos,
}