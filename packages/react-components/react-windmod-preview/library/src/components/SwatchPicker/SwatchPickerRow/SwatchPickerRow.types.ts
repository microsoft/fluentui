import type {
  SwatchPickerRowProps as SwatchPickerRowHeadlessProps,
  SwatchPickerRowState as SwatchPickerRowHeadlessState,
} from '@fluentui/react-headless-components-preview/swatch-picker';

import type { SwatchPickerSpacing } from '../SwatchPicker.types';

export type { SwatchPickerRowSlots } from '@fluentui/react-headless-components-preview/swatch-picker';

/** Windmod SwatchPickerRow props: the headless row unchanged — spacing arrives through the context. */
export type SwatchPickerRowProps = SwatchPickerRowHeadlessProps;

/** Windmod SwatchPickerRow state: headless state plus the spacing resolved from the context. */
export type SwatchPickerRowState = SwatchPickerRowHeadlessState & {
  spacing: SwatchPickerSpacing;
};
