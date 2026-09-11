import type { Slot } from '@fluentui/react-utilities';
import type {
  InfoButtonProps as InfoButtonHeadlessProps,
  InfoButtonState as InfoButtonHeadlessState,
} from '@fluentui/react-headless-components-preview/info-label';

import type { PopoverProps } from '../Popover';

export type { InfoButtonSlots } from '@fluentui/react-headless-components-preview/info-label';

/** Size of the InfoButton. Selects the padding, the glyph and the popover's own size. */
export type InfoButtonSize = 'small' | 'medium' | 'large';

/**
 * Windmod InfoButton props: the headless info button plus the look prop the headless surface
 * deliberately omits (it exists purely to select styles). The popover slot is the windmod
 * Popover, so its shorthand accepts the look props the headless slot does not.
 */
export type InfoButtonProps = Omit<InfoButtonHeadlessProps, 'popover'> & {
  popover?: NonNullable<Slot<Partial<Omit<PopoverProps, 'openOnHover'>>>>;
  /** @default 'medium' */
  size?: InfoButtonSize;
};

/** Windmod InfoButton state: headless state plus the resolved look prop. */
export type InfoButtonState = InfoButtonHeadlessState & Required<Pick<InfoButtonProps, 'size'>>;
