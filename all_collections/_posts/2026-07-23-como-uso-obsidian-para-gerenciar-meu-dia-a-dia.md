---
layout: post
title:  'Como Uso o Obsidian para Gerenciar Meu Dia a Dia'
date:   2026-07-23 20:00:00 -0300
categories: blog
tags: obsidian, produtividade, daily-notes, templater, second-brain, gtd
---

***

# **Como Uso o Obsidian para Gerenciar Meu Dia a Dia**

<div style="text-align: justify">
Há algum tempo, migrei minha organização pessoal e profissional para o <strong>Obsidian</strong>. Não foi uma decisão trivial — já passei por Notion, Evernote, Google Keep, e até cadernos físicos. O que me fez ficar no Obsidian foi a combinação de <strong>arquivos markdown locais</strong>, <strong>plugins poderosos</strong> e a <strong>liberdade</strong> de ter meus dados em formato aberto.

Neste post, vou compartilhar como estruturei meu vault, quais plugins uso no dia a dia, e — principalmente — como criei um sistema de <strong>Daily Notes</strong> que me ajuda a não perder o fio da meada entre um dia e outro.
</div>

* * *

## **Filosofia: Simplicidade com Poder**

Antes de mostrar a estrutura, vale explicar a filosofia:

- **Tudo é markdown** — Se o Obsidian um dia acabar, meus arquivos continuam legíveis em qualquer editor de texto
- **Dados locais primeiro** — Nenhuma informação sensível vai para a nuvem sem meu controle
- **Automação só quando necessário** — Umo Templater para tarefas repetitivas, mas sem exageros
- **Tags como categorias leves** — Pastas para organização macro, tags para contextos e temas

* * *

## **Plugins que Utilizo**

### Core Plugins (nativos do Obsidian)

| Plugin | Para que uso |
|--------|-------------|
| **Daily Notes** | Base do sistema — cada dia uma nota |
| **Templates** | Integrado com Templater para criar notas padronizadas |
| **Graph** | Visualizar conexões entre notas |
| **Backlinks** | Navegar entre notas relacionadas |
| **Canvas** | Mapas mentais e brainstorming visual |
| **Tag Pane** | Navegar por tags |
| **Bookmarks** | Notas e páginas que acesso com frequência |
| **Outgoing Links** | Ver para onde uma nota aponta |
| **File Recovery** | Segurança contra perda de dados |

### Community Plugins

| Plugin | Finalidade |
|--------|-----------|
| **Templater** | Templates com scripts JavaScript — o coração da automação |
| **Tasks** | Gerenciamento de tarefas com checkboxes estilizados |
| **Kanban** | Quadros visuais para projetos |
| **Copilot** | Assistente IA integrado ao vault (DeepSeek, Gemini, Claude) |
| **Smart Second Brain** | Outro assistente IA, usando DeepSeek R1 local via Ollama |
| **Minimal Theme Settings** | Ajustes finos de aparência |
| **Icon Folder** | Ícones personalizados para pastas e arquivos |

* * *

## **Daily Notes — O Coração do Sistema**

O Daily Note é a primeira coisa que vejo ao abrir o Obsidian. Ele funciona como um **painel de controle** do dia.

### Template da Daily Note

O template é processado pelo **Templater** toda vez que crio uma nova nota diária. Aqui está a estrutura completa:

```markdown
---
created: <% tp.date.now("DD-MM-YYYY") %>
tags: [daily, <% tp.date.now("dddd") %>]
---

# 📅 <% tp.date.now("DD-MM-YYYY") %> - <% tp.date.now("dddd") %>

## 🎯 Foco do Dia
<!-- Defina 1-3 objetivos principais para hoje -->
- [ ]

---

## 🔄 Tarefas Pendentes do Dia Anterior
<!-- Tarefas não concluídas do dia anterior serão listadas aqui automaticamente -->
[SCRIPT: carrega tarefas pendentes do dia anterior]

---

## 📝 Anotações do Dia
<!-- Espaço livre para anotações ao longo do dia -->

---

## ✅ Tarefas do Dia

### 💼 #trabalho
- [ ]

### 🏠 #casa
- [ ]

### 💪 #saúde
- [ ]

### 📚 #estudos
- [ ]

### 🎯 #projetos
- [ ]

---

## 📌 Notas Rápidas
<!-- Ideias ou lembretes que surgirem durante o dia -->
```

