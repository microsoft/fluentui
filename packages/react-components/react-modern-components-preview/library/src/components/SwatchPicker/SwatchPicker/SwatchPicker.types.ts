import type {
  SwatchPickerProps as SwatchPickerBaseProps,
  SwatchPickerState as SwatchPickerBaseState,
} from '@fluentui/react-headless-components-preview/swatch-picker';
export type { SwatchPickerSlots } from '@fluentui/react-headless-components-preview/swatch-picker';

export type SwatchPickerProps = SwatchPickerBaseProps & {
  /** @default 'medium' */
  size?: 'extra-small' | 'small' | 'medium' | 'large';
  /** @default 'square' */
  shape?: 'rounded' | 'square' | 'circular';
  /** @default 'medium' */
  spacing?: 'small' | 'medium';
};

export type SwatchPickerState = SwatchPickerBaseState & {
  size: NonNullable<SwatchPickerProps['size']>;
  shape: NonNullable<SwatchPickerProps['shape']>;
  spacing: NonNullable<SwatchPickerProps['spacing']>;
  root: SwatchPickerBaseState['root'] & {
    'data-size': NonNullable<SwatchPickerProps['size']>;
    'data-shape': NonNullable<SwatchPickerProps['shape']>;
    'data-spacing': NonNullable<SwatchPickerProps['spacing']>;
  };
};
