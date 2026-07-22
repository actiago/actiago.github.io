---
layout: post
title:  'Convenção de Nomenclatura de Branches: Organizando seu Fluxo'
date:   2026-07-22 20:00:00 -0300
categories: blog
tags: git, branches, boas-praticas
---

***

# **Convenção de Nomenclatura de Branches: Organizando seu Fluxo**

<div style="text-align: justify">
Este é o segundo artigo da série sobre Git e boas práticas de desenvolvimento. No <a href="/posts/conventional-commits">artigo anterior</a>, vimos como estruturar mensagens de commit com o Conventional Commits. Agora vamos organizar outro aspecto fundamental: <strong>a nomenclatura das branches</strong>.

Uma boa convenção de branches torna o histórico do repositório legível, facilita a automação de CI/CD e prepara o terreno para fluxos de desenvolvimento mais complexos — que serão o tema do próximo artigo.
</div>

* * *

## **Por que padronizar o nome das branches?**

Sem um padrão, é comum encontrar branches como:

```
corrige-bug
teste
nova-funcionalidade-do-modulo-x-v2-final
arruma-tudo
```

Isso funciona para projetos individuais, mas conforme o time cresce ou o projeto ganha complexidade, a bagunça aparece. Um padrão traz:

| Benefício | Descrição |
|-----------|-----------|
| **Clareza** | Qualquer pessoa entende o propósito da branch só de ler o nome |
| **Automação** | Scripts de CI/CD podem agir de forma diferente por tipo de branch |
| **Organização** | Facilita limpar branches antigas e identificar o que está em andamento |
| **Consistência** | O repositório fica profissional e padronizado |

* * *

## **Estrutura Recomendada**

A convenção mais adotada atualmente segue este formato:

```
<tipo>/<descricao>
```

Onde:
- **`tipo`** — categoriza a natureza do trabalho (mesma lógica dos tipos de commit!)
- **`descricao`** — identifica o assunto de forma clara e concisa

### **Tipos de branch**

Os tipos se alinham diretamente com os tipos do Conventional Commits que vimos no artigo anterior:

| Tipo | Quando usar | Exemplo |
|------|-------------|---------|
| `feature/` | Nova funcionalidade | `feature/login-social` |
| `fix/` | Correção de bug | `fix/validacao-cpf` |
| `docs/` | Documentação | `docs/api-endpoints` |
| `refactor/` | Refatoração de código | `refactor/database-module` |
| `chore/` | Manutenção | `chore/atualizar-dependencias` |
| `hotfix/` | Correção urgente em produção | `hotfix/crash-login` |
| `release/` | Preparação de release | `release/v1.2.0` |
| `test/` | Adição ou correção de testes | `test/cobertura-auth` |

> **Nota:** `hotfix/` e `release/` são mais comuns em fluxos como Git Flow. No GitHub Flow, geralmente só usamos `feature/`, `fix/` e `docs/`.

### **Descrição**

A descrição deve ser:
- **Em minúsculas** — evite Maiúsculas
- **Sem acentos ou caracteres especiais** — `validacao-cpf` em vez de `validação-cpf`
- **Usando hífen (`-`) como separador** entre palavras
- **Curta e significativa** — o suficiente para identificar o propósito

✅ **Correto:**
```
feature/login-social
fix/validacao-cpf
docs/api-endpoints
refactor/database-module
```

❌ **Incorreto:**
```
feature/LoginSocial
fix/validacao_do_cpf
docs/api_endpoints
refactor/ModuloDatabase
feature/ADICIONA-LOGIN
```

* * *

## **Exemplos Práticos**

### **feature/** — novas funcionalidades

```
feature/autenticacao-oauth2
feature/pagina-perfil-usuario
feature/upload-imagens
feature/api-paginacao-usuarios
```

### **fix/** — correções

```
fix/correcao-calculo-frete
fix/validacao-email-duplicado
fix/redirect-pos-login
fix/tratamento-erro-500
```

