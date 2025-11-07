---
layout: post
title:  'Comandos básicos para python virtualenvwrapper'
date:   2025-11-06 23:00:39 -0300
categories: blog
---

### Virtualenvwrapper for Python

Virtualenvwrapper is a powerful tool that simplifies the management of Python virtual environments. It extends the functionality of the virtualenv tool, making it easier to create, manage, and switch between virtual environments. This is especially useful when working on multiple projects with different dependencies.

#### Key Features

- Centralized storage for all virtual environments.
- Simplified commands for creating, deleting, and managing environments.
- Easy switching between environments.
- Hooks for customizing environment behavior.

### Installation

To install virtualenvwrapper, ensure you have Python and pip installed, then run:

```bash
pip install virtualenvwrapper
```

### Setup

Add the following lines to your shell configuration file (e.g., .bashrc, .zshrc):

```bash
export WORKON_HOME=$HOME/.virtualenvs
export VIRTUALENVWRAPPER_PYTHON=$(which python3)
source $(which virtualenvwrapper.sh)
```

Reload your shell configuration:

```bash
source ~/.bashrc  # or ~/.zshrc
```


### Common Commands

Create a new environment:

```bash
mkvirtualenv myenv
```

Activate an environment:

```bash
workon myenv
```

Deactivate the current environment:

```bash
deactivate
```

Remove an environment:

```bash
rmvirtualenv myenv
```

List all environments:

```bash
lsvirtualenv
```

