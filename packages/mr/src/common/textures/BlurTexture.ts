import * as BABYLON from 'babylonjs';

/**
 * Handles blur texture related functionality in the scene.
 * @alpha
 */
export class BlurTexture {
  private _blurTexture: BABYLON.RenderTargetTexture;

  constructor(babylonScene: BABYLON.Scene) {
    this._blurTexture = this._createBlurTexture(babylonScene);
  }

  public get texture(): BABYLON.RenderTargetTexture {
    return this._blurTexture;
  }

  public dispose(): void {
    this._blurTexture.dispose();
  }

  /**
   * Adds a mesh to render in the blur texture.
   * @param mesh - The mesh that will render in the blur texture.
   */
  public add(mesh: BABYLON.AbstractMesh): void {
    this._blurTexture.renderList && this._blurTexture.renderList.push(mesh);
  }

  /**
   * Removes a mesh from the blur texture.
   * @param mesh - The mesh that will be removed from the blur texture.
   */
  public remove(mesh: BABYLON.AbstractMesh): void {
    if (this._blurTexture.renderList) {
      this._blurTexture.renderList = this._blurTexture.renderList.filter((m: BABYLON.AbstractMesh) => m !== mesh);
    }
  }

  /**
   * Create a blur render target texture and add a blur post process on it.
   * @param scene - The BabylonJS scene
   * @param engine - The BabylonJS engine
   */
  private _createBlurTexture(scene: BABYLON.Scene): BABYLON.RenderTargetTexture {
    const blurTexture: BABYLON.RenderTargetTexture = new BABYLON.RenderTargetTexture('BlurTexture', 128, scene);
    const kernel: number = 32;
    const blurVertical: BABYLON.BlurPostProcess = new BABYLON.BlurPostProcess(
      '',
      new BABYLON.Vector2(0, 1),
      kernel,
      0.6,
      null,
      undefined,
      scene.getEngine()
    );
    const blurHorizontal: BABYLON.BlurPostProcess = new BABYLON.BlurPostProcess(
      '',
      new BABYLON.Vector2(1, 0),
      kernel,
      0.6,
      null,
      undefined,
      scene.getEngine()
    );
    blurTexture.addPostProcess(blurHorizontal);
    blurTexture.addPostProcess(blurVertical);

    blurTexture.ignoreCameraViewport = true;

    return blurTexture;
  }
}
