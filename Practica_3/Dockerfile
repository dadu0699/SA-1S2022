### STAGE 1:BUILD ###
FROM node:14-alpine AS build
WORKDIR /dist/src/app
COPY package.json package-lock.json ./
RUN npm cache clean --force
COPY . .
ARG VITE_STUDENT1ID
ARG VITE_STUDENT1NICKNAME
ARG VITE_STUDENT1NAME
ARG VITE_STUDENT1IMG
ARG VITE_STUDENT2ID
ARG VITE_STUDENT2NICKNAME
ARG VITE_STUDENT2NAME
ARG VITE_STUDENT2IMG
RUN npm install
RUN npm run build --prod

### STAGE 2:RUN ###
FROM nginx:latest AS ngi
COPY --from=build /dist/src/app/dist /usr/share/nginx/html
COPY /nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
