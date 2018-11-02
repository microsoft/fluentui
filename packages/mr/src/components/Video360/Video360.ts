import * as BABYLON from 'babylonjs';
import { Entity } from '../../common/nucleus3d/core/Entity';
import { ContextualMenu } from '../ContextualMenu/ContextualMenu';
import { IVideo360, Video360Mode } from './Video360.types';

export class Video360 extends Entity<IVideo360> {
  private _video: BABYLON.VideoDome;
  private _menu: ContextualMenu;
  private _url: string;

  constructor(url: string) {
    super();
    this._url = url;
  }

  protected onPropsUpdated(oldProps: IVideo360): void {
    if (oldProps.actions !== this.props.actions) {
      this.props.actions && this._menu.updateActions(this.props.actions);
    }
    if (oldProps.mode !== this.props.mode) {
      if (this.props.mode === Video360Mode.Play) {
        this._video.videoTexture.video.play();
      } else {
        this._video.videoTexture.video.pause();
      }
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
    this._video = new BABYLON.VideoDome(
      'Video360',
      [this._url],
      {
        resolution: 16,
        clickToPlay: false
      },
      this.context.scene
    );
    this._menu = new ContextualMenu({ description: this.props.description });
    this.mountChild(this._menu);
    this._menu.node.position = this.context.scene.activeCamera!.position.add(new BABYLON.Vector3(0, 0, 1.5));
    this._menu.node.scaling.scaleInPlace(2);

    this._video.onReady = () => this.props.onReady && this.props.onReady();

    this.context.scene.onPointerUp = (evt: PointerEvent, pickInfo: BABYLON.PickingInfo) => {
      if (!this._menu.isShowing && pickInfo && pickInfo.ray) {
        this.props.onClick!(pickInfo);
        this._positionMenu(pickInfo.ray);
      }
    };
  }

  private _positionMenu(ray: BABYLON.Ray): void {
    this._menu.node.position = this.context.scene.activeCamera!.position.add(ray.direction.scale(1.5));
    this._menu.node.billboardMode = BABYLON.TransformNode.BILLBOARDMODE_Y;
  }
}
