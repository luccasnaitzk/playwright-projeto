# Testes Playwright

Automação do fluxo:
- cadastro
- login
- adicionar produto ao carrinho
- remover produto do carrinho

## Organização do projeto

projeto-teste/
├── pages/                   # Page Objects por tela
│   ├── BasePage.ts          # ações comuns a todas as páginas
│   ├── CadastroPage.ts      # modal "Sign up"
│   ├── LoginPage.ts         # modal "Log in"
│   └── CarrinhoPage.ts      # adicionar/remover produto e validar carrinho
├── tests/                   # testes Playwright
│   └── carrinho.spec.ts
├── playwright.config.ts     # configuração do Playwright
├── package.json            # dependências e scripts
└── tsconfig.json           # configuração TypeScript

## Como rodar

```bash
npm install
npx playwright install chromium
npm test
```


