import base_config from "../../scenes/base_config.json" with { type: "json" };
import {
  createMediaSource,
  getSettingsForScenetype,
  goodiesSceneSources,
  sceneTemplate,
} from "../obsSceneData.tsx";
import { ObsSceneConfig, SceneType } from "./types.ts";

export class S4ObsConfig {
  config: ObsSceneConfig;

  constructor(name: string) {
    this.config = { ...base_config, "sources": [...endingSong.sources, ...intermissionBumper.sources, ...overlay.sources, ...source_s4LogoAnimated.sources] };
    this.config.name = name;
  }

  public getConfig() {
    return JSON.stringify(this.config);
  }

  public addScene(
    index: number,
    name: string,
    type: SceneType,
    /**
     * Either the stream url, twitch username, or raw filepath
     */
    mediaSourceUrl: string,
  ) {
    const calculatedName = `${index + 1}. ${name} (${
      mediaSourceUrl === "" ? "MANUAL SOURCE " : ""
    }${type.toLocaleLowerCase()})`;

    if (this.config.current_scene === null) {
      this.config.current_scene = calculatedName;
      this.config.current_program_scene = calculatedName;
    }

    //Create and Add the
    const sourceName = `${name} - ${type}`;
    const source = createMediaSource(
      sourceName,
      getSettingsForScenetype(type, mediaSourceUrl),
    );
    this.config.sources.push(source);

    this.config.scene_order.splice(index, 0, { name: calculatedName }); // Insert, pushing other scenes down.

    const newScene = sceneTemplate(source, calculatedName);

    //Add Goodies (s4 bot, watermark, text, etc...)
    goodiesSceneSources(this.config).forEach((sourceEntry) => {
      newScene.settings.items.push(sourceEntry);
    });

    this.config.sources.push(newScene);
  }
}
