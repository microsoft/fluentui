/**
 * @copyright Microsoft Corporation. All rights reserved. Licensed under the MIT license.
 * See https://github.com/haroldma/nucleus3d/blob/master/LICENSE for license information.
 */

import * as BABYLON from 'babylonjs';

import { SceneEntity } from './SceneEntity';

/**
 * The Nucleus context.
 * @public
 */
export interface INucleusContext {
  /**
   * The engine
   */
  readonly engine: BABYLON.Engine;
  /**
   * The scene
   */
  readonly scene: BABYLON.Scene;
  /**
   * The scene entity.
   */
  readonly sceneEntity: SceneEntity;
}
