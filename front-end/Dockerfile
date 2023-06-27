FROM node:16.14-alpine

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 3000

ENTRYPOINT ["npm", "run"]

CMD ["start"]
