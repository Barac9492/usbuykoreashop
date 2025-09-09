# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Tech Stack

- **Framework**: React with TanStack Router (file-based routing)
- **Server**: Vinxi with tRPC for API endpoints
- **Database**: PostgreSQL with Prisma ORM
- **Styling**: Tailwind CSS
- **Forms**: React Hook Form with Zod validation
- **State Management**: TanStack Query for server state
- **Storage**: MinIO for object storage
- **Authentication**: JWT with bcryptjs for password hashing
- **AI Integration**: AI SDK with OpenRouter, Anthropic, Google, and OpenAI providers

## Development Commands

```bash
# Install dependencies and generate types
pnpm install

# Start development server
pnpm dev

# Type checking
pnpm typecheck

# Linting
pnpm lint

# Format code
pnpm format

# Database operations
pnpm db:generate    # Generate Prisma migrations
pnpm db:migrate     # Deploy migrations
pnpm db:push        # Push schema changes
pnpm db:studio      # Open Prisma Studio

# Production build
pnpm build
pnpm start
```

## Architecture Overview

### Project Structure

- `/src/routes/` - TanStack Router file-based routes
- `/src/server/trpc/` - tRPC server implementation
  - `procedures/` - Individual tRPC procedures
  - `root.ts` - tRPC router configuration
  - `handler.ts` - HTTP handler for tRPC
- `/src/components/` - React components
- `/src/trpc/` - tRPC client setup
- `/prisma/` - Database schema and migrations
- `/docker/` - Docker configuration for local development

### Key Patterns

1. **tRPC API**: All API endpoints are defined as tRPC procedures in `/src/server/trpc/procedures/`. The router is configured in `/src/server/trpc/root.ts`.

2. **Database Access**: Use Prisma client via `~/server/db`. The schema is defined in `/prisma/schema.prisma`.

3. **Routing**: Routes are file-based using TanStack Router. Files in `/src/routes/` automatically become routes.

4. **Authentication**: JWT-based authentication with procedures in `login.ts` and `register.ts`.

5. **Environment Variables**: Configured in `.env` file with validation in `/src/server/env.ts`.

### Docker Services

The application uses Docker Compose with the following services:
- PostgreSQL database
- Redis cache
- MinIO object storage
- Nginx reverse proxy
- Adminer database management

## Important Notes

- The application is a K-cosmetics marketplace connecting US buyers with Korean shoppers
- Path aliases use `~/*` for `/src/*`
- TypeScript strict mode is enabled
- The main entry point is configured in `app.config.ts` using Vinxi routers