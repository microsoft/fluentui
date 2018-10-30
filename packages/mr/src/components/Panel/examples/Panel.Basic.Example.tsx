import * as React from 'react';
import * as BABYLON from 'babylonjs';
import { classNameFunction } from 'office-ui-fabric-react/lib/Utilities';
import Panel from '../Panel';

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
    const { canvas, scene, engine } = e;

    // Create simple sphere
    const sphere = BABYLON.Mesh.CreateIcoSphere('sphere', { radius: 0.2, flat: true, subdivisions: 1 }, scene);
    sphere.position = new BABYLON.Vector3(0, 1, 5);
    sphere.scaling.scaleInPlace(5);
    sphere.material = new BABYLON.StandardMaterial('sphere material', scene);

    // Lights and camera
    const light = new BABYLON.DirectionalLight('light', new BABYLON.Vector3(0, -0.5, 1.0), scene);
    light.position = new BABYLON.Vector3(0, 5, -2);
    const camera = new BABYLON.ArcRotateCamera('camera', -Math.PI / 2, Math.PI / 4, 3, new BABYLON.Vector3(0, 1, 0), scene);
    camera.attachControl(canvas, true);

    // Default Environment
    const environment = scene.createDefaultEnvironment({ enableGroundShadow: true, groundYBias: 1 });
    environment && environment.setMainColor(BABYLON.Color3.FromHexString('#74b9ff'));

    const panel = new Panel('panel', { height: 0.7, width: 1.4 }, scene);
    panel.mesh.position = new BABYLON.Vector3(0.5, 1, 0);

    engine.runRenderLoop(() => {
      if (scene) {
        scene.render();
      }
    });
  };
}
