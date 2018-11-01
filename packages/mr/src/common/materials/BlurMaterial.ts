import { Component } from '../../common/nucleus3d/core';
import { BlurMaterialSystem } from './BlurMaterialSystem';

export interface IBlurMaterialProps {}

export class BlurMaterial extends Component<IBlurMaterialProps, BlurMaterialSystem> {
  private _material: BABYLON.StandardMaterial;

  protected didMount(): void {
    if (this.system) {
      this._material = this.system.createBlurMaterial('blurMaterial');
    }
    this.entity.node.material = this._material;
  }

  protected willUnmount(): void {
    if (this.system) {
      this.system.disposeBlurMaterial(this._material);
    }
  }
}
