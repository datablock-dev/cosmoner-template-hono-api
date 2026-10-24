# Hono API on Cosmoner

[![Deploy to Cosmoner](https://cosmoner.com/deploy-button.svg)](https://cosmoner.com/deploy?repo=https://github.com/datablock-dev/cosmoner-template-hono-api)

A small TypeScript HTTP API built with [Hono](https://hono.dev) on Node.js,
ready to run as a web service on [Cosmoner](https://cosmoner.com).

| Route | Returns |
|-------|---------|
| `GET /health` | `{"status":"ok"}`, for health checks |
| `GET /api/hello?name=Ada` | A greeting |
| `GET /api/items` | A list of sample items |
| `GET /api/items/:id` | One item, or a 404 |

Routes are in `src/app.ts`; `src/index.ts` starts the server. The sample items
live in memory, so replace them with your own storage.

## Deploy

Select the button above, copy the template to your GitHub account, and deploy
your copy. The wizard can fill in every setting from
`.cosmoner/deployment.yaml`: a web service, built automatically from
`package.json`: `npm run build` compiles the TypeScript, and the `Procfile`
starts `node dist/index.js` directly, so the server receives the shutdown
signal on each redeploy and finishes in-flight requests.

Nothing needs configuring. The server listens on the port in the `PORT`
environment variable, which Cosmoner sets for you.

## Run locally

Requires Node.js 24.

```bash
npm install
npm run dev
```

The API answers on http://localhost:3000 and reloads when you save. To run the
compiled build:

```bash
npm run build
npm start
```

## License

MIT
