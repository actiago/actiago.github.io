---
layout: post
title:  'Navidrome: Sua Música, Seu Streaming, Simples Assim'
date:   2026-07-20 15:00:00 -0300
categories: blog
---

***

# **Navidrome: Sua Música, Seu Streaming, Simples Assim**

<div style="text-align: justify">
Cansado de depender de serviços de streaming que removem músicas do catálogo, exigem assinatura mensal ou simplesmente não têm aquela faixa obscura que você tanto ama? O <strong>Navidrome</strong> é a resposta. É um servidor de música moderno, leve e open-source, compatível com a API Subsonic — o que significa que você pode usar qualquer cliente Subsonic (Sonixd, Tempo, Sublime Music, etc.) para ouvir sua própria coleção de qualquer lugar.

Minha intenção pessoal foi um pouco além, a primeira foi a questão de removerem alguns álbuns do catálogo, acredito que por algum tipo de problema judicial ou algo relacionado a distribuição. O outro ponto está ligado a qualidade da música que consumimos, o formato que o Spotify entrega é compactado e voltado a entrega da música em si. O que eu busco é voltar a ouvir com qualidade, mesmo que com menor número de discos em minha coleção, por isso eu busco baixar e comprar discos no formato FLAC, com uma rápida busca você verá que este formato é muito superior ao mp3 de 320kbps por exemplo.
A primeira coisa que fiz ao utilizar a stack foi testar o disco Bad do Michael Jackson, a diferença entre o música entregue no streaming e no formato FLAC é absurda, fiz o mesmo teste com discos de metal e a entrega é gritante quando esperamos compreender toda o trabalho que o artista teve para produzir sua obra.
</div>

Neste post, vou mostrar como é simples subir o Navidrome usando **Docker** ou **Podman**, e como você pode apontar o diretório de músicas para o mesmo local onde seus torrents baixam ou onde sua coleção já está organizada.

* * *

## **Por que usar contêineres?**

Usar Docker ou Podman para rodar o Navidrome traz várias vantagens:

*   **Simplicidade:** Um único comando e tudo está rodando.
*   **Isolamento:** O Navidrome e suas dependências ficam encapsulados, sem poluir seu sistema.
*   **Atualização fácil:** `docker compose pull && docker compose up -d` e pronto.
*   **Portabilidade:** Funciona em qualquer distribuição Linux, macOS ou Windows.

* * *

## **Método 1: Docker Run (comando único)**

O jeito mais rápido de começar é com um único comando `docker run`:

```bash
docker run -d \
  --name navidrome \
  --restart=unless-stopped \
  -v $(pwd)/navidrome-data:/data \
  -v /caminho/para/sua/musica:/music:ro \
  -p 4533:4533 \
  -e ND_SCANSCHEDULE=1h \
  -e ND_LOGLEVEL=info \
  docker.io/deluan/navidrome:latest
```

Depois é só acessar **http://localhost:4533** e criar seu usuário.

> **Dica:** O volume `-v /caminho/para/sua/musica:/music:ro` é onde você aponta para seu diretório de músicas. A flag `:ro` monta como somente leitura, então o Navidrome nunca vai alterar seus arquivos originais.

* * *

## **Método 2: Docker Compose**

Para uma configuração mais organizada e fácil de gerenciar, use o Docker Compose. Crie um arquivo `docker-compose.yml`:

```yaml
version: "3.8"

services:
  navidrome:
    image: docker.io/deluan/navidrome:latest
    container_name: navidrome
    restart: unless-stopped
    ports:
      - "4533:4533"
    environment:
      - ND_SCANSCHEDULE=1h
      - ND_LOGLEVEL=info
      - ND_LASTFM_ENABLED=true
      - ND_LASTFM_APIKEY=${ND_LASTFM_APIKEY:-}
      - ND_LASTFM_SECRET=${ND_LASTFM_SECRET:-}
    volumes:
      - ./navidrome-data:/data
      - /caminho/para/sua/musica:/music:ro
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:4533/ping"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
```

Para iniciar:

```bash
docker compose up -d
```

Para ver os logs:

```bash
docker compose logs -f
```

* * *

## **Método 3: Podman**

Se você prefere o Podman (especialmente no Fedora/RHEL), o processo é praticamente idêntico. A diferença principal são as flags `:Z` nos volumes, que ajustam o contexto SELinux automaticamente:

