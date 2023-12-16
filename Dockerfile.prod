# Stage 1: Build the React application
FROM node:14 as build

WORKDIR /app

# Copy package.json and package-lock.json to Docker environment
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app's source code from the host to the image filesystem
COPY . .

# Build the application
RUN npm run build

# Stage 2: Serve the app from Nginx server
FROM nginx:alpine

# Copy the build output to replace the default nginx contents
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 to the host so that nginx can receive requests
EXPOSE 80

# Start Nginx and keep it running
CMD ["nginx", "-g", "daemon off;"]
