### STAGE 1:BUILD ###
FROM node:16-alpine AS build

WORKDIR /dist/src/app
COPY package.json package-lock.json ./
RUN npm cache clean --force

COPY . .
RUN npm install
RUN npm run build --prod

### STAGE 2:RUN ###
FROM nginx:latest AS ngi
COPY --from=build /dist/src/app/dist /usr/share/nginx/html
COPY /nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
