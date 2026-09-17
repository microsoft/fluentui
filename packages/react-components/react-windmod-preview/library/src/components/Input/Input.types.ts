import type {
  InputProps as InputHeadlessProps,
  InputState as InputHeadlessState,
} from '@fluentui/react-headless-components-preview/input';

export type { InputSlots } from '@fluentui/react-headless-components-preview/input';

/** Colours and borders of the Input. `'outline'` is the base look. */
export type InputAppearance = 'outline' | 'underline' | 'filled-darker' | 'filled-lighter';

/** Size of the Input — changes its height, font size and horizontal padding. */
export type InputSize = 'small' | 'medium' | 'large';

/**
 * Windmod Input props: the headless input plus the look props the headless surface
 * deliberately omits (they exist purely to select styles).
 */
export type InputProps = InputHeadlessProps & {
  /** @default 'outline' */
  appearance?: InputAppearance;
  /** @default 'medium' */
  size?: InputSize;
};

/** Windmod Input state: headless state plus the resolved look props. */
export type InputState = InputHeadlessState & Required<Pick<InputProps, 'appearance' | 'size'>>;
