---
layout: post
title:  'Certificados'
date:   2023-04-10 15:00:39 -0300
categories: blog
---

# Certificados

Processo para gerar certificados privados partindo do zero.

## Sumário

ID | Nome
--- | ---
00 | [Requisitos](#Requisitos)
01 | [Criando uma requisicão (.csr)](#criando-uma-requisicão)
02 | [Validando os certificados](#validando-os-certificados)
03 | [Declarando as variáveis](#declarando-as-variáveis)
04 | [Criando certificados criptografados a partir da chave, cadeia e folha](#criando-certificados-criptografados-a-partir-da-chave-cadeia-e-folha)

## Requisitos

- OpenSSL
- Keytool (JavaKeystore)

Testes realizados no Ubuntu 22.04.

```bash
❯ openssl version
OpenSSL 3.0.2 15 Mar 2022 (Library: OpenSSL 3.0.2 15 Mar 2022)

❯ java -version
openjdk version "11.0.18" 2023-01-17
OpenJDK Runtime Environment (build 11.0.18+10-post-Ubuntu-0ubuntu122.04)
OpenJDK 64-Bit Server VM (build 11.0.18+10-post-Ubuntu-0ubuntu122.04, mixed mode, sharing)
```

## Criando uma requisicão

Para criar uma requisicão, use o arquivo `cria_csr.sh`, contido neste repositório

Antes de executar, substitua o nome do servidor e URL nas variáveis contidas
no script.

```
# Preencher o nome do servidor
SERVIDOR=SRVXYZPTB
# Prencher o SITE = URL = CN
SITE=tiago0.com.br
```

Execute o script

```bash
./cria_csr.sh
```

Após este processo, serão gerados 4 novos arquivos aquivos no diretório. Uma chave (.key), requisicão (.csr)
, requisicão compactada (.car.zip) e o arquivo de configuracão (.001.req.config)

```bash
server-url.com.br-001.csr
server-url.com.br-001.csr.zip
server-url.com.br-001.key
url.com.br.001.req.config
```

Envie o arquivo compactado para a empresa responsável pela geracão do certificado.

Após receber a cadeia e o certificado, seu diretório deve conter os seguintes arquivos

```bash
server-url.com.br-001.csr
server-url.com.br-001.csr.zip
server-url.com.br-001.key
CADEIA_DIGICERT-2020/
cria_csr.sh
url.com.br.cer
url.com.br.001.req.config
```

## Validando os certificados

Pressupondo que você já tenha recebido o certificado folha (.cer) assinado pela
unidade certificadora, bem como a cadeia certificadora, você deverá comparar se
sua chave e o folha tem o mesmo hash de assinatura.

Validando a chave e o certificado folha com openssl

```
openssl rsa -noout -modulus -in ${KEY} | openssl md5
openssl x509 -noout - modulus -in ${CER} | openssl md5
```

A saída apresentada deverá ser a mesma, caso contrário, o certificado deverá ser
criado novamente a partir de sua chave.

## Declarando as variáveis

Crie as variáveis para o certificado folha e para a sua chave

```bash
URL=url.com.br
CER=url.com.br.cer
KEY=chave-gerada-atraves-do-cria_sh.key
PASS=add_uma_passwd_aqui
P12=${URL}.p12
JKS=${URL}.jks
```

Concatene toda a cadeia em um único arquivo no formato `.cer`

```bash
cat CADEIA_DIGICERT-2020/* > cadeia.cer
```

Antes de inicar, teremos os seguintes arquivos no diretório

```bash
server-url.com.br-001.csr
server-url.com.br-001.csr.zip
server-url.com.br-001.key
CADEIA_DIGICERT-2020/
cria_csr.sh
url.com.br.cer
url.com.br.001.req.config
cadeia.cer
```

## Criando certificados criptografados a partir da chave, cadeia e folha

Gerando uma chave privada do tipo `p12`

Como as variáveis já foram definidas anteriormente, execute o comando abaixo:

```bash
openssl pkcs12 -export -des -out ${P12} -inkey ${KEY} -in ${CER} -certfile cadeia.cer -password pass:${PASS} -name ${URL}
```

Agora iremos criar um certificado no formato `jks`, que pode ser utilizado em aplicacões Java

```bash
keytool -importkeystore -srckeystore ${P12} -srcstoretype pkcs12 -destkeystore ${JKS} -srcstorepass ${PASS} -deststorepass ${PASS}
```

E, por fim, valide as novas chaves privadas.

```bash
keytool -keystore ${P12} -storepass ${PASS} -list
keytool -keystore ${JKS} -storepass ${PASS} -list
```

O hash apresentado em ambos também deverão ser o mesmo.