```bash
podman run -d \
  --name navidrome \
  --restart=unless-stopped \
  -v $(pwd)/navidrome-data:/data:Z \
  -v /caminho/para/sua/musica:/music:ro,Z \
  -p 4533:4533 \
  -e ND_SCANSCHEDULE=1h \
  -e ND_LOGLEVEL=info \
  docker.io/deluan/navidrome:latest
```

Ou com Podman Compose (arquivo `podman-compose.yml`):

```yaml
version: "3.8"

services:
  navidrome:
    image: docker.io/deluan/navidrome:latest
    container_name: navidrome
    restart: unless-stopped
    ports:
      - "4533:4533"
    environment:
      - ND_SCANSCHEDULE=1h
      - ND_LOGLEVEL=info
    volumes:
      - ./navidrome-data:/data:Z
      - /caminho/para/sua/musica:/music:ro,Z
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:4533/ping"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
```

```bash
podman-compose up -d
```

* * *

## ** Dica Importante: Diretório de Músicas**

A grande sacada é que o volume de músicas pode ser **qualquer diretório** do seu sistema. Isso significa que você pode:

*   **Apontar para o diretório de downloads de torrents:** Se você usa Transmission, qBittorrent ou similar, pode configurar o Navidrome para ler diretamente de `/media/torrents/music` ou `~/Downloads/completed/music`. Assim, assim que um torrent de música termina de baixar, o Navidrome já detecta na próxima varredura.

*   **Apontar para seu diretório de música existente:** Se você já tem uma coleção organizada em `~/Music` ou `/media/music`, é só usar esse caminho no volume.

*   **Múltiplos diretórios:** O Navidrome suporta múltiplas pastas de música. Você pode montar vários volumes ou usar o ND_MUSICFOLDER para apontar para um diretório que contenha subpastas de diferentes fontes.

Exemplo prático:

```bash
# Se suas músicas ficam em /media/torrents/completed/music
docker run -d \
  --name navidrome \
  --restart=unless-stopped \
  -v $(pwd)/navidrome-data:/data \
  -v /media/torrents/completed/music:/music:ro \
  -p 4533:4533 \
  docker.io/deluan/navidrome:latest
```

O Navidrome tem um scanner que verifica novidades no intervalo configurado (`ND_SCANSCHEDULE`, padrão: 1h). Assim que novas músicas aparecem no diretório, elas são automaticamente adicionadas à sua biblioteca.

* * *

## **Scripts Auxiliares**

Para facilitar ainda mais, criei scripts que automatizam todo o processo. Eles estão disponíveis no [repositório do projeto](https://github.com/actiago/navridrome).

### Docker

```bash
# Torne o script executável
chmod +x scripts/docker-run.sh

# Execute passando apenas o diretório de música
./scripts/docker-run.sh --music /caminho/para/sua/musica

# Com opções personalizadas
./scripts/docker-run.sh \
  --music /media/music \
  --data /opt/navidrome-data \
  --port 8080 \
  --env ND_LOGLEVEL=debug
```

### Podman

```bash
chmod +x scripts/podman-run.sh

./scripts/podman-run.sh --music /caminho/para/sua/musica
```

Os scripts criam o diretório de dados automaticamente, verificam se o contêiner já existe (e o removem se necessário), e exibem informações úteis ao final.

* * *

## **Conclusão**

Com o Navidrome, você tem total controle sobre sua biblioteca musical. Não depende de catálogo de terceiros, não paga mensalidade, e pode ouvir suas músicas de qualquer lugar usando clientes compatíveis com a API Subsonic.

E o melhor: com Docker ou Podman, a instalação é tão simples que você pode estar ouvindo suas músicas em menos de 5 minutos. Basta apontar para o diretório certo e pronto.

### Clientes Recomendados

*   **Web:** O próprio Navidrome já vem com uma interface web excelente.
*   **Desktop:** [Sonixd](https://github.com/jeffvli/sonixd) (multi-plataforma)
*   **Android:** [Tempo](https://github.com/CappielloAntonio/tempo), [Ultrasonic](https://github.com/ultrasonic/ultrasonic)
*   **iOS:** [play:Sub](https://michaelsapps.dk/play-sub-app/), [iSub](https://isub.app/)

Para mais informações, acesse a [documentação oficial do Navidrome](https://www.navidrome.org/).

***
