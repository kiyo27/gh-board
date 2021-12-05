FROM node:17-bullseye-slim

LABEL org.opencontainers.image.source https://github.com/kiyo27/gh-project-terminal-viewer

# Environment variables
ENV LANG='ja_JP.UTF-8'

# Set build directory
WORKDIR /usr/app

# Copy files necessary for build
COPY src src
COPY package.json package.json
COPY app.js app.js

RUN npm install

ENTRYPOINT ["node"]
CMD ["app.js"]