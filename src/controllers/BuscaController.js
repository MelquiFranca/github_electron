const axios = require('axios');
module.exports = {
    async pesquisar(busca) {
        const retorno = await axios.get(`https://api.github.com/users/${busca}`);
        console.log(retorno.data);
    }

}