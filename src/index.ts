import { serve } from "@hono/node-server";
import { app } from "./app.js";

// Cosmoner (and most hosts) pass the port in PORT.
const port = Number(process.env.PORT) || 3000;

const server = serve({ fetch: app.fetch, port }, (info) => {
  console.log(`Listening on port ${info.port}`);
});

// Finish in-flight requests before exiting when the platform stops the app.
for (const signal of ["SIGTERM", "SIGINT"] as const) {
  process.on(signal, () => {
    server.close(() => process.exit(0));
  });
}
