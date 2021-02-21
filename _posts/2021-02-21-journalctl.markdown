---
layout: post
title:  'Gerenciando logs no Linux com journalctl'
date:   2021-02-21 14:31:39 -0300
categories: blog
---

# Gerenciando logs no Linux com journalctl

> Conteúdo obtido através do vídeo [**DOMINANDO OS LOGS NO LINUX COM O JOURNALCTL (completo e super fácil)**](https://youtu.be/jT9yjpUYB-Y) do canal Linux Tips

- Filtrando com _--since_

  * Filtrando logs de 5 dias atrás

    ```bash
    journalctl --since "5 days ago"
    ```

  * Filtrando logs de 5 dias até 2 horas atrás

    ```bash
    journalctl --since "5 days ago" --until "2 hours ago"
    ```

  * Filtrando logs dos dos últimos 30 minutos

    ```bash
    journalctl --since "30 min ago"
    ```

  * Filtro por data

    ```bash
    journalctl --since "2021-01-01 01:00:00" --until "2021-01-02 01:00:00"
    ```

- Consultando logs de um serviço específico

  * Filtrando últimas 10 linhas de logs do kernel

    ```bash
    journalctl -k -n 10
    ```

  * Filtrando por _unity_ (-u)

    ```bash
    journalctl -u nginx --since "2021-01-01 01:00:00" --until "2021-01-02 01:00:00"
    ```

- Filtrando com reverse (-r) e sort (-s) e com output (-o) em json

  * Ex:

    ```bash
    journalctl -u nginx --since "2021-01-01 01:00:00" --until "2021-01-02 01:00:00" -r -o json-pretty
    ```

  * Exemplo acima com adição de filtro de informação (-p)

    ```bash
    journalctl -u nginx --since "2021-01-01 01:00:00" --until "2021-01-02 01:00:00" -r -o json-pretty -p "err"
    ```

-  Extra Filtrando mensagens de emergência até mensagens de erro

    * Ex:

    ```bash
    journalctl -u nginx --since "2021-01-01 01:00:00" --until "2021-01-02 01:00:00" -r -o json-pretty -p "emerg".."err"
    ```

- Filtro por usuário

    * Use o ID do usuário

    ```bash
    journtalctl _UID=1000
    ```