### Seção por seção

**Front matter:** Data de criação no formato `DD-MM-YYYY` e tags automáticas (ex: `daily, Thursday`). Isso permite buscar todas as daily notes de uma quinta-feira, por exemplo.

**🎯 Foco do Dia:** 1 a 3 objetivos principais. A ideia é não poluir — se tudo der errado no dia, pelo menos essas três coisas foram feitas.

**🔄 Tarefas Pendentes do Dia Anterior:** Esta é a seção mais interessante — e a que mais me ajuda. Explico em detalhes abaixo.

**📝 Anotações do Dia:** Espaço livre para anotações que surgem durante o dia. Reuniões, ideias, links interessantes.

**✅ Tarefas do Dia:** Tarefas organizadas por contexto usando tags (`#trabalho`, `#casa`, `#saúde`, `#estudos`, `#projetos`). Cada seção tem seu emoji para identificação visual rápida.

**📌 Notas Rápidas:** Um "rascunho" para ideias soltas que ainda não merecem uma nota própria.

* * *

## **O Script Templater — Como as Tarefas Pendentes São Carregadas**

O grande diferencial do meu sistema é o **script Templater** que carrega automaticamente as tarefas não concluídas do dia anterior. Vou explicar linha a linha como ele funciona.

### O Script Completo

```javascript
<%*
// ============================================================
// SCRIPT: Carregar tarefas não concluídas do dia anterior
// ============================================================

// 1. Calcular a data do dia anterior no formato YYYY-MM-DD
const date = new Date();
date.setDate(date.getDate() - 1);
const ano = date.getFullYear();
const mes = String(date.getMonth() + 1).padStart(2, '0');
const dia = String(date.getDate()).padStart(2, '0');
const diaAnterior = `${ano}-${mes}-${dia}`;

// 2. Obter o arquivo do dia anterior usando a API do Obsidian
try {
    const vault = app.vault;
    const filePath = `Daily/${diaAnterior}.md`;
    const file = vault.getAbstractFileByPath(filePath);

    if (file) {
        const content = await vault.read(file);

        // 3. Extrair todas as tarefas não concluídas (- [ ])
        const taskRegex = /^- \[ \] .+$/gm;
        const tasks = [];
        let match;

        while ((match = taskRegex.exec(content)) !== null) {
            tasks.push(match[0]);
        }

        // 4. Separar tarefas por tags
        const tasksPorTag = {};
        const tasksSemTag = [];

        tasks.forEach(task => {
            const tags = task.match(/#[a-zA-ZÀ-ÿ0-9_-]+/g);

            if (tags && tags.length > 0) {
                tags.forEach(tag => {
                    if (!tasksPorTag[tag]) {
                        tasksPorTag[tag] = [];
                    }
                    tasksPorTag[tag].push(task);
                });
            } else {
                tasksSemTag.push(task);
            }
        });

        // 5. Exibir as tarefas encontradas
        if (tasks.length > 0) {
            tR += `> **${tasks.length} tarefa(s) pendente(s) do dia ${diaAnterior}**\n\n`;

            for (const [tag, tagTasks] of Object.entries(tasksPorTag)) {
                tR += `**${tag}**\n`;
                tagTasks.forEach(task => {
                    tR += `${task}\n`;
                });
                tR += '\n';
            }

            if (tasksSemTag.length > 0) {
                tR += `**📋 Gerais**\n`;
                tasksSemTag.forEach(task => {
                    tR += `${task}\n`;
                });
                tR += '\n';
            }
        } else {
            tR += `*Nenhuma tarefa pendente do dia anterior.* 🎉\n\n`;
        }
    } else {
        tR += `*Nenhuma nota encontrada para o dia anterior.*\n\n`;
    }
} catch (error) {
    tR += `*Erro ao carregar tarefas: ${error.message}*\n\n`;
}
%>
```

### Explicação Passo a Passo

**Passo 1 — Calcular a data anterior:**
```javascript
const date = new Date();
date.setDate(date.getDate() - 1);
```
Pega a data atual e subtrai 1 dia. Depois formata para `YYYY-MM-DD` (o formato usado nos nomes dos arquivos de daily note).

