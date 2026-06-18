<div align="center">

<img src="https://playwright.dev/img/playwright-logo.svg" alt="Playwright Logo" width="120" />

# 🎭 Playwright Test Automation

### Automação de Testes Web com Playwright + Page Object Model

[![Playwright Tests](https://github.com/brunno3356/playwrigth/actions/workflows/playwright.yml/badge.svg)](https://github.com/brunno3356/playwrigth/actions/workflows/playwright.yml)
[![Node.js](https://img.shields.io/badge/Node.js-LTS-339933?logo=node.js&logoColor=white)](https://nodejs.org)
[![Playwright](https://img.shields.io/badge/Playwright-1.58%2B-2EAD33?logo=playwright&logoColor=white)](https://playwright.dev)
[![License](https://img.shields.io/badge/License-ISC-blue.svg)](LICENSE)

</div>

---

## 📋 Sobre o Projeto

Este projeto implementa uma suíte de **testes automatizados E2E** para a aplicação demo [**OrangeHRM**](https://opensource-demo.orangehrmlive.com) utilizando o **Playwright** com o padrão de design **Page Object Model (POM)**.

O objetivo é demonstrar boas práticas de automação de testes web, incluindo organização de código, reutilização via POM, cobertura de cenários positivos e negativos, e integração com CI/CD via GitHub Actions.

---

## 🏗️ Estrutura do Projeto

```
playwright-orangehrm-automation/
│
├── 📁 .github/
│   └── 📁 workflows/
│       └── playwright.yml         # Pipeline CI/CD GitHub Actions
│
├── 📁 page/                       # Page Object Models (POM)
│   ├── loginPage.js               # POM: Tela de Login
│   └── dashboardPage.js           # POM: Tela do Dashboard
│
├── 📁 tests/                      # Suítes de Teste
│   └── bootcamp.spec.js           # Cenários de teste de login
│
├── playwright.config.js           # Configuração do Playwright
├── package.json                   # Dependências e scripts
├── .gitignore                     # Arquivos ignorados pelo Git
└── README.md                      # Documentação do projeto
```

---

## ✅ Cenários de Teste

| ID    | Cenário                                          | Tipo       | Status |
|-------|--------------------------------------------------|------------|--------|
| CT01  | Login direto via locators (sem POM)              | Positivo   | ✅ |
| CT02  | Login com sucesso via Page Object Model          | Positivo   | ✅ |
| CT03  | Login com credenciais inválidas                  | Negativo   | ✅ |
| CT04  | Login com campos em branco                       | Negativo   | ✅ |
| CT05  | Elementos da tela de login visíveis              | Estrutural | ✅ |
| CT06  | URL correta após login com sucesso               | Positivo   | ✅ |

---

## 🚀 Como Executar

### Pré-requisitos

- [Node.js](https://nodejs.org) v18+ instalado
- Git instalado

### 1. Clone o repositório

```bash
git clone https://github.com/brunno3356/playwrigth.git
cd playwrigth
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Instale os browsers do Playwright

```bash
npx playwright install
```

### 4. Execute os testes

```bash
# Todos os testes (headless)
npm test

# Apenas Chromium
npm run test:chromium

# Apenas Firefox
npm run test:firefox

# Modo visual (headed)
npm run test:headed

# Modo debug (abre inspector)
npm run test:debug

# Interface UI interativa
npm run test:ui
```

### 5. Ver relatório HTML

```bash
npm run report
```

---

## 🧩 Padrão Page Object Model (POM)

O projeto usa o padrão **Page Object Model** para separar a lógica de interação com a UI da lógica dos testes.

### Como funciona:

```
tests/
  └── bootcamp.spec.js   →  apenas "o que testar"
page/
  ├── loginPage.js       →  "como interagir com a tela de login"
  └── dashboardPage.js   →  "como interagir com o dashboard"
```

### Exemplo de uso:

```javascript
// No teste
const login = new LoginPage(page);
await login.loginWithUser('Admin', 'admin123');

// No Page Object (loginPage.js)
async loginWithUser(username, password) {
  await this.usernameField.fill(username);
  await this.passwordField.fill(password);
  await this.loginButton.click();
}
```

---

## ⚙️ Configuração

O arquivo `playwright.config.js` define:

| Configuração        | Valor                                         |
|---------------------|-----------------------------------------------|
| Base URL            | `https://opensource-demo.orangehrmlive.com`   |
| Browsers            | Chromium, Firefox                             |
| Timeout por teste   | 60 segundos                                   |
| Timeout de ação     | 10 segundos                                   |
| Screenshots         | Apenas em falhas                              |
| Trace               | Na primeira retentativa                       |
| Reporter            | HTML + Lista no terminal                      |
| Retries (CI)        | 2 retentativas                                |

---

## 🔄 CI/CD - GitHub Actions

O projeto possui pipeline automatizado com **GitHub Actions** configurado em `.github/workflows/playwright.yml`.

### O pipeline executa:

1. ✅ Checkout do código
2. ✅ Setup do Node.js (LTS)
3. ✅ Instalação das dependências (`npm ci`)
4. ✅ Instalação dos browsers Playwright
5. ✅ Execução dos testes
6. ✅ Upload do relatório HTML como artefato (30 dias de retenção)

### Triggers:

- Push para `main` ou `master`
- Pull Requests para `main` ou `master`

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia      | Versão   | Finalidade                        |
|-----------------|----------|-----------------------------------|
| Node.js         | LTS      | Runtime JavaScript                |
| Playwright      | ^1.58.1  | Framework de automação web        |
| GitHub Actions  | -        | CI/CD pipeline                    |
| JavaScript ES6+ | -        | Linguagem de programação          |

---

## 📊 Relatórios

Após a execução, o Playwright gera um relatório HTML interativo:

```bash
npm run report
# Abre o relatório em: http://localhost:9323
```

No CI/CD, o relatório é disponibilizado como artefato na aba **Actions** do GitHub.

---

## 📚 Recursos e Documentação

- 📖 [Documentação Playwright](https://playwright.dev/docs/intro)
- 🎭 [API Reference Playwright](https://playwright.dev/docs/api/class-playwright)
- 🏛️ [Page Object Model](https://playwright.dev/docs/pom)
- 🔄 [Playwright GitHub Actions](https://playwright.dev/docs/ci-intro)
- 🌐 [OrangeHRM Demo](https://opensource-demo.orangehrmlive.com)

---

## 👤 Autor

**Brunno**

[![GitHub](https://img.shields.io/badge/GitHub-brunno3356-181717?logo=github)](https://github.com/brunno3356)

---

<div align="center">

⭐ **Se este projeto foi útil, deixe uma estrela!** ⭐

*Feito com 🎭 Playwright e ❤️*

</div>
