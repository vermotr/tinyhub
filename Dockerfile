FROM node:21-slim AS builder

RUN corepack enable

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
COPY . /app
WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

COPY . .
RUN pnpm run build

FROM nginx:alpine

COPY docker/nginx.conf /etc/nginx/nginx.conf

COPY --from=builder /app/dist /app

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]