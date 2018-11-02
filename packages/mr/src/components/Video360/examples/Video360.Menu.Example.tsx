import * as React from 'react';
import { Scene, FabricSceneEntity, Video360, IMRAction, Video360Mode } from '@uifabric/mr';

class MySceneEntity extends FabricSceneEntity {
  private _video: Video360;
  private _playActions: IMRAction[];
  private _pauseActions: IMRAction[];

  /**
   * The main entry point for the 3D example.
   */
  public render(): void {
    this._playActions = [
      {
        description: 'Play',
        isActionable: true,
        iconName: 'Play',
        onClick: this._onPlay
      }
    ];
    this._pauseActions = [
      {
        description: 'Pause',
        isActionable: true,
        iconName: 'Pause',
        onClick: this._onPause
      }
    ];
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
      onReady: this._onReady,
      onClick: this._onClick
    });
  }

  private _onClick = () => {
    this._video.updateProps({
      menuVisible: true
    });
  };

  private _onReady = () => {
    this.addEnvironmentMeshes(this.context.scene.meshes);
    this._video.updateProps({
      description: 'A typical day at the factory',
      actions: this._playActions,
      mode: Video360Mode.Pause,
      menuVisible: true
    });
  };

  private _onPlay = () => {
    console.log('Play clicked');
    this._video.updateProps({
      mode: Video360Mode.Play,
      menuVisible: false,
      actions: this._pauseActions
    });
  };

  private _onPause = () => {
    console.log('Pause clicked');
    this._video.updateProps({
      mode: Video360Mode.Pause,
      menuVisible: false,
      actions: this._playActions
    });
  };
}

export const Video360MenuExample = () => <Scene sceneEntity={new MySceneEntity()} />;
