const BuscaController = require('../controllers/BuscaController');

describe('BuscaController', () => {
    test('Testa lista de Usuários Buscada no GitHub', async () => {
        const listaUsuarios = await BuscaController.listar('melqui');
        // console.log(listaUsuarios.total_count);
        expect(listaUsuarios).toEqual(expect.objectContaining({
                incomplete_results: expect.any(Boolean),
                total_count: expect.any(Number),
                items: expect.any(Array),
            })
        );
    });
});