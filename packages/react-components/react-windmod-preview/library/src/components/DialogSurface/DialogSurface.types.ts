import type { DialogSurfaceState as DialogSurfaceHeadlessState } from '@fluentui/react-headless-components-preview/dialog';

export type { DialogSurfaceProps, DialogSurfaceSlots } from '@fluentui/react-headless-components-preview/dialog';

/**
 * Windmod DialogSurface state: headless state plus the nesting flag. The headless family publishes
 * `isNestedDialog` on its context rather than on this state, and the backdrop transparency is the
 * only thing that reads it.
 */
export type DialogSurfaceState = DialogSurfaceHeadlessState & {
  nested: boolean;
};
