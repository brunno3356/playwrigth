// @ts-check
import { test, expect } from '@playwright/test';
import { LoginPage } from '../page/loginPage.js';
import { DashboardPage } from '../page/dashboardPage.js';

// ============================================================
// Suite: Login - OrangeHRM
// Sistema: https://opensource-demo.orangehrmlive.com
// ============================================================

test.describe('🔐 Autenticação - Login OrangeHRM', () => {
  let loginPage;
  let dashboardPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    await loginPage.navigate();
  });

  // ----------------------------------------------------------
  // CT01 - Login simples sem Page Object
  // ----------------------------------------------------------
  test('CT01 - Login direto via locators (sem POM)', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
    await page.locator("[name='password']").fill('admin123');
    await page.locator("[type='submit']").click();

    await expect(page).toHaveURL(/dashboard/);
    await page.locator('.oxd-topbar-header-breadcrumb-module').waitFor();
  });

  // ----------------------------------------------------------
  // CT02 - Login com sucesso usando Page Object Model (POM)
  // ----------------------------------------------------------
  test('CT02 - Login com sucesso via Page Object Model', async ({ page }) => {
    await loginPage.loginWithUser();
    await dashboardPage.checkDashboardPage();

    await expect(page).toHaveURL(/dashboard/);
  });

  // ----------------------------------------------------------
  // CT03 - Login com credenciais inválidas
  // ----------------------------------------------------------
  test('CT03 - Login com credenciais inválidas exibe mensagem de erro', async ({ page }) => {
    await loginPage.loginWithUser('usuarioInvalido', 'senhaErrada');

    const errorMsg = await loginPage.getErrorMessage();
    expect(errorMsg).toContain('Invalid credentials');
  });

  // ----------------------------------------------------------
  // CT04 - Login com campos em branco
  // ----------------------------------------------------------
  test('CT04 - Login com campos em branco exibe validação', async ({ page }) => {
    await loginPage.loginWithUser('', '');

    // Espera mensagem de campo obrigatório
    const required = page.locator('.oxd-input-field-error-message');
    await expect(required.first()).toBeVisible();
  });

  // ----------------------------------------------------------
  // CT05 - Verificar elementos da página de login
  // ----------------------------------------------------------
  test('CT05 - Elementos da tela de login estão visíveis', async ({ page }) => {
    await expect(loginPage.usernameField).toBeVisible();
    await expect(loginPage.passwordField).toBeVisible();
    await expect(loginPage.loginButton).toBeVisible();
  });

  // ----------------------------------------------------------
  // CT06 - Verificar URL após login com sucesso
  // ----------------------------------------------------------
  test('CT06 - URL correta após login com sucesso', async ({ page }) => {
    await loginPage.loginWithUser();
    await dashboardPage.checkDashboardPage();

    await expect(page).toHaveURL(
      'https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index'
    );
  });
});
