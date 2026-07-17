import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * CarrinhoPage
 * ------------
 * Responsável por: adicionar um produto ao carrinho
 * abrir a página do carrinho e remover um produto.
 */
export class CarrinhoPage extends BasePage {
  private readonly linkCarrinho: Locator;
  private readonly tabelaDeProdutos: Locator;

  constructor(page: Page) {
    super(page);
    this.linkCarrinho = page.locator('#cartur'); // link "Cart" no menu
    this.tabelaDeProdutos = page.locator('#tbodyid'); // corpo da tabela do carrinho
  }

  /**
   * Abre a página de um produto pelo nome e clica em "Add to cart".
   * Assim como no cadastro, o Demoblaze mostra um alert() nativo
   */
  async adicionarProdutoAoCarrinho(nomeDoProduto: string) {
    await this.page.getByRole('link', { name: nomeDoProduto, exact: true }).click();

    const alertaProdutoAdicionado = this.page.waitForEvent('dialog');
    await this.page.getByRole('link', { name: 'Add to cart' }).click();

    const alerta = await alertaProdutoAdicionado;
    await alerta.accept();
  }

  async abrirCarrinho() {
    await this.linkCarrinho.click();
    await expect(this.page).toHaveURL(/cart\.html/);
  }

  private linhaDoProduto(nomeDoProduto: string): Locator {
    return this.tabelaDeProdutos.locator('tr', { hasText: nomeDoProduto });
  }

  async validarProdutoNoCarrinho(nomeDoProduto: string) {
    await expect(this.linhaDoProduto(nomeDoProduto)).toBeVisible();
  }

  /**
   * Remove o produto clicando no link "Delete" da linha correspondente.
   * A remoção acontece via AJAX (sem recarregar a página
   */
  async removerProdutoDoCarrinho(nomeDoProduto: string) {
    const linha = this.linhaDoProduto(nomeDoProduto);
    await linha.getByRole('link', { name: 'Delete' }).click();
    await expect(linha).toBeHidden();
  }

  async validarCarrinhoVazio() {
    await expect(this.tabelaDeProdutos.locator('tr')).toHaveCount(0);
  }
}
