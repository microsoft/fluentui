import * as React from 'react';
import { Scene, FabricSceneEntity, Image360 } from '@uifabric/mr';

class MySceneEntity extends FabricSceneEntity {
  /**
   * The main entry point for the 3D example.
   */
  public render(): void {
    // Lights and camera
    const light = new BABYLON.DirectionalLight('light', new BABYLON.Vector3(0, -0.5, 1.0), this.context.scene);
    light.position = new BABYLON.Vector3(0, 5, -2);
    const camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 1, 0), this.context.scene);
    camera.attachControl(this.canvas, false);

    // 360 Image viewer
    const image = new Image360('https://casuallypersistent.blob.core.windows.net/photos/536014562.478292.jpg');
    this.mountChild(image);
    image.updateProps({
      description: 'Loading...',
      menuVisible: true,
      onReady: () => image.updateProps({ menuVisible: false })
    });
  }
}

export const Image360BasicExample = () => <Scene sceneEntity={new MySceneEntity()} />;
