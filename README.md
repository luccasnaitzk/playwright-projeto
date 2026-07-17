# Testes EasySecrets

Automação -> **cadastro → login → adicionar produto ao carrinho → remover produto do carrinho**.

## Organização do projeto


projeto-teste/
├── pages/                   # Camada de Page Objects (regras de CADA TELA -> conforme pedido)
│   ├── BasePage.ts          # ações comuns a todas as páginas
│   ├── CadastroPage.ts      # tudo relacionado ao modal "Sign up"
│   ├── LoginPage.ts         # tudo relacionado ao modal "Log in"
│   └── CarrinhoPage.ts      # adicionar/remover produto, ver carrinho
├── tests/                   # Camada de testes (O QUE deve acontecer)
│   └── carrinho.spec.ts
├── playwright.config.ts     # configuração (baseURL, timeouts, relatórios)
├── package.json
└── tsconfig.json


## Como rodar

```bash
npm install
npx playwright install chromium
npm test
```


