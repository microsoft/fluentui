import type { SwatchPickerRowBaseState } from '@fluentui/react-swatch-picker';

export type {
  SwatchPickerRowBaseProps as SwatchPickerRowProps,
  SwatchPickerRowSlots,
} from '@fluentui/react-swatch-picker';

export type SwatchPickerRowState = SwatchPickerRowBaseState & {
  root: SwatchPickerRowBaseState['root'] & {
    /**
     * The `focusgrouprow` attribute is used to indicate that the row is part of a focus group for keyboard navigation.
     */
    focusgrouprow?: string;
  };
};
