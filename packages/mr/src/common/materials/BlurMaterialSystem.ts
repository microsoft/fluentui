import * as BABYLON from 'babylonjs';

import { System } from '../nucleus3d/core/System';
import { BlurTexture } from '../textures/BlurTexture';
import { BlurMaterial } from './BlurMaterial';

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
