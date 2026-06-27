---
layout: post
title: "Glossário de componentes do Kubernetes"
date: 2025-09-20 18:10:00
categories: kubernetes
---

### Glossário Kubernetes

Um guia de referência completo com os principais termos do Kubernetes, baseado na [documentação oficial](https://kubernetes.io/docs/reference/glossary/?fundamental=true). Ideal para desenvolvedores, administradores de sistemas e entusiastas de containers.

#### A
**Addons**  
Recursos que estendem a funcionalidade do Kubernetes através de pods e serviços. [Saiba mais](https://kubernetes.io/docs/concepts/cluster-administration/addons/)

**Annotation**  
Metadados key-value usados para armazenar informações não-identificadoras sobre objetos Kubernetes. [Referência](https://kubernetes.io/docs/concepts/overview/working-with-objects/annotations/)

**API Server**  
Componente do control plane que expõe a API Kubernetes. [Diagrama](https://kubernetes.io/docs/concepts/overview/components/#kube-apiserver)

#### B
**Bare Pod**  
Pod que não é gerenciado por um ReplicaSet ou Deployment. [Referência](https://kubernetes.io/docs/concepts/workloads/pods/#pod-management)

#### C
**Cloud Controller Manager**  
Componente que incorpora a lógica específica de cloud providers. [Documentação](https://kubernetes.io/docs/concepts/architecture/cloud-controller/)

**ConfigMap**  
Recurso para armazenar dados de configuração não-confidenciais. [Guia](https://kubernetes.io/docs/concepts/configuration/configmap/)

**Container**  
Unidade padrão de software que empacota código e dependências. [Conceitos](https://kubernetes.io/docs/concepts/containers/)

**Controller**  
Loop de controle que regula o estado do cluster. [Explicação](https://kubernetes.io/docs/concepts/architecture/controller/)

**CronJob**  
Recurso para execução de Jobs em schedule baseado em tempo. [Documentação](https://kubernetes.io/docs/concepts/workloads/controllers/cron-jobs/)

#### D
**DaemonSet**  
Garante que todos os nodes executem uma cópia de um Pod. [Referência](https://kubernetes.io/docs/concepts/workloads/controllers/daemonset/)

**Deployment**  
Controller que fornece atualizações declarativas para Pods. [Guia](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/)

#### E
**etcd**  
Store key-value consistente e altamente disponível usado como backing store do Kubernetes. [Referência](https://kubernetes.io/docs/concepts/overview/components/#etcd)

#### F
**FlexVolume**  
Interface legada para conectores de volume. [Documentação](https://kubernetes.io/docs/concepts/storage/volumes/#flexvolume)

#### H
**Helm**  
Gerenciador de pacotes para Kubernetes. [Site oficial](https://helm.sh/)

#### I
**Ingress**  
API object que manage external access to services in a cluster. [Referência](https://kubernetes.io/docs/concepts/services-networking/ingress/)

#### J
**Job**  
Controller que executa uma ou mais tarefas até a conclusão. [Documentação](https://kubernetes.io/docs/concepts/workloads/controllers/job/)

#### K
**kubeadm**  
Ferramenta para criar e gerenciar clusters Kubernetes. [Documentação](https://kubernetes.io/docs/reference/setup-tools/kubeadm/)

**kubectl**  
CLI tool para interagir com clusters Kubernetes. [Cheat Sheet](https://kubernetes.io/docs/reference/kubectl/cheatsheet/)

**kubelet**  
Agente que roda em cada node do cluster. [Componente](https://kubernetes.io/docs/concepts/overview/components/#kubelet)

#### L
**Label**  
Pares key-value usados para identificar e organizar recursos. [Guia](https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/)

#### M
**Master**  
Node que hospeda o control plane. [Arquitetura](https://kubernetes.io/docs/concepts/overview/components/#control-plane-components)

#### N
**Namespace**  
Mecanismo para isolamento de recursos dentro de um cluster. [Conceitos](https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/)

**Node**  
Máquina worker onde os pods são executados. [Referência](https://kubernetes.io/docs/concepts/architecture/nodes/)

#### P
**Persistent Volume (PV)**  
Recurso de armazenamento no cluster. [Conceitos](https://kubernetes.io/docs/concepts/storage/persistent-volumes/)

**Persistent Volume Claim (PVC)**  
Solicitação de armazenamento por um usuário. [Documentação](https://kubernetes.io/docs/concepts/storage/persistent-volumes/#persistentvolumeclaims)

**Pod**  
Menor unidade executável no Kubernetes. [Conceitos fundamentais](https://kubernetes.io/docs/concepts/workloads/pods/)

#### R
**ReplicaSet**  
Garante que um número específico de réplicas de pod estejam running. [Referência](https://kubernetes.io/docs/concepts/workloads/controllers/replicaset/)

#### S
**Secret**  
Objeto para armazenar dados sensíveis. [Guia](https://kubernetes.io/docs/concepts/configuration/secret/)

**Service**  
Abstração que define um conjunto lógico de pods e políticas de acesso. [Conceitos](https://kubernetes.io/docs/concepts/services-networking/service/)

**StatefulSet**  
Workload API object usado para aplicações stateful. [Documentação](https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/)

#### T
**Taint**  
Permite que um node repela um conjunto de pods. [Conceitos](https://kubernetes.io/docs/concepts/scheduling-eviction/taint-and-toleration/)

#### V
**Volume**  
Diretório com dados acessível aos containers em um pod. [Referência](https://kubernetes.io/docs/concepts/storage/volumes/)

---

### Referências e Fontes

Este glossário foi compilado a partir da documentação oficial do Kubernetes:

- **[Kubernetes Official Glossary](https://kubernetes.io/docs/reference/glossary/?fundamental=true)** - Glossário completo da documentação oficial
- **[Kubernetes Concepts](https://kubernetes.io/docs/concepts/)** - Explicações detalhadas dos conceitos fundamentais
- **[Kubernetes Documentation](https://kubernetes.io/docs/home/)** - Documentação completa do Kubernetes

### Imagens de Referência

Para visualizar melhor os conceitos, recomendo estes diagramas oficiais:

- **[Arquitetura do Kubernetes](https://kubernetes.io/images/docs/components-of-kubernetes.svg)** - Componentes do cluster
- **[Pod Structure](https://kubernetes.io/images/docs/pod.svg)** - Estrutura de um Pod
- **[Service Diagram](https://kubernetes.io/images/docs/services-ipvs-overview.svg)** - Funcionamento de Services
- **[Deployment Overview](https://kubernetes.io/images/docs/deployment.svg)** - Estrutura de Deployments

---

Este glossário será atualizado regularmente conforme a evolução do Kubernetes e sua documentação. Recomendo sempre consultar a [documentação oficial](https://kubernetes.io/docs/) para informações mais recentes e detalhadas.
