import type {
  SpinButtonProps as SpinButtonBaseProps,
  SpinButtonState as SpinButtonBaseState,
} from '@fluentui/react-headless-components-preview/spin-button';
export type { SpinButtonSlots } from '@fluentui/react-headless-components-preview/spin-button';

export type SpinButtonProps = SpinButtonBaseProps & {
  /**
   * Controls the colors and borders of the input.
   *
   * @defaultvalue outline
   */
  appearance?: 'outline' | 'underline' | 'filled-darker' | 'filled-lighter';

  /**
   * Size of the input.
   *
   * @defaultvalue medium
   */
  size?: 'small' | 'medium';
};

export type SpinButtonState = SpinButtonBaseState & {
  appearance: NonNullable<SpinButtonProps['appearance']>;
  size: NonNullable<SpinButtonProps['size']>;
  root: SpinButtonBaseState['root'] & {
    'data-appearance': NonNullable<SpinButtonProps['appearance']>;
    'data-size': NonNullable<SpinButtonProps['size']>;
  };
};
