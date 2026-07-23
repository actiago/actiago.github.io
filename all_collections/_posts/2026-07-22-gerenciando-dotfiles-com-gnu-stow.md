---
layout: post
title:  'Gerenciando Dotfiles com GNU Stow'
date:   2026-07-22 20:00:00 -0300
categories: blog
tags: dotfiles, gnu-stow, symlinks, produtividade, linux
---

***

# **Gerenciando Dotfiles com GNU Stow**

<div style="text-align: justify">
Se você é como eu, acumula configurações do terminal, editor, git e outras ferramentas ao longo dos anos. Manter tudo versionado e sincronizado entre máquinas pode virar uma bagunça — até você descobrir o <strong>GNU Stow</strong>.
</div>

* * *

## **O Problema**

Todo usuário de Linux tem seus dotfiles — arquivos de configuração que começam com ponto (`.bashrc`, `.gitconfig`, `.vimrc`, etc.). Com o tempo, você:

- Cria aliases e funções úteis no shell
- Personaliza o editor ao seu gosto
- Configura o git com seus aliases favoritos
- Ajusta o tmux, alacritty, e outras ferramentas

O problema é: **como manter tudo isso versionado e fácil de instalar em outra máquina?**

Algumas abordagens comuns:

1. **Cópia manual** — frágil, você esquece o que copiou
2. **Script que copia tudo** — funcional, mas difícil de atualizar
3. **Symlinks manuais** — trabalhoso e propenso a erros
4. **GNU Stow** — a solução elegante ✨

* * *

## **O que é o GNU Stow?**

