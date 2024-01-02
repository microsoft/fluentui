import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import type { RadioGroup } from '@fluentui/react-components';

export type RadioPickerSlots = {
  root: Slot<typeof RadioGroup>;
};

/**
 * RadioPicker Props
 */
export type RadioPickerProps = ComponentProps<RadioPickerSlots> & {};

/**
 * State used in rendering RadioPicker
 */
export type RadioPickerState = ComponentState<RadioPickerSlots>;
// TODO: Remove semicolon from previous line, uncomment next line, and provide union of props to pick from RadioPickerProps.
// & Required<Pick<RadioPickerProps, 'propName'>>
