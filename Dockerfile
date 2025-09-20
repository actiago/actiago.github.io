FROM ruby:3.2

# Instala dependências do sistema
RUN apt-get update && apt-get install -y \
  build-essential \
  libffi-dev \
  nodejs \
  npm \
  && rm -rf /var/lib/apt/lists/*

# Cria diretório de trabalho
WORKDIR /srv/jekyll

# Copia os arquivos do projeto
COPY . .

# Instala as gems
RUN gem install bundler && bundle install
# Expõe a porta padrão do Jekyll
EXPOSE 4000

# Comando para iniciar o servidor Jekyll
CMD ["bundle", "exec", "jekyll", "serve", "--host", "0.0.0.0"]
