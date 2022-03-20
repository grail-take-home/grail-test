FROM node:alpine

RUN npm install -g pnpm

WORKDIR /usr/src/app

RUN ls

COPY package.json ./
COPY pnpm-lock.yaml ./
COPY prisma ./prisma/

RUN pnpm install

COPY . .

EXPOSE 5000
CMD ["pnpm", "start"]