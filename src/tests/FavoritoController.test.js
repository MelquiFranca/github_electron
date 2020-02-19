const FavoritoController = require('../controllers/FavoritoController');

describe('FavoritoController', () => {    
    test('Testa se usuário é Favorito', async () => {
        const usuario = await FavoritoController.verificaFavorito(24555436);
        expect(usuario.login).toBe("MelquiFranca");
    });
})