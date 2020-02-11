const axios = require('axios');
module.exports = {
    async selecionar(busca) {
        const retorno = await axios.get(`https://api.github.com/users/${busca}`);
        return retorno.data;
    },

    async listar(busca) {
        const retorno = await axios.get(`https://api.github.com/search/users?q=${busca}`);
        return retorno.data;
    },

    async listarComDadosCompletos(busca) {

        async function loadDados(dados) {
            const retorno = await axios.get(dados.url);
            return retorno.data;
        }        
        
        function carregaUsuarios() {
            const dados = busca.map(user => {
                const dados = loadDados(user);
                return dados;
            });

            return dados;
        }
        
        const usuarios = carregaUsuarios();
        // usuarios = carregaUsuarios();

        // console.log(usuarios);
        
        return usuarios;
    
    }

}