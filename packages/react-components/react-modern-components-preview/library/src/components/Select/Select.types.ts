import type {
  SelectProps as SelectBaseProps,
  SelectState as SelectBaseState,
} from '@fluentui/react-headless-components-preview/select';
export type { SelectSlots } from '@fluentui/react-headless-components-preview/select';

export type SelectProps = SelectBaseProps & {
  /**
   * Controls the colors and borders of the select.
   *
   * @default 'outline'
   */
  appearance?: 'outline' | 'underline' | 'filled-darker' | 'filled-lighter';

  /**
   * Size of the select.
   *
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large';
};

export type SelectState = SelectBaseState & {
  appearance: NonNullable<SelectProps['appearance']>;
  size: NonNullable<SelectProps['size']>;
  root: SelectBaseState['root'] & {
    'data-appearance': NonNullable<SelectProps['appearance']>;
    'data-size': NonNullable<SelectProps['size']>;
  };
  select: SelectBaseState['select'] & {
    'data-appearance': NonNullable<SelectProps['appearance']>;
    'data-size': NonNullable<SelectProps['size']>;
  };
};
