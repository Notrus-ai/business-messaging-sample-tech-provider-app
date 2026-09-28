FROM node:22-bookworm-slim

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

EXPOSE 3000

# HTTP inside Docker (mkcert HTTPS is for host `npm run dev`).
CMD ["npx", "next", "dev", "--turbopack", "-H", "0.0.0.0", "-p", "3000"]
