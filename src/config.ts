type Configuration = {
  publicKey: string;
  port: string;
};

export const config: Configuration = {
  publicKey: Deno.env.get("APP_PUBLIC_KEY") ?? "",
  port: Deno.env.get("APP_PORT") ?? "8080",
};
