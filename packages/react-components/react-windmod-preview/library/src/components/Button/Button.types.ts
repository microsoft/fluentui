import type {
  ButtonProps as ButtonHeadlessProps,
  ButtonState as ButtonHeadlessState,
} from '@fluentui/react-headless-components-preview/button';

export type { ButtonSlots } from '@fluentui/react-headless-components-preview/button';

/** Visual style of the Button. `'secondary'` is the base look. */
export type ButtonAppearance = 'secondary' | 'primary' | 'outline' | 'subtle' | 'transparent';

/** Corner treatment of the Button. `'rounded'` is the base look. */
export type ButtonShape = 'rounded' | 'circular' | 'square';

/** Size of the Button. */
export type ButtonSize = 'small' | 'medium' | 'large';

/**
 * Windmod Button props: the headless button plus the look props the headless surface
 * deliberately omits (they exist purely to select styles).
 */
export type ButtonProps = ButtonHeadlessProps & {
  /** @default 'secondary' */
  appearance?: ButtonAppearance;
  /** @default 'rounded' */
  shape?: ButtonShape;
  /** @default 'medium' */
  size?: ButtonSize;
};

/** Windmod Button state: headless state plus the resolved look props. */
export type ButtonState = ButtonHeadlessState & Required<Pick<ButtonProps, 'appearance' | 'shape' | 'size'>>;
