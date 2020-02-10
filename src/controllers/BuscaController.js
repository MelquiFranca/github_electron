const axios = require('axios');
module.exports = {
    async selecionar(busca) {
        const retorno = await axios.get(`https://api.github.com/users/${busca}`);
        return retorno.data;
    },

    async listar(busca) {
        const retorno = await axios.get(`https://api.github.com/search/users?q=${busca}`);
        return retorno.data;
    }

}