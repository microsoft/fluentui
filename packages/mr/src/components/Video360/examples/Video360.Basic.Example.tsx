import * as React from 'react';
import { Scene, FabricSceneEntity, Video360, Video360Mode } from '@uifabric/mr';

class MySceneEntity extends FabricSceneEntity {
  private _video: Video360;

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
    this._video = new Video360('https://yoda.blob.core.windows.net/videos/uptale360.mp4');
    this.mountChild(this._video);
    this._video.updateProps({
      description: 'Loading...',
      menuVisible: true,
      onClick: () => this._video.updateProps({ mode: Video360Mode.Play }),
      onReady: () => this._video.updateProps({ menuVisible: false })
    });
  }
}

export const Video360BasicExample = () => <Scene sceneEntity={new MySceneEntity()} />;
