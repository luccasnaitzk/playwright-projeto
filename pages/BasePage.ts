import type { Page } from 'playwright';

/**
 * BasePage
 * --------
 */

export class BasePage {
  constructor(protected readonly page: Page) {}

  async abrirHome() {
    await this.page.goto('/');
  }
}
