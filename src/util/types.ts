// deno-lint-ignore no-explicit-any
export type ObsSceneConfig = any;

export enum SceneType {
  Twitch = "TWITCH",
  Stream = "RTMP",
  PreRecord = "PRERECORD",
  Unknown = "UNKNOWN",
}
