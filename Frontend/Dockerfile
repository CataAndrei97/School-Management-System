FROM node:22

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5173

ENV CHOKIDAR_USEPOLLING=true
ENV WATCHPACK_POLLING=true
ENV CHOKIDAR_INTERVAL=1000

CMD ["npm", "run", "dev"]
