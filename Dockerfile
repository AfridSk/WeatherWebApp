FROM node:latest
WORKDIR ./app
COPY package*.json ./
RUN npm install 
COPY . .
EXPOSE 7060
CMD ["node","app.js"] 