**Passo 2 — Acessar o arquivo:**
```javascript
const vault = app.vault;
const filePath = `Daily/${diaAnterior}.md`;
const file = vault.getAbstractFileByPath(filePath);
```
Usa a **API do Obsidian** (`app.vault`) para acessar o arquivo da daily anterior. Se o arquivo não existir (por exemplo, se ontem foi um dia que não abri o Obsidian), o script simplesmente avisa e segue em frente.

**Passo 3 — Extrair tarefas não concluídas:**
```javascript
const taskRegex = /^- \[ \] .+$/gm;
```
Uma expressão regular que busca linhas começando com `- [ ]` (tarefas não concluídas). A flag `gm` significa "global" (pegar todas) e "multiline" (considerar cada linha).

**Passo 4 — Agrupar por tags:**
```javascript
const tags = task.match(/#[a-zA-ZÀ-ÿ0-9_-]+/g);
```
Para cada tarefa encontrada, extrai todas as tags (palavras começando com `#`). Depois agrupa as tarefas por tag em um dicionário. Tarefas sem tag vão para uma lista separada.

**Passo 5 — Renderizar no template:**
```javascript
tR += `> **${tasks.length} tarefa(s) pendente(s) do dia ${diaAnterior}**\n\n`;
```
A variável `tR` (template Result) é onde o Templater espera o conteúdo gerado. O script monta o texto organizado: primeiro as tarefas agrupadas por tag, depois as tarefas sem tag.

### Resultado Final na Daily Note

Quando abro uma nova daily, vejo algo como:

```
> **12 tarefa(s) pendente(s) do dia 2026-07-22**

**#trabalho**
- [ ] Revisar PR do projeto X #trabalho
- [ ] Preparar apresentação da sprint #trabalho

**#casa**
- [ ] Comprar material de limpeza #casa

**#estudos**
- [ ] Terminar módulo de Kubernetes #estudos
```

Isso me dá um **contexto imediato** do que ficou pendente, sem precisar navegar até a nota anterior.

* * *

## **Tasks Plugin — Gerenciamento de Tarefas**

O plugin **Tasks** estende o markdown padrão com checkboxes mais poderosos. Uso quatro estados:

| Símbolo | Status | Atalho |
|---------|--------|--------|
| `[ ]` | A fazer | Padrão |
| `[/]` | Em andamento | Mostra que já comecei |
| `[x]` | Concluído | Marca como done com data |
| `[-]` | Cancelado | Quando a tarefa perdeu o sentido |

O plugin também permite:
- **Datas de vencimento** com `📅 2026-07-25`
- **Prioridades** com `🔺` (alta), `⏫` (média), `🔽` (baixa)
- **Recorrência** com `🔁 every week`
- **Consultas** para listar tarefas de várias notas em um só lugar

```markdown
- [ ] Configurar CI/CD do projeto 📅 2026-07-30 🔺
- [/] Escrever documentação da API 🔁 every week
- [x] Corrigir bug no login ✅ 2026-07-23
- [-] Migrar servidor antigo (cancelado)
```

* * *

## **Kanban — Projetos Visuais**

Para projetos que precisam de uma visão mais visual, uso o plugin **Kanban**. Ele cria quadros no formato canvas do Obsidian, com colunas que representam estágios do fluxo:

```
┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│   A Fazer    │  │  Em Andamento │  │  Em Revisão  │  │    Feito     │
├──────────────┤  ├──────────────┤  ├──────────────┤  ├──────────────┤
│ Tarefa 1     │  │ Tarefa 3     │  │ Tarefa 5     │  │ Tarefa 7     │
│ Tarefa 2     │  │ Tarefa 4     │  │              │  │ Tarefa 8     │
└──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘
```

Uso Kanban principalmente para:
- **Planejamento de sprints** pessoais
- **Roadmap de projetos** do homelab
- **Lista de compras** compartilhada com a parceira

* * *

## **Copilot + Smart Second Brain — IA no Vault**

Tenho dois plugins de IA integrados ao vault, cada um com seu propósito:

### Copilot

O **Copilot** é meu assistente principal. Uso ele para:
- **Resumir notas** longas
- **Gerar glossários** a partir de termos técnicos
- **Traduzir** conteúdo entre idiomas
- **Responder perguntas** sobre o conteúdo do vault (RAG)

