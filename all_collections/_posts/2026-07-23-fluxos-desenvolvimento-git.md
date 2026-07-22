---
layout: post
title:  'Fluxos de Desenvolvimento com Git: Git Flow, GitHub Flow e Mais'
date:   2026-07-23 20:00:00 -0300
categories: blog
tags: git, fluxos, git-flow, github-flow, trunk-based
---

***

# **Fluxos de Desenvolvimento com Git: Git Flow, GitHub Flow e Mais**

<div style="text-align: justify">
Este é o terceiro artigo da série sobre Git e boas práticas de desenvolvimento. Nos <a href="/posts/conventional-commits">artigos anteriores</a>, vimos como estruturar mensagens de commit com <strong>Conventional Commits</strong> e como nomear branches de forma consistente. Agora vamos juntar tudo e explorar os <strong>fluxos de desenvolvimento</strong> — os frameworks que definem como criar, usar e mesclar branches no dia a dia.
</div>

* * *

## **O que é um Fluxo de Desenvolvimento?**

Um fluxo de desenvolvimento (ou branching strategy) é um conjunto de regras que define:

- **Quais branches fixas** existem no repositório
- **Quando e como criar** branches temporárias
- **Como e quando fazer merge** entre branches
- **Como lidar** com correções urgentes e releases

Pense no fluxo como a **coreografia do time**: cada branch tem um papel, cada merge tem um momento certo. Sem um fluxo definido, o repositório vira uma bagunça — branches que nunca são mescladas, merges diretos na branch errada, conflitos constantes.

* * *

## **1. Git Flow**

