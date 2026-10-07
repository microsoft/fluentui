import type {
  ButtonBaseState as HeadlessButtonBaseState,
  ButtonProps as HeadlessButtonProps,
  ButtonSlots,
} from '@fluentui/react-headless-components-preview/button';

export type { ButtonSlots };

/**
 * A button supports different sizes.
 */
export type ButtonSize = 'small' | 'medium' | 'large';

export type ButtonProps = HeadlessButtonProps & {
  /**
   * A button can have its content and borders styled for greater emphasis or to be subtle.
   * - 'secondary' (default): Gives emphasis to the button in such a way that it indicates a secondary action.
   * - 'primary': Emphasizes the button as a primary action.
   * - 'outline': Removes background styling.
   * - 'subtle': Minimizes emphasis to blend into the background until hovered or focused.
   * - 'transparent': Removes background and border styling.
   *
   * @default 'secondary'
   */
  appearance?: 'secondary' | 'primary' | 'outline' | 'subtle' | 'transparent';

  /**
   * A button can be rounded, circular, or square.
   *
   * @default 'rounded'
   */
  shape?: 'rounded' | 'circular' | 'square';

  /**
   * A button supports different sizes.
   *
   * @default 'medium'
   */
  size?: ButtonSize;
};

/**
 * Alias of the headless `ButtonProps`, kept so existing imports keep working.
 */
export type ButtonBaseProps = HeadlessButtonProps;

export type ButtonState = HeadlessButtonBaseState & Required<Pick<ButtonProps, 'appearance' | 'shape' | 'size'>>;

/**
 * Alias of the headless `ButtonBaseState`, kept so existing imports keep working.
 */
export type ButtonBaseState = HeadlessButtonBaseState;
