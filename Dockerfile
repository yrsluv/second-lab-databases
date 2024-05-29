FROM node:20.13.1-alpine as dependencies
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm i

FROM node:20.13.1-alpine as builder
WORKDIR /app
COPY . .
COPY --from=dependencies /app/node_modules ./node_modules
RUN npm run prisma
RUN npm run build

FROM node:20.13.1-alpine as runner
WORKDIR /app
ENV NODE_ENV production

COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
