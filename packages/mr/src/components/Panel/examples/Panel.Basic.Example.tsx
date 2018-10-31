import * as React from 'react';
import * as BABYLON from 'babylonjs';
import { Panel } from '@uifabric/mr/lib/components/Panel/Panel';
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
  onSceneMount?: (args: SceneEventArgs) => void;
};

class Scene extends React.Component<SceneProps & React.HTMLAttributes<HTMLCanvasElement>, {}> {
  private scene: BABYLON.Scene;
  private engine: BABYLON.Engine;
  private canvas: HTMLCanvasElement;

  public componentDidMount(): void {
    this.engine = new BABYLON.Engine(this.canvas, true, this.props.engineOptions, this.props.adaptToDeviceRatio);
    this.scene = new BABYLON.Scene(this.engine);

    if (typeof this.props.onSceneMount === 'function') {
      this.props.onSceneMount({
        scene: this.scene,
        engine: this.engine,
        canvas: this.canvas
      });
    } else {
      console.error('onSceneMount function not available');
    }

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

export class PanelBasicExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <div>
        <Scene onSceneMount={this._onSceneMount} />
      </div>
    );
  }

  private _onSceneMount = (e: SceneEventArgs) => {
    const { engine, scene } = e;

    const mainScene = new MainScene();
    mainScene.mount(engine, scene);

    engine.runRenderLoop(() => {
      if (scene) {
        scene.render();
      }
    });
  };
}

export class MainScene extends SceneEntity {
  /**
   * The main entry point for the 3D app.
   */
  public didMount(): void {
    // Create simple sphere
    const sphere = BABYLON.Mesh.CreateIcoSphere('sphere', { radius: 0.2, flat: true, subdivisions: 1 }, this.context.scene);
    sphere.position = new BABYLON.Vector3(0, 1, 5);
    sphere.scaling.scaleInPlace(5);
    sphere.material = new BABYLON.StandardMaterial('sphere material', this.context.scene);

    // Lights and camera
    const light = new BABYLON.DirectionalLight('light', new BABYLON.Vector3(0, -0.5, 1.0), this.context.scene);
    light.position = new BABYLON.Vector3(0, 5, -2);
    const camera = new BABYLON.ArcRotateCamera('camera', -Math.PI / 2, Math.PI / 4, 3, new BABYLON.Vector3(0, 1, 0), this.context.scene);
    const canvas = this.context.engine.getRenderingCanvas();
    if (canvas) {
      camera.attachControl(canvas, true);
    }

    // Default Environment
    const environment = this.context.scene.createDefaultEnvironment({ enableGroundShadow: true, groundYBias: 1 });
    environment && environment.setMainColor(BABYLON.Color3.FromHexString('#74b9ff'));

    this.registerSystem(new BlurMaterialSystem());

    this.context.scene.meshes.forEach(mesh => {
      BlurTexture.instance(this.context.scene).add(mesh);
    });

    const panel = new Panel({ height: 0.7, width: 1.4 });
    this.mountChild(panel);
    panel.node.position = new BABYLON.Vector3(0.5, 1, 0);
  }
}
