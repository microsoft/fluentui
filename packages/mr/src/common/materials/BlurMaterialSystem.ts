import * as BABYLON from 'babylonjs';
import { System } from '../../common/nucleus3d/core';
import { BlurMaterial, BlurTexture } from '@uifabric/mr';

export class BlurMaterialSystem extends System {
  private _blurTexture: BlurTexture;

  constructor(texture: BlurTexture) {
    super(BlurMaterial);
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
