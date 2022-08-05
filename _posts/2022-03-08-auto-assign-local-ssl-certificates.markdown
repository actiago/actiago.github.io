---
layout: post
title:  'Gereando certificados autoassinados para domínio local'
date:   2022-08-03 15:00:39 -0300
categories: blog
---

# Gerando certificados autoassinados a partir de um CA local

**Cenário**: Seu ambiente contém uma unidade certificadora baseada no domínio local *contoso.local* e você precisa fazer com que suas aplicações distribuídas através deste ambiente sejam assinadas/validadas a partir deste. Ex: **HTTPS://**_app-rh.contoso.local_.

## Passos para aplicação do certificado em uma stack de homologação

**Objeto principal**: certificado RootCA no formato _.pfx_.
**Objetivo**: Exportar uma chave privada (_.key_) e um certificado (_.crt_) a partir do certificado **RootCA**.

Documentação de referência: https://www.ibm.com/docs/en/arl/9.7?topic=certification-extracting-certificate-keys-from-pfx-file

### Exportar as chaves

a. Exportar a chave privada a partir do **RootCA**
    * A senha do certificado será solicitada

```bash
openssl pkcs12 -in [yourfile.pfx] -nocerts -out [drlive.key]
```

b. Exportar o certificado a partir do **RootCA**
    * A senha de exportação será solicitada

```bash
openssl pkcs12 -in [yourfile.pfx] -clcerts -nokeys -out [drlive.crt]
```

### Exportar uma chave privada sem senha

```bash
openssl rsa -in [original.key] -out [private.key]
```

### Gerando um certificado CSR (Certificate Signing Request)
    * Preencha os dados solicitados

```bash
openssl req -new -key private.key -out request.csr
```

### Criando um certificado auto assinado (CRT) assinado pelo **RootCA**

a. Crie um arquivo de nome _extfile.cnf_ e adicione os subdomínios que deseja assinar conforme o exemplo a seguir:

```
subjectAltName = DNS:app-rh.contoso.local, DNS:app-securelogin.contoso.local, DNS:traefik, DNS:127.0.0.1
```

b. Crie o certificado CRT utilizando os subdomínios adicionados no arquivo _extfile.cnf_.


```bash
openssl x509 -req -dys 1095 -in request.csr -CA certificate.crt -CAkey private.key -CAcreateserial -out new.crt -extfile extfile_dev.cnf
```

> *Nota*: o arquivo new.crt deverá iniciar com: *-----BEGIN CERTIFICATE-----*

*O processo de criação de uma nova chave assinada está finalizado*

---

## Aplicando os certificados

No meu caso tenho dois cenários de aplicação, um com o [Trafik](https://github.com/traefik/traefik) como proxy e outro com o [HAProxy](https://www.haproxy.org/). Este documento é restrito a estas ferramentas.

Antes de iniciar, concatene a chave _private.key_ e new.crt em um arquivo _.pem_.

```bash
cat private.key new.crt > mydomain.pem
```

### Aplicando no Traefik

a. Copie o certificado _.pem_ e a chave privada _.key_ de acordo com sua configuração do Traefik

### Aplicando no HAProxy

a. Seu arquivo _/etc/haproxy/haproxy.cfg_ deve ser configurado como abaixo

```
listen haproxy
  bind 0.0.0.0:443 ssl crt /etc/ssl/private/mydomain.pem
  mode  http
  option http-server-close
  option forwardfor
  reqadd X-Forwarded-Proto:\ https
  reqadd X-Forwarded-Port:\ 443
  option forwardfor if-none
  balance  roundrobin
  option  abortonclose
  server 192.168.100.224 192.168.100.224:1443 check inter 10s rise 2 fall 3 ssl verify none
```

b. Reinicie o serviço do HAProxy

```bash
systemctl restart haproxy
```

---

