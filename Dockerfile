FROM node:8.9.3-alpine
WORKDIR /var/app/current
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
COPY . .
CMD ["npm", "run", "start"]