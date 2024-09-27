# Use a Node.js official image
FROM node:20

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the project files into the Docker container
COPY . .

# Expose the default React Native development port
EXPOSE 8081

# Run Metro bundler
CMD ["yarn", "start"]