Criado por [Vincent Driessen](https://nvie.com/posts/a-successful-git-branching-model/) em 2010, o Git Flow é o fluxo mais completo e estruturado. Foi durante muito tempo o padrão da indústria.

### **Estrutura**

```
main ─────●──────────────●──────────────●─────────
           \            /                /
develop ────●──●──●──●──●──●────────────●─────────
             \  /       \              /
feature/a ──●──●         \            /
                           \          /
release/v1.0 ──────────────●──●──────●
                                     \
hotfix/crash ─────────────────────────●──●──────
```

### **Branches**

| Branch | Tipo | Propósito |
|--------|------|-----------|
| `main` | Fixa | Código em produção, sempre estável |
| `develop` | Fixa | Integração de funcionalidades em desenvolvimento |
| `feature/*` | Temporária | Desenvolvimento de novas funcionalidades |
| `release/*` | Temporária | Preparação de uma nova versão |
| `hotfix/*` | Temporária | Correção urgente em produção |

### **Fluxo básico**

```bash
# 1. Criar uma feature a partir de develop
git checkout develop
git checkout -b feature/login-social

# 2. Trabalhar na feature (vários commits)
git add .
git commit -m "feat(login): adiciona botão de login social"

# 3. Finalizar a feature (merge em develop)
git checkout develop
git merge --no-ff feature/login-social
git branch -d feature/login-social

# 4. Preparar release
git checkout -b release/v1.2.0
# Ajustes de versão, changelog, etc.
git checkout main
git merge --no-ff release/v1.2.0
git tag v1.2.0
git checkout develop
git merge --no-ff release/v1.2.0
git branch -d release/v1.2.0

# 5. Hotfix (correção urgente)
git checkout -b hotfix/crash-login main
# Corrigir o bug
git checkout main
git merge --no-ff hotfix/crash-login
git tag v1.2.1
git checkout develop
git merge --no-ff hotfix/crash-login
git branch -d hotfix/crash-login
```

### **Quando usar**

✅ **Ideal para:**
- Projetos com ciclos de release definidos (semanal, quinzenal, mensal)
- Software que exige versionamento semântico rigoroso
- Times que precisam manter múltiplas versões em paralelo

❌ **Evitar quando:**
- O time é pequeno (1-3 pessoas)
- O deploy é contínuo (várias vezes ao dia)
- O projeto é simples (blog, site estático)

* * *

## **2. GitHub Flow**

Criado pelo GitHub como alternativa mais simples ao Git Flow. É o fluxo que o próprio GitHub usa internamente.

### **Estrutura**

```
main ──●──────────────●─────────●─────────●──
        \            /         /          /
feature ──●──●──●──●           /          /
                    \         /          /
fix ─────────────────●──●──●           /
                                        \
docs ────────────────────────────────────●──●
```

### **Branches**

| Branch | Tipo | Propósito |
|--------|------|-----------|
| `main` | Fixa | Única branch permanente, sempre deployável |
| `feature/*` | Temporária | Qualquer trabalho (features, fixes, docs, etc.) |

### **Regras**

1. Tudo que está em `main` está pronto para deploy
2. Para qualquer mudança, crie uma branch descritiva a partir de `main`
3. Faça commits regularmente e faça push da branch
4. Abra um Pull Request (PR) para discutir a mudança
5. Após revisão e aprovação, faça merge em `main`
6. Faça deploy imediatamente após o merge

### **Fluxo básico**

```bash
# 1. Criar branch a partir de main
git checkout main
git pull
git checkout -b feature/login-social

# 2. Trabalhar e commitar
git add .
git commit -m "feat(login): adiciona botão de login social"

# 3. Abrir Pull Request (via GitHub CLI)
gh pr create --title "feat: adiciona login social" --body "Descrição do PR"

# 4. Após revisão e merge, deletar branch
git checkout main
git pull
git branch -d feature/login-social
```

### **Quando usar**

✅ **Ideal para:**
- Deploy contínuo (várias vezes ao dia)
- Times pequenos e enxutos
- Projetos web e SaaS
- Projetos pessoais

❌ **Evitar quando:**
- Você precisa manter múltiplas versões em produção
- O ciclo de release é longo e planejado
- Você precisa de uma branch de integração separada

* * *

## **3. Trunk-based Development**

Popularizado por times como Google, Facebook e Netflix, o Trunk-based é o fluxo mais ágil e enxuto.

### **Estrutura**

```
main ──●──●──●──●──●──●──●──●──●──●──●──●──
        |     |     |     |     |
      br1   br2   br3   br4   br5  (branches curtas, horas/dias)
```

### **Branches**

| Branch | Tipo | Propósito |
|--------|------|-----------|
| `main` | Fixa | Única branch, todos trabalham nela |
| `curtas` | Temporária | Branches que duram horas, no máximo 1-2 dias |

### **Regras**

1. A branch `main` deve estar sempre verde (testes passando)
2. Branches são curtas — duram horas, no máximo 1-2 dias
3. Commits pequenos e frequentes diretamente em `main` (ou com PRs muito rápidos)
4. CI forte: cada commit é testado automaticamente
5. Feature flags para desabilitar funcionalidades incompletas em produção

### **Fluxo básico**

```bash
# 1. Sempre comece com main atualizada
git checkout main
git pull

# 2. Faça commits pequenos e diretos
git add .
git commit -m "feat: adiciona botão de login"
git push

# 3. Ou use branch curta (máximo 1 dia)
git checkout -b feature/login-button
git add .
git commit -m "feat: adiciona botão de login"
git push
# Abre PR, revisão rápida, merge imediato
```

### **Quando usar**

✅ **Ideal para:**
- Times maduros com CI/CD robusto
- Deploys múltiplos por dia
- Cultura de feature flags
- Times experientes com testes automatizados

❌ **Evitar quando:**
- O time não tem testes automatizados suficientes
- Não há cultura de CI/CD
- O processo de code review é lento

* * *

## **4. GitLab Flow**

O GitLab Flow é uma abordagem mais flexível que combina elementos do Git Flow com a simplicidade do GitHub Flow, adicionando branches de ambiente.

### **Estrutura**

```
main ──●──────────────●─────────●─────────●──
        \            /         /          \
feature ──●──●──●──●           /            \
                    \         /              \
staging ─────────────●──●──●──●──●────────────●──●──
                                                \
production ──────────────────────────────────────●──
```

### **Branches**

| Branch | Tipo | Propósito |
|--------|------|-----------|
| `main` | Fixa | Branch principal, código em desenvolvimento |
| `feature/*` | Temporária | Novas funcionalidades |
| `staging` | Fixa (opcional) | Ambiente de homologação |
| `production` | Fixa (opcional) | Ambiente de produção |

### **Quando usar**

✅ **Ideal para:**
- Projetos com múltiplos ambientes (dev, staging, production)
- Times que querem um meio-termo entre Git Flow e GitHub Flow
- Projetos que precisam de aprovação em ambiente de staging antes de ir para produção

* * *

## **Tabela Comparativa**

| Característica | Git Flow | GitHub Flow | Trunk-based | GitLab Flow |
|----------------|----------|-------------|-------------|-------------|
| **Branches fixas** | `main`, `develop` | `main` | `main` | `main`, `staging`, `production` |
| **Branches temporárias** | `feature/`, `release/`, `hotfix/` | Qualquer nome | Curtas (horas) | `feature/` |
| **Complexidade** | Alta | Baixa | Média | Média |
| **Deploy** | Por release | Contínuo | Contínuo | Por ambiente |
| **Ideal para** | Releases planejadas | Deploy contínuo | Times maduros | Múltiplos ambientes |
| **Versionamento** | SemVer rigoroso | Tags opcionais | Tags opcionais | Tags opcionais |

* * *

## **Qual Fluxo Escolher?**

### **Para projetos pessoais (blog, side projects)**

**Recomendação: GitHub Flow**

É simples, direto e não adiciona complexidade desnecessária. Apenas `main` + branches temporárias. Perfeito para seu blog e projetos menores.

```bash
# Fluxo ideal para projetos pessoais
main ──●──────────────●─────────●──
        \            /          /
feature ──●──●──●──●           /
                    \         /
fix ─────────────────●──●──●
```

### **Para projetos com releases (bibliotecas, APIs, apps)**

**Recomendação: Git Flow**

Se você precisa versionar releases, manter changelog e ter controle sobre o que vai para produção, o Git Flow oferece a estrutura necessária.

### **Para times experientes com CI forte**

**Recomendação: Trunk-based**

Se você tem testes automatizados, CI/CD maduro e cultura de feature flags, o Trunk-based maximiza a velocidade de entrega.

* * *

## **Integrando com Conventional Commits e Nomenclatura de Branches**

Agora que temos os três artigos, veja como tudo se conecta:

```
Conventional Commits  →  feat(login): adiciona autenticação OAuth2
                            ↓
Nomenclatura branches  →  feature/login-social
                            ↓
Fluxo de desenvolvimento →  GitHub Flow: branch → PR → merge → deploy
```

**Exemplo completo no GitHub Flow:**

```bash
# 1. Cria branch com nomenclatura padronizada
git checkout -b feature/login-social

# 2. Faz commits no padrão Conventional Commits
git commit -m "feat(login): adiciona botão de login social"
git commit -m "feat(login): implementa callback OAuth2"
git commit -m "fix(login): corrige redirect após autenticação"

# 3. Abre Pull Request
gh pr create

# 4. Após revisão, merge em main
git checkout main
git merge feature/login-social

# 5. Deleta a branch
git branch -d feature/login-social
```

* * *

## **Conclusão**

Não existe um fluxo "certo" ou "errado" — existe o fluxo **adequado para seu contexto**. O importante é:

1. **Escolher um fluxo** e segui-lo consistentemente
2. **Documentar** o fluxo escolhido para o time
3. **Revisar periodicamente** se o fluxo ainda faz sentido

Comece simples (GitHub Flow) e evolua conforme a necessidade. É melhor um fluxo simples seguido à risca do que um fluxo complexo que ninguém segue.

### **Resumo rápido**

```
GitHub Flow    → Simples, deploy contínuo, projetos pessoais
Git Flow       → Completo, releases versionadas, times maiores
Trunk-based    → Ágil, CI forte, times maduros
GitLab Flow    → Flexível, múltiplos ambientes
```

* * *

Com este artigo, encerramos a trilogia inicial da série sobre Git:

1. ✅ **Conventional Commits** — padrão para mensagens de commit
2. ✅ **Nomenclatura de Branches** — organização e consistência
3. ✅ **Fluxos de Desenvolvimento** — estratégias de branching

Fique ligado para os próximos artigos da série!
