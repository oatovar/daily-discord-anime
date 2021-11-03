import { Context } from "https://deno.land/x/oak@v9.0.1/mod.ts";
import { sign_detached_verify as signDetachedVerify } from "https://deno.land/x/tweetnacl_deno_fix@1.1.2/src/sign.ts";
import Buffer from "https://deno.land/std@0.76.0/node/buffer.ts";
import { config } from "./config.ts";

export const isVerified = (
  publicKey: string,
  signature: string,
  timestamp: string,
  rawBody: string,
): boolean => {
  try {
    return signDetachedVerify(
      Buffer.from(timestamp + rawBody),
      Buffer.from(signature, "hex"),
      Buffer.from(publicKey, "hex"),
    );
  } catch (err) {
    console.error(err.error);
    return false;
  }
};

export const verifier = (ctx: Context) => {
  const signature = ctx.request.headers.get("X-Signature-Ed25519");
  const timestamp = ctx.request.headers.get("X-Signature-Timestamp");
  const body = ctx.response.body ? ctx.response.body.toString() : "";

  if (signature === null || timestamp === null) {
    ctx.throw(401);
  }
  if (!isVerified(config.publicKey, signature, timestamp, body)) {
    ctx.throw(401);
  }
};
