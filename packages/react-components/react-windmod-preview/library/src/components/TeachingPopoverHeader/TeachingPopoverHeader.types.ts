import type { TeachingPopoverHeaderState as TeachingPopoverHeaderHeadlessState } from '@fluentui/react-headless-components-preview/teaching-popover';

import type { PopoverAppearance } from '../Popover/Popover.types';

export type {
  TeachingPopoverHeaderProps,
  TeachingPopoverHeaderSlots,
} from '@fluentui/react-headless-components-preview/teaching-popover';

/** The look prop arrives by context, so this subpath has to name its type. */
export type { PopoverAppearance } from '../Popover/Popover.types';

/**
 * Windmod TeachingPopoverHeader state: headless state plus the appearance TeachingPopover
 * publishes. Griffel's own header state receives it the same way.
 */
export type TeachingPopoverHeaderState = TeachingPopoverHeaderHeadlessState & {
  appearance?: PopoverAppearance;
};
