---
layout: post
title:  'Conventional Commits: Um Padrão para Mensagens de Commit'
date:   2026-07-21 20:00:00 -0300
categories: blog
tags: git, conventional-commits, boas-praticas
---

***

# **Conventional Commits: Um Padrão para Mensagens de Commit**

<div style="text-align: justify">
Este é o primeiro artigo de uma série sobre Git e boas práticas de desenvolvimento. Aqui vamos explorar o <strong>Conventional Commits</strong>, uma especificação leve para estruturar mensagens de commit que facilita a comunicação entre times, automatiza geração de changelogs e se integra perfeitamente com versionamento semântico.
</div>

* * *

## **O que são Conventional Commits?**

Conventional Commits é uma convenção para mensagens de commit que segue um formato estruturado. Ela foi proposta por pessoas que mantém o [Angular](https://github.com/angular/angular) e se tornou uma especificação amplamente adotada na comunidade open source e em empresas.

A ideia central é simples: **toda mensagem de commit deve seguir um formato previsível** que possa ser lido tanto por humanos quanto por ferramentas automatizadas.

```
<tipo>(<escopo opcional>): <descrição>

[corpo opcional]

[rodapé opcional]
```

* * *

## **Por que usar?**

Adotar um padrão de commits traz benefícios que vão muito além da estética:

| Benefício | Descrição |
|-----------|-----------|
| **Changelog automático** | Ferramentas como `standard-version` ou `semantic-release` geram changelogs baseados nos commits |
| **Versionamento semântico** | É possível determinar automaticamente se a próxima versão é major, minor ou patch |
| **Rastreabilidade** | Fica fácil entender o histórico e encontrar commits específicos |
| **Code review** | Revisores entendem rapidamente a intenção de cada mudança |
| **Onboarding** | Novos membros do time compreendem o histórico do projeto com mais facilidade |

* * *

## **Estrutura Detalhada**

### **Tipo (`type`)**

O tipo descreve a natureza da mudança. Os principais são:

| Tipo | Quando usar |
|------|-------------|
| `feat` | Uma nova funcionalidade |
| `fix` | Correção de um bug |
| `docs` | Mudanças na documentação |
| `style` | Formatação, espaçamento, ponto e vírgula (sem alterar código) |
| `refactor` | Refatoração de código sem mudar comportamento |
| `perf` | Melhorias de performance |
| `test` | Adição ou correção de testes |
| `chore` | Tarefas de manutenção (build, dependências, etc.) |
| `ci` | Mudanças em configurações de CI/CD |
| `build` | Mudanças no sistema de build ou dependências externas |

### **Escopo (`scope`)**

O escopo é opcional e indica a área do projeto afetada. Exemplos:

```
feat(auth): adiciona autenticação via OAuth2
fix(api): corrige validação de campos obrigatórios
docs(readme): atualiza instruções de instalação
refactor(database): extrai conexão para módulo separado
```

### **Descrição**

A descrição deve ser:
- **Curta** (idealmente até 72 caracteres)
- **No imperativo** ("adiciona", "corrige", "remove" — não "adicionado", "corrigido")
- **Em português ou inglês** — escolha um idioma e mantenha consistência no projeto

✅ **Correto:**
```
feat: adiciona validação de email no formulário
```

❌ **Incorreto:**
```
feat: adicionada validação de email no formulário
feat: Adiciona validação de email no formulário
Adiciona validação de email
```

### **Corpo (`body`)**

O corpo é opcional e usado para detalhar o *porquê* da mudança, não o *como*. Pode conter múltiplas linhas.

```
feat: adiciona cache em consultas ao banco

O banco estava sendo consultado a cada requisição,
causando lentidão em páginas com muitos dados.
O cache reduz o tempo de resposta em aproximadamente 60%.
```

### **Rodapé (`footer`)**

O rodapé é opcional e geralmente usado para:
- **Breaking changes** — indicar mudanças que quebram compatibilidade
- **Referências a issues** — fechar issues automaticamente

```
feat: altera formato da resposta da API

BREAKING CHANGE: O campo "nome" foi renomeado para "full_name".
A API antiga será descontinuada na versão 2.0.
```

```
fix: corrige cálculo de frete para regiões remotas

Closes #42
```

* * *

## **Exemplos Práticos**

### **feat (nova funcionalidade)**

```
feat: adiciona endpoint de recuperação de senha
feat(api): implementa paginação na listagem de usuários
feat: adiciona suporte a temas claro e escuro
```

### **fix (correção de bug)**

```
fix: corrige erro 500 ao acessar perfil sem foto
fix(auth): valida token expirado antes de redirecionar
fix: remove duplicação de registros na consulta
```

### **docs (documentação)**

```
docs: adiciona guia de contribuição
docs(api): documenta endpoints de autenticação
docs: corrige link quebrado no README
```

### **refactor (refatoração)**

```
refactor: extrai lógica de validação para módulo separado
refactor(database): unifica conexões em pool único
refactor: simplifica condicionais aninhadas
```

### **chore (manutenção)**

```
chore: atualiza dependências do projeto
chore: configura lint-staged para formatação automática
chore: remove arquivos não utilizados
```

### **BREAKING CHANGE**

Quando uma mudança quebra compatibilidade com versões anteriores, adicione `!` após o tipo/escopo ou use o rodapé:

```
feat!: altera estrutura da resposta da API
feat(auth)!: remove suporte a autenticação por token simples

BREAKING CHANGE: A partir desta versão, apenas OAuth2 é suportado.
```

* * *

## **Versionamento Semântico (SemVer)**

O Conventional Commits foi projetado para funcionar com [Semantic Versioning](https://semver.org/). A relação é direta:

| Commit | Versão |
|--------|--------|
| `fix` | **patch** (1.0.0 → 1.0.1) |
| `feat` | **minor** (1.0.0 → 1.1.0) |
| `BREAKING CHANGE` | **major** (1.0.0 → 2.0.0) |

Isso permite que ferramentas automatizadas determinem o próximo número de versão sem intervenção manual.

* * *

## **Boas Práticas**

### 1. **Escolha um idioma e mantenha consistência**

Times brasileiros geralmente preferem português. Times internacionais usam inglês. O importante é **não misturar**:

✅ **Consistente (português):**
```
feat: adiciona campo de telefone no cadastro
fix: corrige validação de CPF
docs: atualiza exemplo de uso da API
```

✅ **Consistente (inglês):**
```
feat: add phone field to registration form
fix: fix CPF validation
docs: update API usage example
```

### 2. **Use o imperativo**

O imperativo dá um tom de instrução direta: "faça isso". É o padrão recomendado pela própria especificação.

✅ `adiciona`, `corrige`, `remove`, `atualiza`
❌ `adicionado`, `corrigido`, `removido`, `atualizado`

### 3. **Limite a descrição a 72 caracteres**

Mensagens curtas são mais fáceis de ler em ferramentas como `git log --oneline`. Detalhes vão no corpo.

### 4. **Commits atômicos**

Cada commit deve representar **uma única mudança lógica**. Evite commits como "corrige vários bugs" ou "atualiza tudo".

### 5. **Explique o "porquê", não o "como"**

O código já mostra *como* foi feito. O corpo do commit deve explicar *por que* foi feito daquela forma.

* * *

## **Ferramentas**

### **commitlint**

Valida se suas mensagens seguem o padrão:

```bash
# Instalação
npm install -g @commitlint/cli @commitlint/config-conventional

# Configuração (.commitlintrc.json)
{
  "extends": ["@commitlint/config-conventional"]
}
```

### **commitizen**

Interface interativa para criar commits no formato correto:

```bash
npm install -g commitizen

# Inicializar no projeto
commitizen init cz-conventional-changelog --save-dev --save-exact

# Usar
git cz
```

### **standard-version**

Gera changelog e atualiza versão automaticamente:

```bash
npx standard-version
```

### **pre-commit hooks**

Integre com o [pre-commit](https://pre-commit.com/) que você já utiliza:

```yaml
# .pre-commit-config.yaml
repos:
  - repo: https://github.com/alessandrojcm/commitlint-pre-commit-hook
    rev: v9.16.0
    hooks:
      - id: commitlint
        stages: [commit-msg]
        additional_dependencies: ['@commitlint/config-conventional']
```

* * *

## **Conclusão**

O Conventional Commits é um padrão simples que traz disciplina e automatização para o desenvolvimento de software. Adotá-lo não exige grandes mudanças — apenas um pouco de prática nos primeiros dias.

Comece com o básico: use `feat`, `fix` e `docs` no dia a dia. Com o tempo, incorpore os outros tipos e ferramentas. O retorno em organização e produtividade compensa rapidamente.

### **Resumo rápido**

```
# Estrutura básica
tipo(escopo): descrição

# Exemplos
feat: adiciona funcionalidade X
fix: corrige bug Y
docs: atualiza documentação
refactor: melhora estrutura do código Z
feat!: mudança que quebra compatibilidade
```

* * *

## **Próximos Artigos da Série**

Este é o primeiro artigo de uma série sobre Git e boas práticas de desenvolvimento. Confira os próximos:

1. ✅ **Conventional Commits** — padrão para mensagens de commit (você está aqui)
2. ➡️ **Nomenclatura de Branches** — como nomear branches de forma consistente
3. ➡️ **Fluxos de Desenvolvimento** — Git Flow, GitHub Flow, Trunk-based e mais

Até lá!
