# Stage 1: Build the React app
FROM node:18-alpine as build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Stage 2: Serve the React app using nginx
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

# Optional: custom nginx config if needed
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
