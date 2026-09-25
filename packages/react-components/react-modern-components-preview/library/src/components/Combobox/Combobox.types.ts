import type {
  ComboboxProps as ComboboxBaseProps,
  ComboboxState as ComboboxBaseState,
} from '@fluentui/react-headless-components-preview/combobox';
export type { ComboboxSlots } from '@fluentui/react-headless-components-preview/combobox';

export type ComboboxProps = ComboboxBaseProps & {
  /** @default 'outline' */
  appearance?: 'outline' | 'underline' | 'filled-darker' | 'filled-lighter';
  /** @default 'medium' */
  size?: 'small' | 'medium' | 'large';
};

export type ComboboxState = ComboboxBaseState & {
  appearance: NonNullable<ComboboxProps['appearance']>;
  size: NonNullable<ComboboxProps['size']>;
  root: ComboboxBaseState['root'] & {
    'data-appearance': NonNullable<ComboboxProps['appearance']>;
    'data-size': NonNullable<ComboboxProps['size']>;
  };
};
