import { ToolbarOptions, ToolbarOrientation, ValuesOf } from '@microsoft/fast-foundation';

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
