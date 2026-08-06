import type { SwatchPickerBaseState } from '@fluentui/react-swatch-picker';

export type { SwatchPickerBaseProps as SwatchPickerProps, SwatchPickerSlots } from '@fluentui/react-swatch-picker';

export type SwatchPickerState = SwatchPickerBaseState & {
  root: {
    focusgroup?: string;
  };
};
