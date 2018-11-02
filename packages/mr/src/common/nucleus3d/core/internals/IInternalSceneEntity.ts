/**
 * @copyright Microsoft Corporation. All rights reserved. Licensed under the MIT license.
 * See https://github.com/haroldma/nucleus3d/blob/master/LICENSE for license information.
 */

import { Entity } from '../Entity';

export interface IInternalSceneEntity {
  _internalRegisterEntity(entity: Entity): void;
  _internalUnregisterEntity(entity: Entity): void;
}
