import * as React from 'react';
import * as BABYLON from 'babylonjs';

import { SceneEntity } from '@uifabric/mr/lib/common/nucleus3d/core';
import BlurMaterialSystem from '@uifabric/mr/lib/common/materials/BlurMaterialSystem';
import BlurTexture from '@uifabric/mr/lib/common/textures/BlurTexture';

export type SceneEventArgs = {
  engine: BABYLON.Engine;
  scene: BABYLON.Scene;
  canvas: HTMLCanvasElement;
};

export type SceneProps = {
  engineOptions?: BABYLON.EngineOptions;
  adaptToDeviceRatio?: boolean;
  scene: FabricSceneEntity;
};

export class Scene extends React.Component<SceneProps & React.HTMLAttributes<HTMLCanvasElement>, {}> {
  private scene: BABYLON.Scene;
  private engine: BABYLON.Engine;
  private canvas: HTMLCanvasElement;

  public componentDidMount(): void {
    this.engine = new BABYLON.Engine(this.canvas, true, this.props.engineOptions, this.props.adaptToDeviceRatio);
    this.scene = new BABYLON.Scene(this.engine);

    this.props.scene.mount(this.engine, this.scene);
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

export class FabricSceneEntity extends SceneEntity {
  public didMount(): void {
    this.registerSystem(new BlurMaterialSystem());
    this.render();
  }

  public addEnvironmentMeshes(meshes: BABYLON.AbstractMesh[]): void {
    meshes.forEach(mesh => {
      BlurTexture.instance(this.context.scene).add(mesh);
    });
  }
  protected render() {}
}
