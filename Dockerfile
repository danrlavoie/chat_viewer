# Build stage for React frontend
FROM node:20-slim AS frontend-build
WORKDIR /app/frontend
COPY ./src ./src
COPY ./public ./public
COPY ./package*.json ./
COPY ./tsconfig.json ./
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

# Copy config directory (excluding sensitive files)
COPY ./config ./config

# Create directory for chat data
RUN mkdir -p /app/data/GoogleChat/Groups

# Expose ports
EXPOSE 3000 5000

# Create start script
RUN echo '#!/bin/sh\n\
cd /app/backend && node dist/server.js & \n\
cd /app/frontend && npx serve -s build -l 3000\n\
wait' > /app/start.sh && chmod +x /app/start.sh

CMD ["/app/start.sh"]