### **docs/** — documentação

```
docs/api-endpoints
docs/guia-contribuicao
docs/arquitetura-sistema
docs/readme-instalacao
```

### **refactor/** — refatorações

```
refactor/extrair-modulo-auth
refactor/unificar-conexoes-banco
refactor/simplificar-condicionais
refactor/migrar-para-typescript
```

### **chore/** — manutenção

```
chore/atualizar-dependencias
chore/configurar-eslint
chore/remover-arquivos-obsoletos
chore/adicionar-pre-commit
```

### **hotfix/** — correções urgentes

```
hotfix/crash-servidor-producao
hotfix/vazamento-dados-log
hotfix/correcao-sql-injection
```

### **release/** — preparação de versão

```
release/v1.0.0
release/v1.2.0
release/v2.0.0
```

* * *

## **Branches Fixas vs. Temporárias**

É importante entender que nem todas as branches são iguais:

### **Branches fixas (permanentes)**

São as branches que sempre existem no repositório:

| Branch | Propósito |
|--------|-----------|
| `main` | Código estável, pronto para produção |
| `develop` | (Git Flow) Integração de funcionalidades em desenvolvimento |

### **Branches temporárias**

São criadas para um trabalho específico e removidas após o merge:

```
feature/login-social   → merge em main/develop → remover
fix/validacao-cpf      → merge em main/develop → remover
release/v1.2.0         → merge em main e develop → remover
hotfix/crash-login     → merge em main e develop → remover
```

> **Regra de ouro:** Uma branch temporária deve viver o mínimo necessário. Quanto mais tempo uma branch existe, maior a chance de conflitos e retrabalho.

* * *

## **Boas Práticas**

### 1. **Alinhe com os tipos de commit**

Se você usa Conventional Commits (como vimos no artigo anterior), use os mesmos tipos para branches. A consistência entre commit e branch facilita a vida de todos:

```
Branch: feature/login-social
Commit: feat(login): adiciona autenticação via Google e GitHub

Branch: fix/validacao-cpf
Commit: fix: corrige validação de CPF para aceitar números formatados
```

### 2. **Seja descritivo, mas conciso**

O nome da branch deve dar contexto suficiente sem ser um parágrafo:

✅ `feature/upload-imagens-perfil`
❌ `feature/adiciona-funcionalidade-de-upload-de-imagens-de-perfil`

### 3. **Inclua ID de issue quando aplicável**

Se você usa issues (GitHub, Jira, etc.), incluir o ID ajuda na rastreabilidade:

```
feature/#42-login-social
fix/PROJ-123-validacao-cpf
```

### 4. **Remova branches após o merge**

Branches antigas poluem o repositório. Configure seu Git para limpar automaticamente:

```bash
# Após fazer merge via PR, delete localmente
git branch -d feature/login-social

# Remover referências remotas órfãs
git fetch --prune
```

### 5. **Use o mesmo padrão em todos os projetos**

A consistência entre projetos ajuda você e seu time a não precisar pensar em qual padrão usar em cada repositório.

* * *

## **Resumo Rápido**

```
# Estrutura
<tipo>/<descricao>

# Exemplos
feature/login-social
fix/validacao-cpf
docs/api-endpoints
refactor/database-module
chore/atualizar-dependencias
hotfix/crash-servidor
release/v1.2.0

# Regras
✅ minúsculas, hífen entre palavras, sem acentos
✅ descrição curta e significativa
✅ mesmo tipo do Conventional Commits
❌ sem Maiúsculas, underscores, acentos
```

* * *

## **Próximos Artigos da Série**

Este é o segundo artigo da série sobre Git e boas práticas de desenvolvimento. Confira todos:

1. ✅ **Conventional Commits** — padrão para mensagens de commit
2. ✅ **Nomenclatura de Branches** — como nomear branches de forma consistente (você está aqui)
3. ➡️ **Fluxos de Desenvolvimento** — Git Flow, GitHub Flow, Trunk-based e mais

Até lá!
