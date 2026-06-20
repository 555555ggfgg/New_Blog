# Blog System

A monorepo blog system built with Vue 3, Express.js, and shared packages.

## Project Structure

```
blog-system/
├── client/              # Main blog frontend (Vue 3 + Vite)
├── server/              # Backend API (Express.js)
├── hitokoto-sdk/        # Hitokoto API SDK
├── scratch-editor/      # Visual programming editor (Vue 3 + Vite)
├── vue-hitokoto/        # Vue composable for hitokoto
├── package.json         # Root workspace config
├── pnpm-workspace.yaml  # PNPM workspace config
└── README.md            # This file
```

## Features

- **Client**: Modern Vue 3 SPA with Vite
- **Server**: RESTful API with Express.js
- **Hitokoto SDK**: Fetch random quotes from Hitokoto API
- **Scratch Editor**: Visual block-based editor
- **Vue Hitokoto**: Vue 3 composable for hitokoto integration

## Prerequisites

- Node.js 18+
- PNPM 8+

## Quick Start

### Install dependencies

```bash
pnpm install
```

### Development

Run all packages in development mode:

```bash
# Start client (port 3000) and server (port 3001) concurrently
pnpm dev

# Or run individually
pnpm dev:client  # Vue dev server on http://localhost:3000
pnpm dev:server  # Express API on http://localhost:3001
pnpm --filter=scratch-editor dev  # Scratch editor on http://localhost:3002
```

### Build

Build all packages for production:

```bash
pnpm build
```

## Package Details

### Client (`client/`)

Vue 3 + Vite single-page application.

**Scripts:**
- `pnpm dev` - Start dev server (port 3000)
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build

**Tech Stack:** Vue 3, Vite, Vue Router (optional)

### Server (`server/`)

Express.js REST API server.

**Scripts:**
- `pnpm dev` - Start with auto-reload (port 3001)
- `pnpm start` - Production start

**Endpoints:**
- `GET /api/health` - Health check

**Environment Variables** (`.env`):
```
PORT=3001
```

### Hitokoto SDK (`hitokoto-sdk/`)

TypeScript/JavaScript client for [Hitokoto API](https://hitokoto.cn/).

**Usage:**
```js
import { fetchHitokoto } from 'hitokoto-sdk'

const quote = await fetchHitokoto()
console.log(quote.hitokoto) // "随机一言"
```

### Scratch Editor (`scratch-editor/`)

Visual block-based programming editor built with Vue 3.

**Scripts:**
- `pnpm dev` - Start dev server (port 3002)
- `pnpm build` - Build for production

### Vue Hitokoto (`vue-hitokoto/`)

Vue 3 composable for integrating Hitokoto quotes.

**Usage:**
```vue
<script setup>
import { useHitokoto } from 'vue-hitokoto'

const { hitokoto, loading, fetchHitokoto } = useHitokoto()
</script>

<template>
  <blockquote v-if="hitokoto">{{ hitokoto }}</blockquote>
  <button @click="fetchHitokoto" :disabled="loading">
    {{ loading ? 'Loading...' : 'New Quote' }}
  </button>
</template>
```

## Environment Setup

Create `.env` files in each package as needed:

```bash
# server/.env
PORT=3001
DATABASE_URL=your_database_url
JWT_SECRET=your_secret

# client/.env
VITE_API_URL=http://localhost:3001/api
```

## Monorepo Management

This project uses PNPM workspaces for dependency management.

**Add a dependency to a specific package:**
```bash
pnpm add <package> --filter=client
pnpm add -D <package> --filter=server
```

**Add a dependency to all packages:**
```bash
pnpm add <package> -w
```

**Run commands across packages:**
```bash
pnpm -r <command>     # Run in all packages
pnpm --filter=client <command>  # Run in specific package
```

## Deployment

### Docker (Recommended)

```dockerfile
# Dockerfile example for client
FROM node:18-alpine
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --prod
COPY . .
RUN pnpm build --filter=client
EXPOSE 3000
CMD ["pnpm", "preview", "--filter=client"]
```

### Manual Deployment

1. Build all packages: `pnpm build`
2. Deploy `client/dist` to static hosting (Vercel, Netlify, Nginx)
3. Deploy `server/` to Node.js hosting (Railway, Render, PM2)
4. Configure reverse proxy for API routes

## License

AGPL-3.0 License - See [LICENSE](LICENSE) for details.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## Support

For issues and feature requests, please use the [GitHub Issues](https://github.com/555555ggfgg/New_Blog/issues) page.
