const BuscaController = require('../controllers/BuscaController');

describe('BuscaController', () => {
    test('Testa lista de Usuários Buscada no GitHub', async () => {
        const listaUsuarios = await BuscaController.listar('melqui');
        // console.log(listaUsuarios.total_count);
        expect(listaUsuarios).toMatchObject(expect.objectContaining({
                incomplete_results: expect.toBe(false),
                total_count: expect.any(Number),
                items: expect.any(Array),
            })
        );
    });
});