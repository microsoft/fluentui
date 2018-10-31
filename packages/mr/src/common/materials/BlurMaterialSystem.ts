import * as BABYLON from 'babylonjs';
import { System } from '../../common/nucleus3d/core';
import BlurMaterialComponent from './BlurMaterial';
import BlurTexture from '../textures/BlurTexture';

export default class BlurMaterialSystem extends System {
  private _blurTexture: BlurTexture;

  constructor(texture: BlurTexture) {
    super(BlurMaterialComponent);
    this._blurTexture = texture;
  }

  public createBlurMaterial(name: string): BABYLON.StandardMaterial {
    const blurMaterial: BABYLON.StandardMaterial = new BABYLON.StandardMaterial(name, this.context.scene);
    blurMaterial.refractionTexture = this._blurTexture.texture;
    blurMaterial.disableLighting = true;
    blurMaterial.imageProcessingConfiguration = new BABYLON.ImageProcessingConfiguration();
    blurMaterial.imageProcessingConfiguration.exposure = 1;
    return blurMaterial;
  }

  public disposeBlurMaterial(blurMaterial: BABYLON.StandardMaterial): void {
    blurMaterial.refractionTexture = null;
    blurMaterial.dispose();
  }
}
