# Use Node.js LTS version as base image for building
FROM node:18.19-alpine as builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --silent --legacy-peer-deps

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build


# Use Nginx as base image for serving the static files
FROM nginx:alpine

# Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy the build output from the builder stage to serve
COPY --from=builder /app/build /usr/share/nginx/html

# Copy the .htaccess file from the Dockerfile directory to Nginx configuration directory
COPY .htaccess /etc/nginx/conf.d/

# Expose port 80
EXPOSE 80

# Command to run Nginx
CMD ["nginx", "-g", "daemon off;"]
