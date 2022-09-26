FROM node:12

LABEL version="1.0"
LABEL description="Test Image for our Online Compiler"

WORKDIR /app

COPY package*.json ./

RUN apt update
RUN apt install gfortran -y
RUN apt install golang-go -y

RUN npm install

ENV PORT=8080

EXPOSE 8080

COPY . .

CMD ["npm", "run", "start"]