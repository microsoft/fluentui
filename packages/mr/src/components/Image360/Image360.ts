import * as BABYLON from 'babylonjs';
import { Entity } from '../../common/nucleus3d/core/Entity';
import { ContextualMenu } from '../ContextualMenu/ContextualMenu';
import { IImage360 } from './Image360.types';

export class Image360 extends Entity<IImage360> {
  private _image: BABYLON.PhotoDome;
  private _menu: ContextualMenu;
  private _url: string;

  constructor(url: string) {
    super();
    this._url = url;
  }

  protected onPropsUpdated(oldProps: IImage360): void {
    if (oldProps.actions !== this.props.actions) {
      this.props.actions && this._menu.updateActions(this.props.actions);
    }
    if (oldProps.description !== this.props.description) {
      this._menu.updateProps({ description: this.props.description });
    }
    if (oldProps.menuVisible !== this.props.menuVisible) {
      if (this.props.menuVisible) {
        this._menu.show();
      } else {
        this._menu.hide();
      }
    }
  }

  protected didMount(): void {
    this._image = new BABYLON.PhotoDome(
      'Image360',
      this._url,
      {
        resolution: 16
      },
      this.context.scene
    );
    this._menu = new ContextualMenu({ description: this.props.description });
    this.mountChild(this._menu);
    this._menu.node.position = this.context.scene.activeCamera!.position.add(new BABYLON.Vector3(0, 0, 1.5));
    this._menu.node.scaling.scaleInPlace(2);

    this._image.onReady = () => this.props.onReady && this.props.onReady();

    this.context.scene.onPointerUp = (evt: PointerEvent, pickInfo: BABYLON.PickingInfo) => {
      if (pickInfo && pickInfo.ray) {
        this.props.onClick && this.props.onClick(pickInfo);
        this._positionMenu(pickInfo.ray);
      }
    };
  }

  private _positionMenu(ray: BABYLON.Ray): void {
    this._menu.node.position = this.context.scene.activeCamera!.position.add(ray.direction.scale(1.5));
    this._menu.node.billboardMode = BABYLON.TransformNode.BILLBOARDMODE_Y;
  }
}
