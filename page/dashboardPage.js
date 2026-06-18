/**
 * DashboardPage - Page Object Model para a tela do Dashboard do OrangeHRM
 * Encapsula todos os seletores e ações relacionadas ao dashboard
 */
export class DashboardPage {
  constructor(page) {
    this.page = page;

    // Locators
    this.dashboardHeader = page.locator('.oxd-topbar-header-breadcrumb-module');
    this.userDropdown = page.locator('.oxd-userdropdown-name');
    this.dashboardTitle = page.locator('h6', { hasText: 'Dashboard' });
    this.sideMenu = page.locator('.oxd-sidepanel');
  }

  /**
   * Aguarda o carregamento completo do dashboard
   */
  async checkDashboardPage() {
    await this.dashboardHeader.waitFor({ state: 'visible' });
  }

  /**
   * Retorna o nome do usuário logado exibido no header
   */
  async getLoggedUsername() {
    await this.userDropdown.waitFor({ state: 'visible' });
    return this.userDropdown.textContent();
  }

  /**
   * Verifica se o menu lateral está visível
   */
  async checkSideMenuVisible() {
    await expect(this.sideMenu).toBeVisible();
  }

  /**
   * Navega para um item do menu lateral pelo nome
   * @param {string} menuItem - Nome do item de menu
   */
  async navigateToMenu(menuItem) {
    await this.page.locator('.oxd-nav-item', { hasText: menuItem }).click();
  }
}