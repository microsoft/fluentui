import type {
  SwatchPickerRowProps as SwatchPickerRowBaseProps,
  SwatchPickerRowState as SwatchPickerRowBaseState,
} from '@fluentui/react-headless-components-preview/swatch-picker';
export type { SwatchPickerRowSlots } from '@fluentui/react-headless-components-preview/swatch-picker';

export type SwatchPickerRowProps = SwatchPickerRowBaseProps;
export type SwatchPickerRowState = SwatchPickerRowBaseState & {
  spacing: 'small' | 'medium';
  root: SwatchPickerRowBaseState['root'] & {
    'data-spacing': 'small' | 'medium';
  };
};
