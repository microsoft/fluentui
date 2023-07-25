import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { Radio, RadioProps } from '@fluentui/react-components';

export type SwatchImagePickerCellSlots = {
  root: Slot<typeof Radio>;
};

/**
 * SwatchImagePickerCell Props
 */
export type SwatchImagePickerCellProps = ComponentProps<SwatchImagePickerCellSlots> & {};

/**
 * State used in rendering SwatchImagePickerCell
 */
export type SwatchImagePickerCellState = ComponentState<SwatchImagePickerCellSlots>;
// TODO: Remove semicolon from previous line, uncomment next line, and provide union of props to pick from SwatchImagePickerCellProps.
// & Required<Pick<SwatchImagePickerCellProps, 'propName'>>
