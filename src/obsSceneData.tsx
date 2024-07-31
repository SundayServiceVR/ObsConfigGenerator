import { ObsSceneConfig, SceneType } from "./util/types.ts";

export const sceneTemplate = (source: any, sceneName: string) => {
  return {
    "prev_ver": 503316480,
    "name": sceneName,
    "uuid": crypto.randomUUID(),
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
  };
};

export function getSettingsForScenetype(
  type: SceneType,
  mediaSourceUrl: string,
) {
  if (type === SceneType.Stream) {
    return {
      "id": "ffmpeg_source",
      "version_id": "ffmpeg_source",
      "settings": {
        "input": mediaSourceUrl,
        "input_format": "rtmp",
        "hw_decode": true,
        "is_local_file": false,
        "restart_on_activate": false,
        "clear_on_media_end": false,
      },
    };
  }

  if (type === SceneType.Twitch) {
    return {
      "id": "browser_source",
      "versioned_id": "browser_source",
      "settings": {
        "url": mediaSourceUrl,
        "width": 1920,
        "height": 1080,
        "fps_custom": false,
        "reroute_audio": true,
      },
    };
  }

  if (type === SceneType.PreRecord) {
    return {
      "settings": {
        "is_local_file": false,
        "input": mediaSourceUrl,
        "input_format": "mp4",
        "restart_on_activate": false,
        "clear_on_media_end": false,
      },
    };
  }

  if (type === SceneType.Unknown) {
    return {
      "settings": {
        "is_local_file": false,
        "input": "",
        "input_format": "",
        "restart_on_activate": false,
        "clear_on_media_end": false,
      },
    };
  }

  throw new Error("Unsupported scene type");
}

export function createMediaSource(name: string, sceneSettings: any) {
  return {
    "prev_ver": 503316480,
    "name": name,
    "uuid": crypto.randomUUID(),
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
}

export function goodiesSceneSources(config: ObsSceneConfig) {

  const goodiesSceneName = "--(Do Not Stream Directly) Optional Goodies--";

  function getGoodiesSceneUuid() {
    return config.sources.find((source: any) => source.name === goodiesSceneName).uuid
  }

  return [
    {
      "name": goodiesSceneName,
      "source_uuid": getGoodiesSceneUuid(),
      "visible": true,
      "locked": false,
      "rot": 0.0,
      "pos": {
          "x": 0.0,
          "y": 0.0
      },
      "scale": {
          "x": 1.0,
          "y": 1.0
      },
      "align": 5,
      "bounds_type": 0,
      "bounds_align": 0,
      "bounds_crop": false,
      "bounds": {
          "x": 0.0,
          "y": 0.0
      },
      "crop_left": 0,
      "crop_top": 0,
      "crop_right": 0,
      "crop_bottom": 0,
      "id": 1001,
      "group_item_backup": false,
      "scale_filter": "disable",
      "blend_method": "default",
      "blend_type": "normal",
      "show_transition": {
          "duration": 0
      },
      "hide_transition": {
          "duration": 0
      },
      "private_settings": {}
    }
  ]
}
