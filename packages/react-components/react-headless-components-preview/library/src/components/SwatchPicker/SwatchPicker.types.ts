import type { SwatchPickerBaseState } from '@fluentui/react-swatch-picker';

export type {
  SwatchPickerBaseProps as SwatchPickerProps,
  SwatchPickerSlots,
  SwatchPickerOnSelectEventHandler,
} from '@fluentui/react-swatch-picker';

export type SwatchPickerState = SwatchPickerBaseState & {
  root: {
    /**
     * Whether SwatchPicker is row or grid
     */
    'data-layout'?: SwatchPickerBaseState['layout'];
  };
};