Ele está configurado com o modelo **DeepSeek Chat** como padrão, mas também tenho Gemini, Claude e GPT disponíveis. As conversas são salvas automaticamente em `copilot/copilot-conversations/`.

### Smart Second Brain

O **Smart Second Brain** é um assistente complementar que roda **DeepSeek R1 (7B) localmente** via Ollama. Uso ele para:
- Consultas que não quero enviar para APIs externas
- Testes com modelos locais
- Conversas que exigem mais privacidade

O embedding é feito com `nomic-embed-text` também local, com threshold de similaridade de 0.75.

* * *

## **Como Tudo se Conecta — Meu Fluxo Diário**

### Manhã

1. Abro o Obsidian e vejo a **Daily Note do dia**
2. O script já trouxe as tarefas pendentes do dia anterior
3. Reviso o **Foco do Dia** e ajusto se necessário
4. Distribuo as tarefas pendentes nas seções corretas

### Durante o Dia

1. **Anotações rápidas** vão para a seção 📝 Anotações do Dia
2. **Tarefas novas** são adicionadas nas seções com tags
3. **Ideias soltas** vão para 📌 Notas Rápidas
4. Se uma ideia merece uma nota própria, crio um link `[[nome-da-nota]]`

### Fim do Dia

1. Reviso o que foi feito
2. Marco tarefas concluídas com `[x]`
3. O que não foi feito, fica como `[ ]` — e o script vai carregar amanhã

### Ciclo se Repete

No dia seguinte, o script do Templater:
1. Lê a daily de ontem
2. Extrai tudo que ainda está `[ ]`
3. Agrupa por tags
4. Insere na nova daily

**Resultado:** Nada se perde. Se uma tarefa ficou pendente por 15 dias, ela vai aparecer 15 vezes até ser concluída ou cancelada.

* * *

## **Configuração do Templater**

Para quem quiser replicar, aqui estão as configurações do Templater que uso:

```json
{
  "command_timeout": 5,
  "templates_folder": "templates",
  "trigger_on_file_creation": true,
  "auto_jump_to_cursor": false,
  "enable_system_commands": false,
  "startup_templates": ["templates/Daily_Note.md"],
  "syntax_highlighting": true
}
```

O segredo está em:
- **`trigger_on_file_creation: true`** — O template é executado automaticamente ao criar uma nova nota
- **`startup_templates`** — O template da daily é carregado na inicialização
- **`templates_folder`** — Todos os templates ficam organizados na pasta `templates/`

* * *

## **E a Privacidade?**

Uma preocupação legítima ao usar um sistema como esse é: **e se meus dados vazarem?**

Minhas abordagens:

1. **Tudo é local** — O vault está no meu computador, não em servidores de terceiros
2. **Versionamento seletivo** — Uso Git apenas para notas que quero compartilhar (como as que viram posts do blog)
3. **Sem nuvem obrigatória** — Se uso sincronização, é via SyncThing ou Git privado, nunca serviços que escaneiam o conteúdo
4. **Dados sensíveis** — Notas com senhas, tokens ou informações pessoais ficam em um vault separado

* * *

## **Conclusão**

O Obsidian me deu o equilíbrio perfeito entre **simplicidade** e **poder**. Com markdown puro, alguns plugins bem escolhidos e um template inteligente, criei um sistema que:

- **Me poupa tempo** — não preciso reescrever tarefas pendentes todo dia
- **Me dá contexto** — ao abrir o Obsidian, já sei onde parei
- **É flexível** — posso adaptar para qualquer metodologia (GTD, Pomodoro, Kanban)
- **É durável** — meus dados estão em formato aberto e portável

O melhor de tudo: comecei simples e fui adicionando complexidade só quando senti necessidade. Meu conselho é: **comece com o template básico, use por uma semana, e só então adicione o que sentir falta.**

### Links Úteis

- [Obsidian](https://obsidian.md/)
- [Templater Plugin](https://github.com/SilentVoid13/Templater)
- [Tasks Plugin](https://github.com/obsidian-tasks-group/obsidian-tasks)
- [Copilot Plugin](https://github.com/logancyang/obsidian-copilot)

***

*Este post foi escrito no Obsidian e publicado no blog usando o fluxo descrito no post anterior sobre [GitHub Flow](/posts/fluxos-desenvolvimento-git).*
