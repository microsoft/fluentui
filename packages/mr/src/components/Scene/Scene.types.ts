import { SceneEntity } from '../../common/nucleus3d/core/common/SceneEntity';

export interface ISceneProps {
  engineOptions?: BABYLON.EngineOptions;
  adaptToDeviceRatio?: boolean;
  sceneEntity: IFabricSceneEntity;
}

export interface IFabricSceneEntity extends SceneEntity {
  render(): void;
}
