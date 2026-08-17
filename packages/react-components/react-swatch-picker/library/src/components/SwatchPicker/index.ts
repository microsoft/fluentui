export { SwatchPicker } from './SwatchPicker';
export type {
  SwatchPickerBaseProps,
  SwatchPickerBaseState,
  SwatchPickerOnSelectEventHandler,
  SwatchPickerOnSelectionChangeData,
  SwatchPickerProps,
  SwatchPickerSlots,
  SwatchPickerState,
} from './SwatchPicker.types';
export { renderSwatchPicker_unstable } from './renderSwatchPicker';
export { useSwatchPicker_unstable, useSwatchPickerBase_unstable } from './useSwatchPicker';
// eslint-disable-next-line @typescript-eslint/no-deprecated -- deprecated for STYLING (DECISIONS.md D16.5); re-exporting the identity constant is the point.
export { swatchPickerClassNames, useSwatchPickerStyles_unstable } from './useSwatchPickerStyles.styles';
