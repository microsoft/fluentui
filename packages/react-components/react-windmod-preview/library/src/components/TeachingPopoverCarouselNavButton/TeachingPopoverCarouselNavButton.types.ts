import type { TeachingPopoverCarouselNavButtonState as TeachingPopoverCarouselNavButtonHeadlessState } from '@fluentui/react-headless-components-preview/teaching-popover';

import type { PopoverAppearance } from '../Popover/Popover.types';

export type {
  TeachingPopoverCarouselNavButtonProps,
  TeachingPopoverCarouselNavButtonSlots,
} from '@fluentui/react-headless-components-preview/teaching-popover';

/** The look prop arrives by context, so this subpath has to name its type. */
export type { PopoverAppearance } from '../Popover/Popover.types';

/**
 * Windmod TeachingPopoverCarouselNavButton state: headless state plus the appearance
 * TeachingPopover publishes. The reference's own nav button state receives it the same way.
 */
export type TeachingPopoverCarouselNavButtonState = TeachingPopoverCarouselNavButtonHeadlessState & {
  appearance?: PopoverAppearance;
};
