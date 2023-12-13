import { ToolbarOrientation } from '@microsoft/fast-foundation/toolbar.js';
import type { ToolbarOptions } from '@microsoft/fast-foundation/toolbar.js';
import type { ValuesOf } from '@microsoft/fast-foundation/utilities.js';

/**
 * Toolbar size options.
 * @public
 */
export const ToolbarSize = {
  small: 'small',
  medium: 'medium',
  large: 'large',
} as const;

/**
 * The types for ToolbarSize
 * @public
 */
export type ToolbarSize = ValuesOf<typeof ToolbarSize>;

/**
 * Fast Foundation ToolbarOrientation property
 */
export { ToolbarOrientation };

/**
 * Fast Foundation ToolbarOptions property
 */
export { ToolbarOptions };
