# Stage 1: Install dependencies and build Prisma
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy Prisma schema
COPY . .

# Generate Prisma client
RUN npx prisma generate

RUN npm run build

# Stage 2: Run the app
FROM node:20-alpine AS production

# Set working directory
WORKDIR /app

# Copy only the necessary files from builder stage
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY package.json .

# Expose the application port
EXPOSE 3000

# Run the application
CMD ["node", "dist/server.js"]
