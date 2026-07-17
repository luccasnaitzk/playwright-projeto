import { test } from '@playwright/test';
import { CadastroPage } from '../pages/CadastroPage';
import { LoginPage } from '../pages/LoginPage';
import { CarrinhoPage } from '../pages/CarrinhoPage';

// Dados de teste
// N foi possível cadastrar duas vezes o mesmo usuário

const usuario = `usuario_teste_${Date.now()}`;
const senha = 'Senha@123';
const produto = 'Samsung galaxy s6';

test.describe('fluxo de cadastro, login e carrinho', () => {
  test('deve cadastrar um usuário, logar, adicionar e remover um produto do carrinho', async ({ page }) => {
    // As Page Objects concentram a lógica de cada tela.
    // O teste só descreve O QUE deve acontecer, em português claro.
    const cadastroPage = new CadastroPage(page);
    const loginPage = new LoginPage(page);
    const carrinhoPage = new CarrinhoPage(page);

    await cadastroPage.abrirHome();

    // 1. Cadastro
    await cadastroPage.abrirModalDeCadastro();
    await cadastroPage.cadastrarNovoUsuario(usuario, senha);

    // 2. Login
    await loginPage.abrirModalDeLogin();
    await loginPage.logar(usuario, senha);
    await loginPage.validarLoginRealizadoComSucesso(usuario);

    // 3. Adicionar produto ao carrinho
    await carrinhoPage.adicionarProdutoAoCarrinho(produto);
    await carrinhoPage.abrirCarrinho();
    await carrinhoPage.validarProdutoNoCarrinho(produto);

    // 4. Remover produto do carrinho
    await carrinhoPage.removerProdutoDoCarrinho(produto);
    await carrinhoPage.validarCarrinhoVazio();
  });
});
