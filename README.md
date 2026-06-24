# Blog | Tiago Amaral

Blog pessoal sobre cloud computing, Kubernetes, automação e infraestrutura.
Publicado via GitHub Pages + Jekyll.

## Executar localmente com Podman

### Build da imagem

```bash
podman build -t blog-tiago .
```

### Executar o container

```bash
podman run -d --name blog -p 4000:4000 blog-tiago
```

Acesse em: [http://localhost:4000](http://localhost:4000)

### Parar e remover o container

```bash
podman stop blog && podman rm blog
```

### Desenvolvimento com live reload

Para testar alterações sem rebuildar a imagem a cada mudança:

```bash
podman run --rm -it \
  -p 4000:4000 \
  -v "$(pwd):/srv/jekyll:z" \
  blog-tiago
```

A flag `:z` é necessária no Fedora/CentOS/RHEL para ajustar o contexto SELinux do volume montado.

### Ver logs

```bash
podman logs -f blog
```

## Estrutura do projeto

```
├── index.html          # Landing page principal
├── _config.yml         # Configuração Jekyll
├── Gemfile             # Dependências Ruby
├── Containerfile       # Imagem para testes locais
├── _layouts/           # Templates HTML
│   ├── default.html    # Layout base (header + footer)
│   ├── home.html       # Listagem de posts
│   ├── page.html       # Páginas estáticas
│   └── post.html       # Post individual
├── _posts/             # Artigos do blog (Markdown)
├── assets/
│   ├── css/styles.css  # Estilos completos
│   └── js/script.js    # JavaScript (menu, scroll, dark mode)
└── about.md            # Página "Sobre"
```

## Tecnologias

- HTML semântico
- CSS puro com design system (variáveis CSS)
- JavaScript puro (sem frameworks)
- Jekyll para geração de páginas estáticas
