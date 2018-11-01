import * as React from 'react';
import * as BABYLON from 'babylonjs';
import { ISceneProps } from './Scene.types';

export class Scene extends React.Component<ISceneProps & React.HTMLAttributes<HTMLCanvasElement>, {}> {
  private scene: BABYLON.Scene;
  private engine: BABYLON.Engine;
  private canvas: HTMLCanvasElement;

  public componentDidMount(): void {
    this.engine = new BABYLON.Engine(this.canvas, true, this.props.engineOptions, this.props.adaptToDeviceRatio);
    this.scene = new BABYLON.Scene(this.engine);

    this.props.sceneEntity.mount(this.engine, this.scene);
    this.engine.runRenderLoop(() => {
      if (this.scene) {
        this.scene.render();
      }
    });

    // Resize the babylon engine when the window is resized
    window.addEventListener('resize', this._onResizeWindow);
  }

  public componentWillUnmount(): void {
    window.removeEventListener('resize', this._onResizeWindow);
  }

  public render(): JSX.Element {
    // tslint:disable-next-line:jsx-ban-props
    return <canvas style={{ width: '100%' }} ref={this._onCanvasLoaded} />;
  }

  private _onCanvasLoaded = (c: HTMLCanvasElement) => {
    if (c !== null) {
      this.canvas = c;
    }
  };

  private _onResizeWindow = () => {
    if (this.engine) {
      this.engine.resize();
    }
  };
}
