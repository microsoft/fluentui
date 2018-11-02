import * as React from 'react';
import { Scene, FabricSceneEntity, Image360 } from '@uifabric/mr';

class MySceneEntity extends FabricSceneEntity {
  private _image: Image360;
  /**
   * The main entry point for the 3D example.
   */
  public render(): void {
    // Lights and camera
    const light = new BABYLON.DirectionalLight('light', new BABYLON.Vector3(0, -0.5, 1.0), this.context.scene);
    light.position = new BABYLON.Vector3(0, 5, -2);
    const camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 1, 0), this.context.scene);
    camera.attachControl(this.canvas, false);

    // 360 Video player
    this._image = new Image360('https://casuallypersistent.blob.core.windows.net/photos/536014562.478292.jpg');
    this.mountChild(this._image);
    this._image.updateProps({
      description: 'Loading...',
      menuVisible: true,
      onReady: this._onReady,
      onClick: this._onClick
    });
  }

  private _onClick = () => {
    this._image.updateProps({
      menuVisible: !this._image.props.menuVisible
    });
  };

  private _onReady = () => {
    this.addEnvironmentMeshes(this.context.scene.meshes);
    this._image.updateProps({
      description: 'A typical day at the candy factory',
      menuVisible: true
    });
  };
}

export const Image360MenuExample = () => <Scene sceneEntity={new MySceneEntity()} />;
