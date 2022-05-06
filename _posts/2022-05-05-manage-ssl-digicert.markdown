---
layout: post
title:  'Criando certificados SSL - Digicert/Certisign'
date:   2022-05-05 15:00:39 -0300
categories: blog
---

# Gerenciamento de certificados SSL

Renovação de certificado SSL por intermédio da Digicert/Certisign

## Sumário

- [Gerenciamento de certificados SSL](#gerenciamento-de-certificados-ssl)
  - [Sumário](#sumário)
  - [Gerando um certificado SSL](#gerando-um-certificado-ssl)
    - [Coletando dados](#coletando-dados)
    - [Gerando um novo certificado](#gerando-um-novo-certificado)
    - [Convertento para PFX](#convertento-para-pfx)

## Gerando um certificado SSL

### Coletando dados

Como estamos tratando de renovação de um certificado SSL, precisaremos dos dados do certificado atual.
Use o comando abaixo para visualizá-los.

```bash
echo | openssl s_client -showcerts -servername meudominio.com.br -connect meudominio.com.br:443 2>/dev/null | openssl x509 -inform pem -noout -text
```

Os dados a serem utilizados estarão disponíveis na sessão ```Subject```.

Ex:

```bash
 Subject: C = BR, ST = Paran\C3\A1, L = MARINGA, O = MINHA EMPRESA LTDA, CN = *.minhaempresa.com.br
 ```

Com estes dados em mãos, podemos avançar para a geração de um novo certificado.

### Gerando um novo certificado

```bash
openssl req -newkey rsa:2048 -nodes -keyout ChavePrivada.key -out MinhaCSR.csr
```

Você será questionado sobre os dados informados no certificado anterior

| ITEM                                                        | INFO                                                             |
| ----------------------------------------------------------- | ---------------------------------------------------------------- |
| Country Name (2 letter code) [AU]:                          | País                                                             |
| State or Province Name (full name) [Some-State]:            | Estado                                                           |
| Locality Name (eg, city) []:                                | Cidade                                                           |
| Organization Name (eg, company) [Internet Widgits Pty Ltd]: | Razão social                                                     |
| Organizational Unit Name (eg, section) []:                  | Departamento responsável                                         |
| Common Name (e.g. server FQDN or YOUR name) []:             | domínio - *.nomedodominio para certificados do tipo **WILDCARD** |
| Email Address []:                                           | email-adm@minhaempresa.com.br                                           |
| A challenge password []:                                    | Deixe em branco                                                  |
| An optional company name []:                                | Deixe em branco                                                  |

Após este processo, os arquivos ChavePrivada.key e MinhaCSR.csr serão criados no diretório atual

**Obs**: > Salve estes arquivos em local seguro

Envie o arquivo MinhaCSR.csr para o fornecedor e aguarde a criação do certificado SSL válido. As instruções
são enviadas via e-mail.

### Convertento para PFX

É necessário converter o certificado para PFX para que seja instalado no WAF. Execute o comando abaixo.

```bash
openssl pkcs12 -export -nodes -out bundle.pfx -inkey ChavePrivada.key -in star_minhaempresa_com_br.crt -certfile DigiCertCA.crt
```
