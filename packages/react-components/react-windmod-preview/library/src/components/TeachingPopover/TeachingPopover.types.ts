import type { TeachingPopoverProps as TeachingPopoverHeadlessProps } from '@fluentui/react-headless-components-preview/teaching-popover';

import type { PopoverAppearance, PopoverSize } from '../Popover/Popover.types';

export type {
  TeachingPopoverBaseBridgedContextValue,
  TeachingPopoverContextValues,
  TeachingPopoverState,
} from '@fluentui/react-headless-components-preview/teaching-popover';

/** The look props travel by context and are the Popover's own — see PopoverContext. */
export type { PopoverAppearance, PopoverSize } from '../Popover/Popover.types';

/**
 * Windmod TeachingPopover props: the headless teaching popover plus the look props the headless
 * surface deliberately omits (they exist purely to select styles).
 */
export type TeachingPopoverProps = TeachingPopoverHeadlessProps & {
  appearance?: PopoverAppearance;
  /** @default 'medium' */
  size?: PopoverSize;
};
