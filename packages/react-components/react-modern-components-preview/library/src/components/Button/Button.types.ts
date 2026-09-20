import type {
  ButtonProps as ButtonBaseProps,
  ButtonState as ButtonBaseState,
} from '@fluentui/react-headless-components-preview/button';
export type { ButtonSlots } from '@fluentui/react-headless-components-preview/button';

/**
 * A button supports different sizes.
 */
export type ButtonSize = 'small' | 'medium' | 'large';

export type ButtonProps = ButtonBaseProps & {
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

export type ButtonState = ButtonBaseState & {
  appearance: ButtonProps['appearance'];
  size: ButtonProps['size'];
  shape: ButtonProps['shape'];
  root: {
    'data-appearance'?: ButtonProps['appearance'];
    'data-size'?: ButtonProps['size'];
    'data-shape'?: ButtonProps['shape'];
  };
};
