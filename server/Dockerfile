# Use an official Node.js image as a base image

FROM node:18.19-alpine


# Set the working directory inside the container

WORKDIR /app



# Copy package.json and package-lock.json to the working directory

COPY package*.json ./



# Install project depend
RUN npm install --force


# Copy all project files to the working directory

COPY . .



# Copy the built application (assuming the build is in the 'build' directory)

COPY build/ ./build/




# Expose the port that the app will run on (use the port your app is configured to run on)

EXPOSE 8000
