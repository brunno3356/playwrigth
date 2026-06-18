/**
 * LoginPage - Page Object Model para a tela de login do OrangeHRM
 * Encapsula todos os seletores e ações relacionadas ao login
 */
export class LoginPage {
  constructor(page) {
    this.page = page;

    // Locators
    this.usernameField = page.getByRole('textbox', { name: 'Username' });
    this.passwordField = page.locator("[name='password']");
    this.loginButton = page.locator("[type='submit']");
    this.errorMessage = page.locator('.oxd-alert-content-text');
    this.pageTitle = page.locator('.orangehrm-login-title');
  }

  /**
   * Navega para a página de login
   */
  async navigate() {
    await this.page.goto('/web/index.php/auth/login');
  }

  /**
   * Realiza login com credenciais padrão de admin
   */
  async loginWithUser(username = 'Admin', password = 'admin123') {
    await this.usernameField.fill(username);
    await this.passwordField.fill(password);
    await this.loginButton.click();
  }

  /**
   * Verifica se a mensagem de erro está visível
   */
  async getErrorMessage() {
    await this.errorMessage.waitFor({ state: 'visible' });
    return this.errorMessage.textContent();
  }

  /**
   * Verifica se o título da página de login está visível
   */
  async checkLoginPageTitle() {
    await expect(this.pageTitle).toBeVisible();
  }
}