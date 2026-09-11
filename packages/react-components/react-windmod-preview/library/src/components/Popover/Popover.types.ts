import type { PopoverProps as PopoverHeadlessProps } from '@fluentui/react-headless-components-preview/popover';

export type {
  OnOpenChangeData,
  OpenPopoverEvents,
  PopoverContextValue,
  PopoverState,
} from '@fluentui/react-headless-components-preview/popover';

/** Surface fill of the Popover. Unset is the neutral surface. */
export type PopoverAppearance = 'brand' | 'inverted';

/** Size of the Popover surface: its padding, and the arrow height merged into the offset. */
export type PopoverSize = 'small' | 'medium' | 'large';

/**
 * Windmod Popover props: the headless popover plus the look props the headless surface
 * deliberately omits (they exist purely to select styles).
 */
export type PopoverProps = PopoverHeadlessProps & {
  appearance?: PopoverAppearance;
  /** @default 'medium' */
  size?: PopoverSize;
};
