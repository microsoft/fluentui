import { arrowPlugin } from './arrowPlugin';
import { autoSizePlugin } from './autoSizePlugin';
import { boundaryPlugin } from './boundaryPlugin';
import { hidePlugin } from './hidePlugin';
import { offsetPlugin } from './offsetPlugin';
import type { PositioningPlugin } from './types';

/**
 * Plugins handle the options that CSS anchor positioning can't, and run after every update.
 * The list is a constant: the position is recomputed when options change, not when plugins do.
 */
export const PLUGINS: readonly PositioningPlugin[] = [
  offsetPlugin,
  boundaryPlugin,
  autoSizePlugin,
  arrowPlugin,
  hidePlugin,
];
