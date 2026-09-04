import type {
  SwatchPickerProps as SwatchPickerHeadlessProps,
  SwatchPickerState as SwatchPickerHeadlessState,
} from '@fluentui/react-headless-components-preview/swatch-picker';

export type { SwatchPickerSlots } from '@fluentui/react-headless-components-preview/swatch-picker';

/** Size of a swatch. It reaches ColorSwatch, ImageSwatch and EmptySwatch through the swatchPicker context. */
export type SwatchPickerSize = 'extra-small' | 'small' | 'medium' | 'large';

/** Shape of a swatch. It reaches ColorSwatch, ImageSwatch and EmptySwatch through the swatchPicker context. */
export type SwatchPickerShape = 'rounded' | 'square' | 'circular';

/** Gap between swatches. It reaches SwatchPickerRow through the swatchPicker context. */
export type SwatchPickerSpacing = 'small' | 'medium';

/**
 * Windmod SwatchPicker props: the headless swatch picker plus the look props the headless surface
 * deliberately omits (they exist purely to select styles, here and in the swatches).
 */
export type SwatchPickerProps = SwatchPickerHeadlessProps & {
  /** @default 'medium' */
  size?: SwatchPickerSize;
  /** Left undefined by default; each swatch resolves 'square' for itself. */
  shape?: SwatchPickerShape;
  /** @default 'medium' */
  spacing?: SwatchPickerSpacing;
};

/** Windmod SwatchPicker state: headless state plus the resolved look props. */
export type SwatchPickerState = SwatchPickerHeadlessState & Pick<SwatchPickerProps, 'size' | 'shape' | 'spacing'>;
