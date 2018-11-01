import * as BABYLON from 'babylonjs';
import { SceneEntity } from '../../common/nucleus3d/core';
import { BlurMaterialSystem, BlurTexture } from '@uifabric/mr';
import { IFabricSceneEntity } from './Scene.types';

export abstract class FabricSceneEntity extends SceneEntity implements IFabricSceneEntity {
  private _blurTexture: BlurTexture;

  public didMount(): void {
    this._blurTexture = new BlurTexture(this.context.scene);
    this.registerSystem(new BlurMaterialSystem(this._blurTexture));
    this.render();
  }

  public addEnvironmentMeshes(meshes: BABYLON.AbstractMesh[]): void {
    meshes.forEach((mesh: BABYLON.AbstractMesh) => {
      this._blurTexture.add(mesh);
    });
  }

  public abstract render(): void;
}
