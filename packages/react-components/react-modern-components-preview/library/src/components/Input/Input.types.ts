import type {
  InputProps as InputBaseProps,
  InputState as InputBaseState,
} from '@fluentui/react-headless-components-preview/input';
export type { InputSlots } from '@fluentui/react-headless-components-preview/input';

export type InputProps = InputBaseProps & {
  /**
   * Controls the colors and borders of the input.
   *
   * @default 'outline'
   */
  appearance?:
    | 'outline'
    | 'underline'
    | 'filled-darker'
    | 'filled-lighter'
    | 'filled-darker-shadow'
    | 'filled-lighter-shadow';

  /**
   * Size of the input.
   *
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large';
};

export type InputState = InputBaseState & {
  appearance: NonNullable<InputProps['appearance']>;
  size: NonNullable<InputProps['size']>;
  root: InputBaseState['root'] & {
    'data-appearance': NonNullable<InputProps['appearance']>;
    'data-content-after'?: string;
    'data-content-before'?: string;
    'data-size': NonNullable<InputProps['size']>;
  };
};
