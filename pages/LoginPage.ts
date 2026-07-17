import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * LoginPage
 * ---------
 * Representa o modal de "Log in" .
 */
export class LoginPage extends BasePage {
  private readonly linkAbrirLogin: Locator;
  private readonly modalLogin: Locator;
  private readonly campoUsuario: Locator;
  private readonly campoSenha: Locator;
  private readonly botaoConfirmarLogin: Locator;
  private readonly boasVindasUsuarioLogado: Locator;

  constructor(page: Page) {
    super(page);
    this.linkAbrirLogin = page.locator('#login2'); // link "Log in" no menu
    this.modalLogin = page.locator('#logInModal');
    this.campoUsuario = page.locator('#loginusername');
    this.campoSenha = page.locator('#loginpassword');
    this.botaoConfirmarLogin = this.modalLogin.getByRole('button', { name: 'Log in' });
    this.boasVindasUsuarioLogado = page.locator('#nameofuser'); // aparece após logar
  }

  async abrirModalDeLogin() {
    await this.linkAbrirLogin.click();
    await expect(this.modalLogin).toBeVisible();
  }

  async logar(usuario: string, senha: string) {
    await this.campoUsuario.fill(usuario);
    await this.campoSenha.fill(senha);
    await this.botaoConfirmarLogin.click();
  }

  /**
   * confirma que o login funcionou de verdade,
   * validando o texto "Welcome <usuario>" que aparece no menu.
   */
  async validarLoginRealizadoComSucesso(usuario: string) {
    await expect(this.boasVindasUsuarioLogado).toBeVisible();
    await expect(this.boasVindasUsuarioLogado).toContainText(usuario);
  }
}
