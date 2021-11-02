import {
  Application,
  Context,
  Router,
} from "https://deno.land/x/oak@v9.0.1/mod.ts";
import {
  CallbackType,
  InteractionResponse,
  InteractionType,
} from "./discord/types.ts";
import { getWaifuPicture } from "./services/mod.ts";
import { verifier } from "./verifier.ts";

export const app = new Application();

const commands = new Router();
commands.use(verifier);
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

app.use(
  commands.routes(),
  commands.allowedMethods(),
);
