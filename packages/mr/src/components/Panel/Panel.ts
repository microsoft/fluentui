import * as BABYLON from 'babylonjs';
import { Entity } from '../../common/nucleus3d/core/Entity';
import { IPanelProps, FluentTheme } from './Panel.types';
import { BlurMaterial } from '../../common/materials/BlurMaterial';

export class Panel extends Entity<IPanelProps> {
  protected didMount(): void {
    const layerSeparation: number = this.props.layerSeparation || 0.001;
    const depth: number = this.props.depth || 0.05;

    const blurPlane: BABYLON.Mesh = BABYLON.MeshBuilder.CreateBox(
      'blurPlane',
      {
        height: this.props.height,
        width: this.props.width,
        depth: depth
      },
      this.context.scene
    );
    blurPlane.parent = this.node;
    blurPlane.position.z += depth / 2 + layerSeparation * 2;
    blurPlane.alphaIndex = 1;
    Entity.for(blurPlane).mountComponent(new BlurMaterial());

    const tintPlane: BABYLON.Mesh = BABYLON.MeshBuilder.CreatePlane(
      'tintPlane',
      {
        height: this.props.height,
        width: this.props.width
      },
      this.context.scene
    );
    tintPlane.alphaIndex = 2;
    tintPlane.parent = this.node;
    tintPlane.position.z += layerSeparation;

    if (!this.props.receiveInput) {
      BABYLON.Tags.AddTagsTo(blurPlane, 'IgnoreInput');
      BABYLON.Tags.AddTagsTo(tintPlane, 'IgnoreInput');
    }

    const tintMat: BABYLON.StandardMaterial = new BABYLON.StandardMaterial('tintMat', this.context.scene);
    tintMat.backFaceCulling = false;
    tintMat.alpha = this.props.alpha || 0.6;
    tintMat.emissiveColor = this._getTintColor();
    tintMat.disableLighting = true;
    tintPlane.material = tintMat;
  }

  private _getTintColor(): BABYLON.Color3 {
    switch (this.props.theme) {
      case undefined:
      case FluentTheme.Light:
        return BABYLON.Color3.White();

      case FluentTheme.Dark:
        return BABYLON.Color3.Black();

      default:
        throw new Error('Unknown FluentTheme');
    }
  }
}
