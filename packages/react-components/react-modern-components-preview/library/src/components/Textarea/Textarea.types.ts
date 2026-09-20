import type {
  TextareaProps as TextareaBaseProps,
  TextareaState as TextareaBaseState,
} from '@fluentui/react-headless-components-preview/textarea';
export type { TextareaSlots } from '@fluentui/react-headless-components-preview/textarea';

export type TextareaProps = TextareaBaseProps & {
  /**
   * Controls the colors and borders of the textarea.
   *
   * @default 'outline'
   */
  appearance?: 'outline' | 'filled-darker' | 'filled-lighter' | 'filled-darker-shadow' | 'filled-lighter-shadow';

  /**
   * Size of the textarea.
   *
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large';
};

export type TextareaState = TextareaBaseState & {
  appearance: NonNullable<TextareaProps['appearance']>;
  size: NonNullable<TextareaProps['size']>;
  root: TextareaBaseState['root'] & {
    'data-appearance': NonNullable<TextareaProps['appearance']>;
    'data-size': NonNullable<TextareaProps['size']>;
  };
};
