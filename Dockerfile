# Build stage
FROM node:lts-alpine AS builder

ENV NEXT_TELEMETRY_DISABLED=1

WORKDIR /app

# Install yarn
RUN apk add --no-cache yarn

# Copy package files
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy source code
COPY . .

# Build application
RUN yarn build

# Production stage
FROM node:lts-alpine AS runner

WORKDIR /app

# Install yarn
RUN apk add --no-cache yarn

# Copy necessary files from builder
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Expose the port Next.js runs on
EXPOSE 3000

# Set environment variables
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
ENV PORT=3000

# Command to run the application
CMD ["node", "server.js"]