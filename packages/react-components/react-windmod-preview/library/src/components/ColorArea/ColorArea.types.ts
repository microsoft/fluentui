import type {
  ColorAreaProps as ColorAreaHeadlessProps,
  ColorAreaState as ColorAreaHeadlessState,
} from '@fluentui/react-headless-components-preview/color-picker';

import type { ColorPickerShape } from '../ColorPicker/ColorPicker.types';

export type { ColorAreaSlots } from '@fluentui/react-headless-components-preview/color-picker';

/**
 * Windmod ColorArea props: the headless area plus the look prop the headless surface deliberately
 * omits.
 */
export type ColorAreaProps = ColorAreaHeadlessProps & {
  /** @default the enclosing ColorPicker's shape, then 'rounded' */
  shape?: ColorPickerShape;
};

/** Windmod ColorArea state: headless state plus the resolved look prop. */
export type ColorAreaState = ColorAreaHeadlessState & Required<Pick<ColorAreaProps, 'shape'>>;
