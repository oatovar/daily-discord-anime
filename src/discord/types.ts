export enum InteractionType {
  PING = 1,
  APPLICATION_COMMAND = 2,
  MESSAGE_COMPONENT = 3,
  APPLICATION_COMMAND_AUTOCOMPLETE = 4,
}

export type InteractionResponse = {
  type: CallbackType;
  data?: CallbackData;
};

export enum CallbackType {
  PONG = 1,
  CHANNEL_MESSAGE_WITH_SOURCE = 4,
  DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE = 5,
  DEFERRED_UPDATE_MESSAGE = 6,
  UPDATE_MESSAGE = 7,
  APPLICATION_COMMAND_AUTOCOMPLETE_RESULT = 8,
}

export type CallbackData = {
  tts?: boolean;
  content?: string;
  // embeds?: Embed[];
  allowed_mentions?: AllowedMentionType;
  flags?: number;
};

// export type Embed = {};

export enum AllowedMentionType {
  RoleMentions = "roles",
  UserMentions = "users",
  EveryoneMentions = "everyone",
}
