   


# Build Stage 1
# This build created a staging docker image
#
FROM node:18-bookworm-slim AS appbuild
ARG SOURCE_FOLDER="./"
ARG GITHUB_TOKEN
WORKDIR /usr/src
COPY ${SOURCE_FOLDER} .
RUN npm install -g pnpm@9
RUN pnpm install --frozen-lockfile
RUN pnpm nx run main-api:build


# Build Stage 2
# This build takes the production build from staging build
#
FROM node:18-bookworm-slim
WORKDIR /usr/apps
COPY --from=appbuild /usr/src/dist ./dist
COPY --from=appbuild /usr/src/node_modules ./node_modules
ENV PORT 8080
CMD node ./dist/apps/main/api/main.js
