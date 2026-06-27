---
layout: post
title: "Comandos para Kubernetes"
date: 2025-09-20 18:00:00
categories: kubernetes
---

### Comandos Kubernetes Mais Úteis (por Categoria)

Lista de comandos essenciais para o dia a dia com Kubernetes, seja para desenvolvimento, administração ou troubleshooting.

#### **1. Comandos Básicos e de Informação**
Comandos para obter visão geral do cluster e seus recursos.

| Comando | Descrição | Exemplo |
| :--- | :--- | :--- |
| `kubectl cluster-info` | Exibe informações básicas do cluster (endpoints master e services). | `kubectl cluster-info` |
| `kubectl version` | Mostra a versão do cliente (kubectl) e do servidor (Kubernetes API). | `kubectl version --short` |
| `kubectl config view` | Exibe a configuração atual do `kubeconfig`. | `kubectl config view` |
| `kubectl api-resources` | Lista todos os tipos de recursos disponíveis na API e seus shortnames. | `kubectl api-resources` |

#### **2. Comandos de "Get" (Listar e Visualizar)**
Comandos para listar e inspecionar recursos em seus namespaces.

| Comando | Descrição | Exemplo |
| :--- | :--- | :--- |
| `kubectl get <resource>` | Lista recursos de um tipo específico. | `kubectl get pods` |
| `kubectl get all` | Lista todos os recursos principais em um namespace (pods, services, deployments, etc.). | `kubectl get all -n <namespace>` |
| `kubectl get <resource> -o wide` | Lista recursos com informações adicionais (IPs, Node, etc.). | `kubectl get pods -o wide` |
| `kubectl get <resource> -o yaml` | Lista a configuração completa de um recurso no formato YAML. | `kubectl get pod my-pod -o yaml` |
| `kubectl describe <resource> <name>` | Mostra detalhes extensos sobre um recurso específico (eventos, estado, etc.). | `kubectl describe pod my-pod` |

#### **3. Comandos de Troubleshooting e Logs**
Comandos essenciais para diagnosticar problemas em pods e containers.

| Comando | Descrição | Exemplo |
| :--- | :--- | :--- |
| `kubectl logs <pod-name>` | Exibe os logs de um pod. | `kubectl logs my-pod` |
| `kubectl logs -f <pod-name>` | Segue os logs de um pod em tempo real (类似 `tail -f`). | `kubectl logs -f my-pod` |
| `kubectl logs -c <container-name> <pod-name>` | Exibe logs de um container específico dentro de um pod multi-container. | `kubectl logs -c my-container my-pod` |
| `kubectl exec -it <pod-name> -- <command>` | Executa um comando interativo em um pod. | `kubectl exec -it my-pod -- /bin/bash` |
| `kubectl exec -it <pod-name> -c <container-name> -- <command>` | Executa um comando em um container específico de um pod. | `kubectl exec -it my-pod -c sidecar -- sh` |
| `kubectl top pod/node` | Mostra uso de recursos (CPU/Memória) de pods ou nodes. | `kubectl top pod` `kubectl top node` |

#### **4. Comandos de Criação, Aplicação e Atualização**
Comandos para criar, atualizar e gerenciar recursos a partir de arquivos de manifesto.

| Comando | Descrição | Exemplo |
| :--- | :--- | :--- |
| `kubectl apply -f <file.yaml>` | Cria ou atualiza recursos definidos em um arquivo. | `kubectl apply -f deployment.yaml` |
| `kubectl create -f <file.yaml>` | Cria recursos a partir de um arquivo (não atualiza se existir). | `kubectl create -f configmap.yaml` |
| `kubectl delete -f <file.yaml>` | Deleta recursos definidos em um arquivo. | `kubectl delete -f deployment.yaml` |
| `kubectl delete <resource> <name>` | Deleta um recurso específico. | `kubectl delete pod my-pod` |
| `kubectl scale --replicas=<count> <resource> <name>` | Escala o número de réplicas de um Deployment ou ReplicaSet. | `kubectl scale --replicas=3 deployment/my-app` |
| `kubectl rollout restart <resource> <name>` | Reinicia um Deployment (recria os pods de forma rolling). | `kubectl rollout restart deployment/my-app` |
| `kubectl rollout status <resource> <name>` | Mostra o status de um rollout em andamento. | `kubectl rollout status deployment/my-app` |
| `kubectl rollout undo <resource> <name>` | Reverte um Deployment para a revisão anterior. | `kubectl rollout undo deployment/my-app` |

#### **5. Comandos de Contexto e Namespace**
Comandos para gerenciar e alternar entre diferentes clusters e namespaces.

| Comando | Descrição | Exemplo |
| :--- | :--- | :--- |
| `kubectl config get-contexts` | Lista todos os contextos configurados. | `kubectl config get-contexts` |
| `kubectl config use-context <context-name>` | Alterna para um contexto específico (cluster/user). | `kubectl config use-context minikube` |
| `kubectl get namespaces` | Lista todos os namespaces. | `kubectl get ns` (shortname) |
| `kubectl config set-context --current --namespace=<namespace>` | Define o namespace padrão para o contexto atual. | `kubectl config set-context --current --namespace=production` |

---

### Referências e Links Úteis

Para se aprofundar e sempre consultar a documentação oficial, que é a fonte mais confiável:

*   **[Kubernetes Official Documentation: kubectl Cheat Sheet](https://kubernetes.io/docs/reference/kubectl/cheatsheet/)** - A fonte primária e mais completa para comandos `kubectl`. (Inglês)
*   **[Kubernetes.io: Concept Docs](https://kubernetes.io/docs/concepts/)** - Documentação conceitual para entender os recursos (Pods, Deployments, Services, etc.). (Inglês)
*   **[Kubernetes.io: Tasks](https://kubernetes.io/docs/tasks/)** - Tutoriais práticos para realizar tarefas comuns. (Inglês)

