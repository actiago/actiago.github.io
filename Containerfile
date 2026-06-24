FROM ruby:3.2-slim

# Instala dependências do sistema (apenas o essencial para Jekyll)
RUN apt-get update && apt-get install -y \
  build-essential \
  libffi-dev \
  && rm -rf /var/lib/apt/lists/*

# Cria diretório de trabalho
WORKDIR /srv/jekyll

# Copia os arquivos do projeto
COPY Gemfile Gemfile.lock* ./

# Instala as gems
RUN gem install bundler && bundle install

# Copia o restante do projeto
COPY . .

# Expõe a porta padrão do Jekyll
EXPOSE 4000

# Comando para iniciar o servidor Jekyll
CMD ["bundle", "exec", "jekyll", "serve", "--host", "0.0.0.0"]
