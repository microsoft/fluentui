import type {
  DropdownProps as DropdownBaseProps,
  DropdownState as DropdownBaseState,
} from '@fluentui/react-headless-components-preview/dropdown';

export type DropdownProps = DropdownBaseProps & {
  /** @default 'outline' */
  appearance?: 'outline' | 'underline' | 'filled-darker' | 'filled-lighter';
  /** @default 'medium' */
  size?: 'small' | 'medium' | 'large';
};

export type DropdownState = DropdownBaseState & {
  appearance: NonNullable<DropdownProps['appearance']>;
  size: NonNullable<DropdownProps['size']>;
  root: DropdownBaseState['root'] & {
    'data-appearance': NonNullable<DropdownProps['appearance']>;
    'data-size': NonNullable<DropdownProps['size']>;
  };
};
