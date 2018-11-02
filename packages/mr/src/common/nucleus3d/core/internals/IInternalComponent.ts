/**
 * @copyright Microsoft Corporation. All rights reserved. Licensed under the MIT license.
 * See https://github.com/haroldma/nucleus3d/blob/master/LICENSE for license information.
 */

import { Entity } from '../Entity';
import { System } from '../System';

export interface IInternalComponent {
  _system: System;
  isEnabled: boolean;
  _internalMount(entity: Entity, system?: System): void;
  _internalUnmount(disposeMaterialAndTextures: boolean): void;
  onEntityPropsWillUpdate(oldProps: {}): void;
  onEntityPropsUpdated(): void;
}
