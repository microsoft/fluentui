import type { TeachingPopoverTitleState as TeachingPopoverTitleHeadlessState } from '@fluentui/react-headless-components-preview/teaching-popover';

import type { PopoverAppearance } from '../Popover/Popover.types';

export type {
  TeachingPopoverTitleProps,
  TeachingPopoverTitleSlots,
} from '@fluentui/react-headless-components-preview/teaching-popover';

/** The look prop arrives by context, so this subpath has to name its type. */
export type { PopoverAppearance } from '../Popover/Popover.types';

/**
 * Windmod TeachingPopoverTitle state: headless state plus the appearance TeachingPopover
 * publishes. Griffel's own title state receives it the same way.
 */
export type TeachingPopoverTitleState = TeachingPopoverTitleHeadlessState & {
  appearance?: PopoverAppearance;
};
