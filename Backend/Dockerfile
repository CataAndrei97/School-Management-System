FROM node:22
WORKDIR /app

RUN [ ! -f package.json ] && npm init -y

RUN npm install
RUN npm install express cors dotenv
RUN npm install -g nodemon

COPY . .

EXPOSE 4000

CMD ["npm", "run", "dev"]
