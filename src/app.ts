import {
  Application,
  Context,
  etag,
  Router,
} from "https://deno.land/x/oak@v9.0.1/mod.ts";
import logger from "https://deno.land/x/oak_logger@1.0.0/mod.ts";
import {
  CallbackType,
  InteractionResponse,
  InteractionType,
} from "./discord/types.ts";
import { getWaifuPicture } from "./services/mod.ts";
import { verifier } from "./verifier.ts";

export const app = new Application();

// Add basic logging
app.use(logger.logger);
// Add response time logging.
app.use(logger.responseTime);
// Add etag support to reduce caching.
app.use(etag.factory());

// Add discord commands
const commands = new Router();
// Add healthz endpoint before verification
commands.all("/healthz", (ctx: Context) => {
  ctx.response.body = "OK";
});
// Add verification for all discord webhook reqs
commands.use(verifier);
// TODO(oatovar): refactor this to use a slash command
// router.
commands.all("/", async (ctx: Context) => {
  const interaction = JSON.parse(
    ctx.response.body?.toString() ?? "",
  );
  const type = interaction.type;
  if (type === InteractionType.PING) {
    ctx.response.body = { type: CallbackType.PONG };
    return;
  }

  if (type === InteractionType.APPLICATION_COMMAND) {
    const imgURL = await getWaifuPicture();
    const response: InteractionResponse = {
      type: CallbackType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        content: imgURL,
      },
    };
    ctx.response.body = response;
    return;
  }

  ctx.throw(400);
});

// Add routes
app.use(
  commands.routes(),
  commands.allowedMethods(),
);
