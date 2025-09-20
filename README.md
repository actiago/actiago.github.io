# Meu Blog

Build e execução do container para teste local

# Build da imagem

```bash
podman build -t blog-local .
```

# Execução do container

```bash
podman run -d -p 4000:4000 blog-local
```

