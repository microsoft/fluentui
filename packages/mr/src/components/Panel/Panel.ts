import * as BABYLON from 'babylonjs';
import BlurMaterial from '../../common/materials/BlurMaterial';
import BlurTexture from '../../common/textures/BlurTexture';

export default class Panel {
  private _mesh: BABYLON.Mesh;

  constructor(name: string, options: { size?: number; width?: number; height?: number }, scene: BABYLON.Scene) {
    this._mesh = BABYLON.MeshBuilder.CreateBox('Panel', { ...options, ...{ depth: 0.01 } }, scene);
    const bm = new BlurMaterial('Panel-BlurMaterial', 1, scene);
    for (let i = 0; i < scene.meshes.length; i++) {
      BlurTexture.instance(scene).add(scene.meshes[i]);
    }
    this._mesh.material = bm.material;
  }

  public get mesh(): BABYLON.Mesh {
    return this._mesh;
  }
}
