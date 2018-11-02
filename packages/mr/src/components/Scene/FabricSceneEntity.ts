import * as BABYLON from 'babylonjs';
import { IFabricSceneEntity } from './Scene.types';
import { BlurTexture } from '../../common/textures/BlurTexture';
import { BlurMaterialSystem } from '../../common/materials/BlurMaterialSystem';
import { SceneEntity } from '../../common/nucleus3d/core/common/SceneEntity';

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
