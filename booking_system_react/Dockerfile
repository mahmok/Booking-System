# build environment
FROM node:alpine as build
WORKDIR /app
COPY . .
RUN yarn install && yarn build

# production environment
FROM nginx:stable-alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=build /app/build .
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 3005
CMD ["nginx", "-g", "daemon off;"]