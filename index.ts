import { app } from "./src/app.ts";

const listener = Deno.listen({ hostname: "localhost", port: 8080 });

for await (const conn of listener) {
  (async () => {
    const requests = Deno.serveHttp(conn);
    for await (const { request, respondWith } of requests) {
      const response = await app.handle(request, conn);
      if (response) {
        respondWith(response);
      }
    }
  });
}
