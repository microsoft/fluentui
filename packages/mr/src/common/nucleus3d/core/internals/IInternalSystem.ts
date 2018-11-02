/**
 * @copyright Microsoft Corporation. All rights reserved. Licensed under the MIT license.
 * See https://github.com/haroldma/nucleus3d/blob/master/LICENSE for license information.
 */

import { INucleusContext } from '../common/INucleusContext';

export interface IInternalSystem {
  _internalInit(context: INucleusContext): void;
  _internalDispose(): void;
  onUpdate(): void;
}
