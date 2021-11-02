import {
  ApplicationCommandOptionType,
  PartialApplicationCommand,
} from "https://deno.land/x/discord_slash_commands@1.0.6/src/structures/index.ts";

export const getWaifuCommand: PartialApplicationCommand = {
  description: "Retrieves your daily waifu picture",
  name: "waifu",
  options: [
    {
      name: "thicc",
      description: "should the waifu be _thicc_",
      type: ApplicationCommandOptionType.BOOLEAN,
    },
  ],
};

export const getWaifuPicture = async (): Promise<string> => {
  const resp = await fetch("https://api.waifu.pics/sfw/waifu");
  return (await resp.json())["url"];
};
