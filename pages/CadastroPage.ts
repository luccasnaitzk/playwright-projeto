import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * CadastroPage
 * ------------
 * Representa o modal de "Sign up" (cadastro)
 */
export class CadastroPage extends BasePage {
  // Localizadores da tela (ficam guardados aqui para não repetir em vários lugares)
  private readonly linkAbrirCadastro: Locator;
  private readonly modalCadastro: Locator;
  private readonly campoUsuario: Locator;
  private readonly campoSenha: Locator;
  private readonly botaoConfirmarCadastro: Locator;

  constructor(page: Page) {
    super(page);
    this.linkAbrirCadastro = page.locator('#signin2');
    this.modalCadastro = page.locator('#signInModal');
    this.campoUsuario = page.locator('#sign-username');
    this.campoSenha = page.locator('#sign-password');
    this.botaoConfirmarCadastro = this.modalCadastro.getByRole('button', { name: 'Sign up' });
  }

  async abrirModalDeCadastro() {
    await this.linkAbrirCadastro.click();
    await expect(this.modalCadastro).toBeVisible();
  }

  /**
   * Preenche o formulário e confirma o cadastro.
   */
  async cadastrarNovoUsuario(usuario: string, senha: string) {
    await this.campoUsuario.fill(usuario);
    await this.campoSenha.fill(senha);

    const alertaDeCadastro = this.page.waitForEvent('dialog');

    await this.botaoConfirmarCadastro.click();

    const alerta = await alertaDeCadastro;
    await alerta.accept();
  }
}
