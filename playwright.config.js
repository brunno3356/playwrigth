// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright Configuration - OrangeHRM Test Automation
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',

  /* Executa os testes em paralelo dentro dos arquivos */
  fullyParallel: true,

  /* Falha o build no CI se houver test.only acidentalmente */
  forbidOnly: !!process.env.CI,

  /* Retry apenas no CI */
  retries: process.env.CI ? 2 : 0,

  /* Workers paralelos */
  workers: process.env.CI ? 1 : undefined,

  /* Reporter: HTML para relatórios visuais + lista no terminal */
  reporter: [
    ['html', { open: 'never' }],
    ['list'],
  ],

  use: {
    /* Base URL da aplicação sendo testada */
    baseURL: 'https://opensource-demo.orangehrmlive.com',

    /* Coleta trace nas retentativas */
    trace: 'on-first-retry',

    /* Screenshot somente em caso de falha */
    screenshot: 'only-on-failure',

    /* Timeout padrão de ações */
    actionTimeout: 10_000,

    /* Timeout de navegação */
    navigationTimeout: 30_000,
  },

  /* Timeout global por teste */
  timeout: 60_000,

  /* Projetos de browser */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
  ],
});
