import type {
  SpinnerProps as SpinnerHeadlessProps,
  SpinnerState as SpinnerHeadlessState,
} from '@fluentui/react-headless-components-preview/spinner';

export type { SpinnerSlots } from '@fluentui/react-headless-components-preview/spinner';

/** Visual style of the Spinner. `'primary'` is the base look. */
export type SpinnerAppearance = 'primary' | 'inverted';

/** Size of the Spinner. */
export type SpinnerSize = 'extra-tiny' | 'tiny' | 'extra-small' | 'small' | 'medium' | 'large' | 'extra-large' | 'huge';

/**
 * Windmod Spinner props: the headless spinner plus the look props the headless surface
 * deliberately omits (they exist purely to select styles).
 */
export type SpinnerProps = SpinnerHeadlessProps & {
  /** @default 'primary' */
  appearance?: SpinnerAppearance;
  /** @default 'medium' */
  size?: SpinnerSize;
};

/** Windmod Spinner state: headless state plus the resolved look props. */
export type SpinnerState = SpinnerHeadlessState & Required<Pick<SpinnerProps, 'appearance' | 'size'>>;
