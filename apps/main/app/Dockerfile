# Build Stage 1
# This build created a staging docker image
#
FROM node:18 AS appbuild
ARG SOURCE_FOLDER="./"
ARG GITHUB_TOKEN
WORKDIR /usr/src
COPY ${SOURCE_FOLDER} .
RUN npm install -g pnpm@9
RUN pnpm install --frozen-lockfile
RUN pnpm nx run main-app:build --base-href /demo-app/

# Build Stage 2
# This build takes the production build from staging build
FROM ghcr.io/jamilomar/docker-base-web:latest
RUN rm /etc/nginx/conf.d/default.conf
COPY --from=appbuild /usr/src/apps/main/app/app-nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=appbuild /usr/src/apps/main/app/app.config.js /var/www/app/app.config.js
COPY --from=appbuild /usr/src/dist/apps/main/app/ /var/www/app/server
EXPOSE 8080