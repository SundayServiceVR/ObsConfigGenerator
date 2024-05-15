import { ObsSceneConfig } from "../types.d.ts";
import base_config from "../scenes/base_config.json" with { type: "json" };

// deno-lint-ignore no-explicit-any
export type ObsSceneConfig = any;

export enum SceneType {
  Twitch = "Twitch",
  Stream = "Stream",
  PreRecord = "PreRecord",
}
export class S4ObsConfig {
  config: ObsSceneConfig;

  constructor(name: string) {
    this.config = { ...base_config };
    this.config.name = name;
  }

  public getConfig() {
    return JSON.stringify(this.config);
  }

  public addScene(
    name: string,
    type: SceneType,
    /**
     * Either the stream url, twitch username, or raw filepath
     */
    sourceValue: string,
  ) {
    if (this.config.current_scene === null) {
      this.config.current_scene = name;
      this.config.current_program_scene = name;
    }

    //Create and Add the Source
    const sourceName = `${type} Source - ${name}`;
    const source = createMediaSource(sourceName, type, sourceValue);
    this.config.sources.push(source);

    this.config.scene_order.push({ name });

    //Add the scene
    // const id = name;
    const uuid = crypto.randomUUID();
    this.config.sources.push({
      "prev_ver": 503316480,
      "name": name,
      "uuid": uuid,
      "id": "scene",
      "version_id": "scene",
      "settings": {
        "custom_size": false,
        "id_counter": 1000,
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
  }
}

function getSettingsForScenetype(type: SceneType, sourceValue: string) {
  if (type === SceneType.Stream) {
    return {
      id: "ffmpeg_source",
      version_id: "ffmpeg_source",
      settings: {
        "input": sourceValue,
        "input_format": "rtmp",
        "hw_decode": true,
        "is_local_file": false,
      },
    };
  }

  if (type === SceneType.Twitch) {
    return {
      "id": "browser_source",
      "versioned_id": "browser_source",
      "settings": {
        "url": `https://www.twitch.tv/${sourceValue}/embed?frameborder="0"`,
        "width": 1920,
        "height": 1080,
        "fps_custom": false,
        "reroute_audio": true,
      },
    };
  }

  throw new Error("Unsupported scene type");
}

function createMediaSource(name: string, type: SceneType, link: string) {
  const uuid = crypto.randomUUID();
  const sceneSettings = getSettingsForScenetype(type, link);

  const mediaSource = {
    "prev_ver": 503316480,
    "name": name,
    "uuid": uuid,
    ...sceneSettings,
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
