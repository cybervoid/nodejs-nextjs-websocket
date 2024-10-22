# Use the official Node.js 18 LTS image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application source code
COPY src/ ./src
COPY public/ ./public
COPY next.config.mjs ./

# Build the Next.js application
RUN npm run build

# Expose the port the app will run on
EXPOSE 3000

# Start the Next.js application
CMD ["npm", "run", "start"]