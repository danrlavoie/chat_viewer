# Build stage for React frontend
FROM node:20-slim AS frontend-build
WORKDIR /app/frontend
COPY ./frontend/src ./src
COPY ./frontend/public ./public
COPY ./frontend/package*.json ./
COPY ./frontend/tsconfig.json ./
RUN npm install
RUN npm run build

# Build stage for Express backend
FROM node:20-slim AS backend-build
WORKDIR /app/backend
COPY ./server/src ./src
COPY ./server/package*.json ./
COPY ./server/tsconfig.json ./
RUN npm install
RUN npm run build

# Production stage
FROM node:20-slim
WORKDIR /app

# Copy built frontend
COPY --from=frontend-build /app/frontend/build ./frontend/build

# Copy built backend
COPY --from=backend-build /app/backend/dist ./backend/dist
COPY --from=backend-build /app/backend/node_modules ./backend/node_modules
COPY --from=backend-build /app/backend/package*.json ./backend/

# Only expose backend port
EXPOSE 5000

# Simplify start script to only run the backend
RUN echo '#!/bin/sh\n\
cd /app/backend && node dist/index.js' > /app/start.sh && chmod +x /app/start.sh

CMD ["/app/start.sh"]