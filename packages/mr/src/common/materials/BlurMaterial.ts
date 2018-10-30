import * as BABYLON from 'babylonjs';
import BlurTexture from '../textures/BlurTexture';

export default class BlurMaterial {
  private _acrylicMaterial: BABYLON.StandardMaterial;

  constructor(name: string, cameraExposure: number, scene: BABYLON.Scene) {
    this._acrylicMaterial = new BABYLON.StandardMaterial(name, scene);
    this._acrylicMaterial.refractionTexture = BlurTexture.instance(scene).texture;
    this._acrylicMaterial.disableLighting = true;
    this._acrylicMaterial.imageProcessingConfiguration = new BABYLON.ImageProcessingConfiguration();
    this._acrylicMaterial.cameraExposure = cameraExposure;
  }

  public get material(): BABYLON.StandardMaterial {
    return this._acrylicMaterial;
  }

  public dispose(acrylicMaterial: BABYLON.StandardMaterial): void {
    this._acrylicMaterial.dispose();
  }
}
