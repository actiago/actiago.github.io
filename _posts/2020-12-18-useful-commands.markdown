---
layout: post
title:  'Comandos e Utilitários'
date:   2020-12-18 15:00:39 -0300
categories: blog
---

# Comandos, configurações e utilitários que ajudam no dia-a-dia

## Nmap

Lista hosts ativos na rede com Nmap

```bash
nmap $1 -n -sP 10.0.0.0/24 | grep report | awk '{print $5}'
```

Lista IP e MAC ADDRESS dos hosts ativos na rede alvo

```
sudo nmap -sP 10.0.0.0/24 | awk '/Nmap scan report for/{printf $5;}/MAC Address:/{print " => "$3;}' | sort
```

## SSH

Gerador de chaves SSH

```bash
#!/usr/bin/env bash

echo "Insira o nome da chave: "
read KEYNAME

ssh-keygen -t rsa -b 4096 -C "$KEYNAME" -f "/home/"$USER"/.ssh/id_rsa-$KEYNAME" -q
```

## HTTP

Faz um dump dos links de um determinado site

```bash
lynx -listonly -dump www.sitealvo.com
```

Teste seu loadbalancer

```bash
curl -vko /dev/null www.site.com
```

Obtém respostas e traça as rotas de uma requisição HTTP

```bash
curl -sSIL http://172.29.0.2:5000
```

## Aliases

Aliases para o arquivo ```.bashrc```

Copia e grava um texto no cache

```bash
alias xc='xclip -sel clipboard'
```

Comando pessoal - Parrot no alias do bash.rc

```bash
alias parrot="curl parrot.live"
```

Python VirtualEnvWrapper

```bash
export VIRTUALENVWRAPPER_PYTHON=/usr/bin/python3
export VIRTUALENVWRAPPER_VIRTUALENV=/home/tiago/.local/bin/virtualenv
export WORKON_HOME=$HOME/.virtualenvs
source /home/tiago/.local/bin/virtualenvwrapper.sh
```

## Arquivos de configuração

Arquivo .vimrc

```vim
" General
set wildmenu
set viminfo=
set splitright

" Disable backup
set nobackup
set noswapfile
set nowritebackup

" Colors and theme
filetype on
filetype plugin off
syntax on
colorscheme elflord
set background=dark

set number
set ruler
set title

" Space and Tabs
set expandtab
set nostartofline
set shiftwidth=4
set tabstop=4

" Cursos and column
" set cursorline
set cursorcolumn

" 'colorcolumn' unsuported by VIM7.2
if exists('+colorcolumn')
  set colorcolumn=80
endif

highlight CursorColumn ctermbg=DarkGray
highlight ColorColumn ctermbg=DarkGray

" Identation
" filetype plugin indent on
" set autoindent

" Search
set ignorecase
set hlsearch
set incsearch

" Set UTF-8
set encoding=utf-8
set fileencoding=utf-8

" Shortcuts
map 0 ^

map <Tab> :tabnext<cr>
map <S-Tab> :tabprevious<cr>

" Pathogen
if filereadable(expand($HOME . "/.vim/autoload/pathogen.vim"))
    execute pathogen#infect()
endif

" File syntax
au BufNewFile,BufRead composer.lock set filetype=json
au BufNewFile,BufRead docker-compose*.yml set filetype=yaml
au BufNewFile,BufRead Jenkinsfile set filetype=groovy
au BufNewFile,BufRead Vagrantfile set filetype=ruby
au BufNewFile,BufRead *.textile set filetype=redminewiki
au BufNewFile,BufRead *.tfstate set filetype=json
```
