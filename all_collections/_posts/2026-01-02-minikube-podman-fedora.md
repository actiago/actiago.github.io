---
layout: post
title:  'Minikube + Podman no Fedora 43'
date:   2026-01-02 23:00:39 -0300
categories: blog
---

***

# **Instalando Minikube com Podman e CRI-O no Fedora 43**

<div style="text-align: justify">
Recentemente reinstalei o sistema operacional em meu modesto computador de estudos, fiquei um bom tempo utilizando o Ferora 40 workstation e resolvi mudar para a versão Server mais recente. Com esse movimento, eu precisava voltar a stack anterior de estudos do Kuberbetes, nela utilizo o Minikube integrado ao Podman, utilizando o runtime CRI-O e a rede Calico. Em um outro momento irei escrever sobre as motivações da escolha destes componentes.
</div>

* * * 

## **Requisitos para rodar o Minikube**

Antes de começar, verifique os seguintes pontos:

*   **Virtualização VT-x/AMD-v habilitada**  
    Certifique-se de que a virtualização está ativada no BIOS/UEFI do seu computador. Para verificar no Linux:

    ```bash
    grep -E --color 'vmx|svm' /proc/cpuinfo
    ```

    Se houver saída, a virtualização está disponível.

*   **Podman instalado**  
    O Podman será usado como driver para o Minikube, muitas pessoas utilizam o **Docker** para esta função.Certifique-se de que ele já está instalado e funcional.

*   **kubectl**  
    O Minikube instala o `kubectl` automaticamente, mas você também pode instalar separadamente. Ele é essencial para gerenciar o cluster Kubernetes.

*   **Conexão com a Internet na primeira execução**  
    Necessária para baixar imagens e dependências. Depois, as imagens ficam em cache.

***

## **Instalando Minikube no Fedora**

1.  **Baixe o binário do Minikube**:

    ```bash
    curl -LO https://github.com/kubernetes/minikube/releases/latest/download/minikube-linux-amd64
    ```

2.  **Instale o Minikube**:

    ```bash
    sudo install minikube-linux-amd64 /usr/local/bin/minikube && rm minikube-linux-amd64
    ```

***

## **Iniciando o Minikube com Podman, CRI-O e Calico**

Antes de iniciar, vamos configurar o Minikube para rodar em modo **rootless**:

```bash
minikube config set rootless true
```

Agora, inicie o cluster com os parâmetros desejados:

```bash
minikube start --driver=podman --container-runtime=cri-o --cni=calico
```

Esse comando cria um cluster Kubernetes com:

*   **Driver:** Podman
*   **Runtime:** CRI-O
*   **CNI:** Calico

***

## **Operações adicionais**

*   **Parar o cluster**:

    ```bash
    minikube stop
    ```

*   **Remover o cluster**:

    ```bash
    minikube delete
    ```

*   **Criar um novo perfil (ex.: lab)**:

    ```bash
    minikube start --driver=podman --container-runtime=cri-o --cni=calico --profile lab
    ```

*   **Listar perfis existentes**:

    ```bash
    minikube profile list
    ```

***

## **Dicas Avançadas**

*   **Gerenciar múltiplos perfis**  
    Use `minikube profile list` para visualizar todos os perfis e `minikube profile delete <nome>` para remover perfis específicos.

*   **Customizar recursos do cluster**  
    É possível ajustar CPU, memória e disco:

    ```bash
    minikube start --driver=podman --container-runtime=cri-o --cni=calico --cpus=4 --memory=8192 --disk-size=30g
    ```

*   **Habilitar Addons úteis**  
    Liste os addons disponíveis:

    ```bash
    minikube addons list
    ```
    
    Ative, por exemplo, o dashboard:

    ```bash
    minikube addons enable dashboard
    ```

*   **Acessar o Dashboard Kubernetes**  
    Após habilitar o addon, execute:

    ```bash
    minikube dashboard
    ```

***

