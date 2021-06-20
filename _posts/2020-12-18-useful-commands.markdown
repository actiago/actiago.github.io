---
layout: post
title:  'Comandos e Utilitários'
date:   2020-12-18 15:00:39 -0300
categories: blog
---

# Comandos, configurações e utilitários que ajudam no dia-a-dia

Alguns arquivos de configuração estão disponíveis no repositório [_dotfiles_](https://github.com/actiago/dotfiles)

> Post atualizado constantemente.

## Nmap

Lista hosts ativos na rede.

```bash
nmap $1 -n -sP 10.0.0.0/24 | grep report | awk '{print $5}'
```

Lista IP e MAC ADDRESS dos hosts ativos na rede

```
sudo nmap -sP 10.0.0.0/24 | awk '/Nmap scan report for/{printf $5;}/MAC Address:/{print " => "$3;}' | sort
```

## SSH

Gerador de chaves SSH. crie um arquivo de nome ```gerador_de_chaves.sh```.

Utilizo este script para a criação de chaves diversas, principalmente para uso no _github_ e _gitlab_.

1. Dê permissão de execução:

```bash
chmod +x gerador_de_chaves.sh
```

2. Adicione o script

<script src="https://gist.github.com/actiago/ee1ca1e45a87ec69c4af36ef5ce6f53e.js"></script>

## HTTP

Faz um dump dos links de um determinado site.

```bash
lynx -listonly -dump www.sitealvo.com
```

Use o _curl_ para testar um loadbalancer.

```bash
curl -vko /dev/null www.site.com
```

Obtém respostas e traça as rotas de uma requisição HTTP

```bash
curl -sSIL http://172.29.0.2:5000
```

## Aliases

Aliases para o arquivo ```.bashrc```

Copia e grava um texto na área de transferência do sistema operacional.

```bash
alias xc='xclip -sel clipboard'
```

**Comando pessoal** para momentos de caos e stress - Parrot [![Parrot](https://emoji.gg/assets/emoji/5892_parrot.gif)](https://emoji.gg/emoji/5892_parrot)

```bash
alias parrot='curl parrot.live'
```

Python VirtualEnvWrapper.

```bash
export VIRTUALENVWRAPPER_PYTHON=/usr/bin/python3
export VIRTUALENVWRAPPER_VIRTUALENV=/home/$USER/.local/bin/virtualenv
export WORKON_HOME=$HOME/.virtualenvs
source /home/$USER/.local/bin/virtualenvwrapper.sh
```

## VIM

Dividir a tela verticalmente e abrir outro arquivo.

```:vsplit``` divide a tela

```:edit /dir/file.txt``` abre o arquivo

```ctrl + w + seta para direita ou esquerda``` para mudar de tela/arquivo.

Navegar no texto

**j** - move o cursor para a linha de baixo

**k** - move o cursor para a linha de cima

**h** - move o cursor um caractere a direita

**l** - move o cursor um caractere a esquerda

**0** - move para o início da linha

**$** - move para o fim da linha

**w** - move para o início da próxima palavra

**b** - move para o início da palavra anterior

**e** - move para o fim da próxima palavra

**)** - move uma sentença a frente

**}** - move um parágrafo a frente

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

" File syntax
au BufNewFile,BufRead composer.lock set filetype=json
au BufNewFile,BufRead docker-compose*.yml set filetype=yaml
au BufNewFile,BufRead Jenkinsfile set filetype=groovy
au BufNewFile,BufRead Vagrantfile set filetype=ruby
au BufNewFile,BufRead *.textile set filetype=redminewiki
au BufNewFile,BufRead *.tfstate set filetype=json
```

## Criar um certificado SSL Lets Encrypt exportável

```bash
sudo certbot certonly --manual --preferred-challenges dns --email me@meudominio.com.br --server https://acme-v02.api.letsencrypt.org/directory --agree-tos -d '*.dominio.com.br'
```

> Como já proposto anteriormente, este post poderá sofer alterações.