O [GNU Stow](https://www.gnu.org/software/stow/) é um gerenciador de symlinks. Ele foi criado originalmente para gerenciar pacotes instalados a partir do código fonte, mas se tornou uma ferramenta popular para gerenciar dotfiles.

A ideia é simples: você organiza seus dotfiles em uma estrutura de diretórios e o Stow cria os symlinks na `$HOME` automaticamente.

### **Como funciona**

```
~/dotfiles/
├── bash/
│   └── .bashrc
├── git/
│   ├── .gitconfig
│   └── .gitconfig-github-example
├── zsh/
│   ├── .zshrc
│   └── .p10k.zsh
└── alacritty/
    └── .config/
        └── alacritty/
            ├── alacritty.toml
            └── gruvebox_material.toml
```

Quando você executa `stow bash`, o Stow cria um symlink:

```
~/.bashrc → ~/dotfiles/bash/.bashrc
```

O segredo é que o Stow **reproduz a estrutura de diretórios** dentro da `$HOME`. Se você tem `alacritty/.config/alacritty/alacritty.toml`, o Stow cria `~/.config/alacritty/alacritty.toml` apontando para o arquivo no repositório.

* * *

## **Vantagens do Stow**

| Característica | Benefício |
|---|---|
| **Simplicidade** | Um comando instala, um comando remove |
| **Organização** | Cada ferramenta em seu próprio diretório |
| **Instalação seletiva** | Instale apenas o que você usa |
| **Idempotente** | Pode executar várias vezes sem efeitos colaterais |
| **Sem duplicação** | Os arquivos vivem em um único lugar |
| **Fácil de versionar** | O repositório é seu source of truth |

* * *

## **Meu Setup: dotfiles com Stow**

Meu repositório de dotfiles está disponível no GitHub:

🔗 **[github.com/actiago/dotfiles](https://github.com/actiago/dotfiles)**

### **Estrutura**

```
dotfiles/
├── install.sh              # Script de instalação
├── bash/                   # Configurações do Bash
│   └── .bashrc
├── git/                    # Configurações do Git
│   ├── .gitconfig
│   └── .gitconfig-github-example
├── zsh/                    # Configurações do Zsh
│   ├── .zshrc
│   └── .p10k.zsh
├── alacritty/              # Configurações do Alacritty
│   └── .config/alacritty/
│       ├── alacritty.toml
│       └── gruvebox_material.toml
├── tmux/                   # Configurações do Tmux
│   └── .tmux.conf
├── vim/                    # Configurações do Vim
│   └── .vimrc
└── nvim/                   # Configurações do Neovim
    └── .config/nvim/init.vim
```

### **O Script de Instalação**

Criei um `install.sh` que automatiza todo o processo:

```bash
#!/bin/bash
set -euo pipefail

DOTFILES_DIR="$(cd "$(dirname "$0")" && pwd)"
PACKAGES=("alacritty" "bash" "git" "nvim" "tmux" "vim" "zsh")

# Faz backup de arquivos existentes antes de criar symlinks
backup_existing() {
    local target="$1"
    if [ -e "$target" ] && [ ! -L "$target" ]; then
        local backup="${target}.backup.$(date +%Y%m%d%H%M%S)"
        mv "$target" "$backup"
    fi
}

# Instala pacotes com stow
install_packages() {
    for pkg in "$@"; do
        # Backup dos arquivos existentes
        while IFS= read -r -d '' file; do
            relative_path="${file#$DOTFILES_DIR/$pkg/}"
            target="$HOME/$relative_path"
            backup_existing "$target"
        done < <(find "$DOTFILES_DIR/$pkg" -type f -print0)

        # Criar symlinks com stow
        stow --restow --target="$HOME" --dir="$DOTFILES_DIR" "$pkg"
    done
}
```

### **Uso**

```bash
# Instalar todos os pacotes
./install.sh

# Instalar apenas alguns pacotes
./install.sh bash git zsh

# Ver ajuda
./install.sh --help
```

### **Comandos úteis do Stow**

```bash
# Instalar um pacote (criar symlinks)
stow -d ~/dotfiles -t $HOME bash

# Remover um pacote (remover symlinks)
stow -D -d ~/dotfiles -t $HOME bash

# Atualizar após alterações
stow --restow -d ~/dotfiles -t $HOME bash
```

* * *

## **Segurança: Backup Automático**

Uma preocupação comum é: "e se eu já tiver meus dotfiles configurados?"

O script resolve isso com **backup automático**. Antes de criar qualquer symlink, ele verifica se o arquivo de destino já existe e não é um symlink. Se for o caso, ele renomeia o arquivo adicionando um timestamp:

```
~/.bashrc → ~/.bashrc.backup.20260722200000
```

Assim, **nada é perdido**. Se você quiser voltar atrás, basta remover o symlink e restaurar o backup.

* * *

## **Dicas e Boas Práticas**

### **1. Organize por ferramenta**

Cada diretório no repositório corresponde a uma ferramenta. Isso permite instalar apenas o que você usa:

```bash
# Se você não usa Neovim, simplesmente não instale
./install.sh bash git zsh alacritty
```

### **2. Use includeIf para configurações condicionais**

No git, você pode usar `includeIf` para ter configurações diferentes por diretório:

```ini
[user]
    name = Tiago Amaral
    email = tiagoamaralc@gmail.com

[includeIf "gitdir:~/projetos/github/"]
    path = ~/.gitconfig-github

[includeIf "gitdir:~/projetos/gitlab/"]
    path = ~/.gitconfig-gitlab
```

Isso permite ter um `.gitconfig` principal e configurações específicas para GitHub, GitLab, trabalho, etc.

### **3. Versionamento Semântico**

Use tags para marcar versões estáveis do seu conjunto de dotfiles:

```bash
git tag v1.0.0
git push --tags
```

### **4. Teste em uma máquina nova**

A melhor forma de validar seu setup é clonar o repositório em uma máquina nova e executar o install.sh. Se funcionar, está pronto.

* * *

## **Conclusão**

O GNU Stow transforma o gerenciamento de dotfiles de uma tarefa tediosa em algo simples e elegante. Com uma estrutura organizada e um script de instalação, você pode:

- ✅ **Versionar** todas as suas configurações
- ✅ **Instalar** em qualquer máquina com um comando
- ✅ **Manter** cada ferramenta em seu próprio diretório
- ✅ **Fazer backup** automático dos arquivos existentes
- ✅ **Reverter** facilmente quando necessário

Se você ainda gerencia seus dotfiles na base da cópia manual, experimente o Stow. Seu eu do futuro agradece.

* * *

🔗 **Repositório:** [github.com/actiago/dotfiles](https://github.com/actiago/dotfiles)
