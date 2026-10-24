import { Hono } from "hono";
import { logger } from "hono/logger";

type Item = { id: number; name: string; done: boolean };

// Sample data so the routes have something to return. Replace it with your
// own storage: this list lives in memory and resets when the process restarts.
const items: Item[] = [
  { id: 1, name: "Deploy this API", done: true },
  { id: 2, name: "Add a route of your own", done: false },
];

export const app = new Hono();

app.use(logger());

app.get("/", (c) =>
  c.json({
    name: "cosmoner-template-hono-api",
    routes: ["GET /health", "GET /api/hello?name=", "GET /api/items", "GET /api/items/:id"],
  }),
);

app.get("/health", (c) => c.json({ status: "ok" }));

app.get("/api/hello", (c) => {
  const name = c.req.query("name")?.trim() || "world";
  return c.json({ message: `Hello, ${name.slice(0, 100)}!` });
});

app.get("/api/items", (c) => c.json({ items }));

app.get("/api/items/:id", (c) => {
  const item = items.find((i) => String(i.id) === c.req.param("id"));
  if (!item) return c.json({ error: "Item not found" }, 404);
  return c.json(item);
});

app.notFound((c) => c.json({ error: "Not found" }, 404));

app.onError((err, c) => {
  console.error(err);
  return c.json({ error: "Internal server error" }, 500);
});
