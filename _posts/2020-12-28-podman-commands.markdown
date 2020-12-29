---
layout: post
title:  'podman commands - post in english'
date:   2020-12-28 23:00:00 -0300
categories: blog
---

# Podman commands

> Postagem escrita em inglês, pois, criei as anotações em inglês durante os estudos.

- Search an image

```bash
sudo podman search nginx --filter=is-official
```

- Run a container

```bash
sudo podman run -dt -p 8080:80 docker.io/library/nginx
```

- View running containers

```bash
sudo podman ps
```

- Follow container logs

```bash
sudo podman logs -f container_name
```

- View conteiner process

```bash
sudo podman top conainer_name
```

- List conainers running

```bash
sudo podman container list
```

- Inspect last container and use grep to get IP address

```bash
sudo podman inspect -l | grep IPAddress
```

- Stop last running container

```bash
sudo podman stop -l
```

- List running containers

```bash
sudo podman ps
```

- List running and exited containers

```bash
sudo podman ps -a
```

- List images

```bash
sudo podman images
```

- Create a pod

```bash
sudo podman pod create --name my-pod -p 8080:80
```

- Run a container into the created pod

```bash
sudo podman run -d --restart=always --pod=my-pod \
    -e WORDPRESS_DB_NAME="wp" \
    -e WORDPRESS_DB_USER="wordpress" \
    -e WORDPRESS_DB_PASSWORD="w0rdpr3ss" \
    -e WORDPRESS_DB_HOST="127.0.0.1" \
    --name wp-test wordpress
```

- Create an *yaml* archive (kubernetes compatible)

```bash
sudo podman generate kube my-pod >> my-pod.yaml
```

- Run from the *yaml* file

```bash
sudo podman play kube my-pod.yaml
```

- Restart pod

```bash
sudo podman pod restart my-pod
```

- View pod detail

```bash
sudo podman pod stats my-pod
```

- Stop a pod

```bash
sudo podman pod stop my-pod
```

- Build an image from a source

```bash
sudo podman build -t nginx666 https://git.io/Jf8ol
```

- Now run the image

```bash
sudo podman run -d -p 8080:80 nginx666
```

- List containers

```bash
sudo podman container ls
```

- View container resources status

```bash
sudo podman container stats
```

- List networks

```bash
sudo podman network ls
```

- Inpect a network

```bash
sudo podman network inspect podman_network_name
```

- View podman status

```bash
sudo podman stats
```

- List images

```bash
sudo podman image ls
```

- Remove an image

```bash
sudo podman image rm image_ID
```

- Container login

```bash
sudo podman exec -it my_container_name bash
```

- List volumes

```bash
sudo podman volume ls
```

- Prune unused volumes

```bash
sudo podman volume prune
```

- Prune unused images

```bash
sudo podman image prune
```

- Formating status info with podman ps

```bash
sudo podman ps -a --format "{{.ID}}  {{.Image}}  {{.Labels}}  {{.Mounts}}"
```

- Run a container with local volume mount [check it]

```bash
sudo podman run -dt -p 5432:5432 -p 2222:22 -v ~/tmp/postgres-db-podman:/root docker.io/library/postgres
```

- Add a container to a pod

```bash
sudo podman run -dt --pod my-lab nginx
```

- Building a local image

```bash
sudo podman build -t image_name .
```

- Run the created image

```bash
sudo podman run -ti -p 8888:8080 -d image_name
```
