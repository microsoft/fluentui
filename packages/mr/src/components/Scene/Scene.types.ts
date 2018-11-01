import { SceneEntity } from '../../common/nucleus3d/core';

export interface ISceneProps {
  engineOptions?: BABYLON.EngineOptions;
  adaptToDeviceRatio?: boolean;
  sceneEntity: IFabricSceneEntity;
}

export interface IFabricSceneEntity extends SceneEntity {
  render(): void;
}
