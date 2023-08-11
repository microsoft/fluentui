import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { RadioGroup } from '@fluentui/react-components';

export type SwatchPickerSlots = {
  root: Slot<typeof RadioGroup>;
};

/**
 * SwatchPicker Props
 */
export type SwatchPickerProps = ComponentProps<SwatchPickerSlots> & {
  type?: 'row' | 'grid';
};

/**
 * State used in rendering SwatchPicker
 */
export type SwatchPickerState = ComponentState<SwatchPickerSlots> &
  Required<Pick<SwatchPickerProps, 'onChange' | 'defaultValue' | 'type'>> &
  Partial<Omit<SwatchPickerProps, 'onChange' | 'defaultValue' | 'type'>>;
// TODO: Remove semicolon from previous line, uncomment next line, and provide union of props to pick from SwatchPickerProps.
// & Required<Pick<SwatchPickerProps, 'propName'>>
