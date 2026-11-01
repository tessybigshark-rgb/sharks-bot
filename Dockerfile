# syntax=docker/dockerfile:1

FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

ENV NODE_ENV=production
ENV PORT=4000

HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD node -e "const port = process.env.PORT || 4000; fetch('http://localhost:' + port + '/health').then(r => process.exit(r.ok ? 0 : 1)).catch(() => process.exit(1));" || exit 1

EXPOSE 4000

CMD ["npm", "run", "start"]
