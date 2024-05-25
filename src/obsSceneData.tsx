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

  const getGroupSourceUuid = (name: string) => config
    .groups
    .find((group: any) => group.name === "S4 Wrapper 2")
    .settings
    .items
    .find((item: any) => item.name === name)
    .uuid;

  const s4botUuid = getGroupSourceUuid("S4Bot");
  const topTextUuid = getGroupSourceUuid("Top Text");
  const watermarkUuid = getGroupSourceUuid("S4 Watermark");
  const s4wrapperUuid = config.groups.find((group: any) => group.name === "S4 Wrapper 2").uuid;

  return [
    {
      "name": "S4 Watermark",
      "source_uuid": watermarkUuid,
      "visible": true,
      "locked": false,
      "rot": 0.0,
      "pos": {
        "x": 1739.736572265625,
        "y": 892.44903564453125,
      },
      "scale": {
        "x": 0.037841796875,
        "y": 0.037841796875,
      },
      "align": 5,
      "bounds_type": 0,
      "bounds_align": 0,
      "bounds_crop": false,
      "bounds": {
        "x": 0.0,
        "y": 0.0,
      },
      "crop_left": 0,
      "crop_top": 0,
      "crop_right": 0,
      "crop_bottom": 0,
      "id": 9,
      "group_item_backup": true,
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
    {
      "name": "Top Text",
      "source_uuid": topTextUuid,
      "visible": true,
      "locked": false,
      "rot": 0.0,
      "pos": {
        "x": 615.0,
        "y": 34.0,
      },
      "scale": {
        "x": 1.3745019435882568,
        "y": 1.375,
      },
      "align": 5,
      "bounds_type": 0,
      "bounds_align": 0,
      "bounds_crop": false,
      "bounds": {
        "x": 0.0,
        "y": 0.0,
      },
      "crop_left": 0,
      "crop_top": 0,
      "crop_right": 0,
      "crop_bottom": 0,
      "id": 21,
      "group_item_backup": true,
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
    {
      "name": "S4 Wrapper 2",
      "source_uuid": s4wrapperUuid,
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
      "bounds_type": 2,
      "bounds_align": 0,
      "bounds_crop": false,
      "bounds": {
        "x": 1920.0,
        "y": 1080.0,
      },
      "crop_left": 0,
      "crop_top": 0,
      "crop_right": 0,
      "crop_bottom": 0,
      "id": 3,
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
      "private_settings": {
        "collapsed": true,
      },
    },
  ];
}
