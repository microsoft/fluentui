import type {
  ColorPickerProps as ColorPickerHeadlessProps,
  ColorPickerState as ColorPickerHeadlessState,
} from '@fluentui/react-headless-components-preview/color-picker';

export type { ColorPickerSlots } from '@fluentui/react-headless-components-preview/color-picker';

/** Shape of the controls a ColorPicker coordinates — it reaches them through the context. */
export type ColorPickerShape = 'rounded' | 'square';

/**
 * Windmod ColorPicker props: the headless picker plus the look prop the headless surface
 * deliberately omits (it exists purely to select styles, on the controls rather than here).
 */
export type ColorPickerProps = ColorPickerHeadlessProps & {
  /** @default undefined — each control resolves 'rounded' for itself. */
  shape?: ColorPickerShape;
};

/**
 * Windmod ColorPicker state: headless state plus the look prop. It is deliberately not
 * `Required` — an unset `shape` must reach the context as `undefined`.
 */
export type ColorPickerState = ColorPickerHeadlessState & Pick<ColorPickerProps, 'shape'>;
