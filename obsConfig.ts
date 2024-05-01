import { ObsSceneConfig } from "./types.d.ts";

// "rtmp://stream.vrcdn.live/live/lebull"

export enum SceneType {
  Twitch = "Twitch",
  Stream = "Stream",
  PreRecord = "PreRecord",
}

export function addScene(
  name: string,
  type: SceneType,
  link: string,
  config: ObsSceneConfig,
) {
  const guid = "9bd21294-2d85-4709-8d06-41e533c3ea52";
  const sourceName = `${type} Source - ${name}`;

  //Add the Source
  const source = createMediaSource(sourceName, type, link);
  config.sources.push(source);

  //Add the scene
  const id = "scene";
  config.sources.push({
    "prev_ver": 503316480,
    "name": name,
    "uuid": guid,
    "id": id,
    "versioned_id": id,
    "settings": {
      "custom_size": false,
      "id_counter": 9,
      "items": [
        {
          "name": source.name,
          "source_uuid": source.uuid,
          "visible": true,
          "locked": false,
          "rot": 0.0,
          "pos": {
            "x": 0.0,
            "y": 0.0,
          },
          "scale": {
            "x": 1.0,
            "y": 1.0,
          },
          "align": 5,
          "bounds_type": 0,
          "bounds_align": 0,
          "bounds": {
            "x": 0.0,
            "y": 0.0,
          },
          "crop_left": 0,
          "crop_top": 0,
          "crop_right": 0,
          "crop_bottom": 0,
          "id": 9,
          "group_item_backup": false,
          "scale_filter": "disable",
          "blend_method": "default",
          "blend_type": "normal",
          "show_transition": {
            "duration": 0,
          },
          "hide_transition": {
            "duration": 0,
          },
          "private_settings": {},
        },
      ],
    },
    "mixers": 0,
    "sync": 0,
    "flags": 0,
    "volume": 1.0,
    "balance": 0.5,
    "enabled": true,
    "muted": false,
    "push-to-mute": false,
    "push-to-mute-delay": 0,
    "push-to-talk": false,
    "push-to-talk-delay": 0,
    "hotkeys": {
      "OBSBasic.SelectScene": [],
      "libobs.show_scene_item.9": [],
      "libobs.hide_scene_item.9": [],
    },
    "deinterlace_mode": 0,
    "deinterlace_field_order": 0,
    "monitoring_type": 0,
    "private_settings": {},
  });

  return config;
}

function createMediaSource(name: string, type: SceneType, link: string) {
  const uuid = crypto.randomUUID();
  const id = "ffmpeg_source";

  if (type !== SceneType.Stream) {
    throw new Error("Unsupported scene type");
  }

  const settings = {
    "input": link,
    "input_format": "rtmp",
    "hw_decode": true,
    "is_local_file": false,
  };

  const mediaSource = {
    "prev_ver": 503316480,
    "name": name,
    "uuid": uuid,
    "id": id,
    "versioned_id": id,
    "settings": settings,
    "mixers": 255,
    "sync": 0,
    "flags": 0,
    "volume": 1.0,
    "balance": 0.5,
    "enabled": true,
    "muted": false,
    "push-to-mute": false,
    "push-to-mute-delay": 0,
    "push-to-talk": false,
    "push-to-talk-delay": 0,
    "hotkeys": {
      "libobs.mute": [],
      "libobs.unmute": [],
      "libobs.push-to-mute": [],
      "libobs.push-to-talk": [],
      "MediaSource.Restart": [],
      "MediaSource.Play": [],
      "MediaSource.Pause": [],
      "MediaSource.Stop": [],
    },
    "deinterlace_mode": 0,
    "deinterlace_field_order": 0,
    "monitoring_type": 0,
    "private_settings": {},
  };

  return mediaSource;
}
