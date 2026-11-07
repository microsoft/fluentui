import type {
  SpinButtonProps as SpinButtonHeadlessProps,
  SpinButtonState as SpinButtonHeadlessState,
} from '@fluentui/react-headless-components-preview/spin-button';

export type { SpinButtonSlots } from '@fluentui/react-headless-components-preview/spin-button';

/** Colours and borders of the SpinButton. `'outline'` is the base look. */
export type SpinButtonAppearance = 'outline' | 'underline' | 'filled-darker' | 'filled-lighter';

/** Size of the SpinButton — changes its height, font size, stepper height and paddings. */
export type SpinButtonSize = 'small' | 'medium';

/**
 * Windmod SpinButton props: the headless spin button plus the look props the headless surface
 * deliberately omits (they exist purely to select styles).
 */
export type SpinButtonProps = SpinButtonHeadlessProps & {
  /** @default 'outline' */
  appearance?: SpinButtonAppearance;
  /** @default 'medium' */
  size?: SpinButtonSize;
};

/** Windmod SpinButton state: headless state plus the resolved look props. */
export type SpinButtonState = SpinButtonHeadlessState & Required<Pick<SpinButtonProps, 'appearance' | 'size'>>;
