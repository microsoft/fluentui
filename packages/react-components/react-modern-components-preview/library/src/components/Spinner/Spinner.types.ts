import type {
  SpinnerProps as SpinnerBaseProps,
  SpinnerState as SpinnerBaseState,
} from '@fluentui/react-headless-components-preview/spinner';
export type { SpinnerSlots } from '@fluentui/react-headless-components-preview/spinner';

export type SpinnerProps = SpinnerBaseProps & {
  /**
   * The appearance of the spinner.
   *
   * @default 'primary'
   */
  appearance?: 'primary' | 'inverted';

  /**
   * The size of the spinner.
   *
   * @default 'medium'
   */
  size?: 'extra-tiny' | 'tiny' | 'extra-small' | 'small' | 'medium' | 'large' | 'extra-large' | 'huge';
};

export type SpinnerState = SpinnerBaseState & {
  appearance: NonNullable<SpinnerProps['appearance']>;
  size: NonNullable<SpinnerProps['size']>;
  root: SpinnerBaseState['root'] & {
    'data-appearance': NonNullable<SpinnerProps['appearance']>;
    'data-size': NonNullable<SpinnerProps['size']>;
  };
};
