---
layout: post
title:  'Comandos e Utilitários'
date:   2022-06-06 15:00:39 -0300
categories: blog
---

# Comandos, configurações e utilitários que ajudam no dia-a-dia

> Uso este post como bloco de anotações para consulta rápida

## Vscode + Regex

> Utilize em localizar e substituir.

Remover caracteres antes de *_* no VSCode

```bash
\S*/*_
```

Para adicionar um texto no fim da linha

```bash
/*$
```

---
## Rede

Lista hosts ativos na rede com Nmap.

```bash
nmap $1 -n -sP 10.0.0.0/24 | grep report | awk '{print $5}'
```

Lista IP e MAC ADDRESS dos hosts ativos na rede com Nmap.

```bash
sudo nmap -sP 10.0.0.0/24 | awk '/Nmap scan report for/{printf $5;}/MAC Address:/{print " => "$3;}' | sort
```

Verificar portas TCP com _curl_ ao invés do _telnet_.

```bash
curl -v telnet://127.0.0.1:80
```

### **Exemplos com o comando ss**

Lista todos os sockets em listening

```bash
ss -l
```

Lista todas as conexões TCP

```bash
ss -t
```

Lista todas as conexões TCP em listening

```bash
ss -lt
```

Lista todas as conexões UDP

```bash
s -ua
```

Lista todas as conexões UDP em listening

```bash
ss -lu
```

Lista conexões TCP

```bash
ss -4
```

Filtra conexões por porta

```bash
ss -at '( dport = :443 or sport = :443 )'
```

Substituto para o comando ```netstat -tulpn```

```bash
ss -tulpn
```

---
## DNS

Utilizando o comando _host_

Retorna o hostname de um IP

```bash
host 1.1.1.1
```

Retorna os IPs de um hostname

```bash
host dns.google
```

Retorna NS record de um domínio

```bash
host -t ns dominio.com
```

retorna MX de um domínio

```bash
host -t MX dominio.com
```

Você pode consultar entradas txt, SOA, CNAME inserindo os tipos após o ```-t```.

Lista qualquer tipo de informação de um domínio

```bash
host -v dominio.com
```

---

## Utilitários do sistema operacional

Lista interfaces de rede de modo amigável

```bash
ip -br -c a
```

Lista tamanho do diretório classificando do menor para o maior

```bash
du -hsc * | sort -h
```

Lista arquivos duplicados com hash MD5

```bash
find . ! -empty -type f -name "*.pdf" -exec md5sum {} + | sort | uniq -w32 -dD > ~/Desktop/relatorio-duplicados.txt
```

---

## HTTP

Inicializa um servidor http no diretório atual

```python
python3 -m http.server
```

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

Acompanha os redirecionamentos

```bash
curl -s -L -D - http://site.com.br/ -o /dev/null -w '%{url_effective}'
```

Verifica status de disponibilidade de um recurso remoto

```bash
curl -o /dev/null --silent -Iw "%{http_code}" https://example.com/my.remote.tarball.gz
```

---

## Certificado SSL

Criar um certificado SSL Lets Encrypt exportável

```bash
sudo certbot certonly --manual --preferred-challenges dns --email me@meudominio.com.br --server https://acme-v02.api.letsencrypt.org/directory --agree-tos -d '*.dominio.com.br'
```

---
## VIM - Navegação

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

---
## Powershell

Encontrar meu IP público via powershell

```powershell
nslookup myip.opendns.com resolver1.opendns.com
```

Obtém IPs e nome das interfaces

```
Get-NetIpAddress | Select-Object InterfaceAlias,IPAddress,AddressFamily | Format-Table
```
