const FavoritoController = require('../controllers/FavoritoController');

describe('FavoritoController', () => {    
    test('Testa se usuário é Favorito', async () => {
        const usuario = await FavoritoController.verificaFavorito(24555436);
        expect(usuario.login).toBe("MelquiFranca");
    });

    test('Testa Adicionar Favorito', async () => {
        const usuario = await FavoritoController.adicionarFavorito({login: 'melquifranca'});
        expect(usuario[0]).toBeInstanceOf(Object);
        // expect(usuario[1]).toBeInstanceOf(false);
    });

    test('Testa Salvar Avatar', async () => {
        const avatar = await FavoritoController.salvaAvatar(9201063, 'https://avatars0.githubusercontent.com/u/9201063?v=4');
        expect(avatar).toEqual(true);
    });

    test('Testa Excluir Avatar', async () => {
        const avatar = await FavoritoController.excluiAvatar();
        expect(avatar).toEqual(true);
    });
});