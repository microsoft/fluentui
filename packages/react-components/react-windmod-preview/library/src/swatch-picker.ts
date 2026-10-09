export { SwatchPicker, swatchPickerClassNames, useSwatchPickerStyles } from './components/SwatchPicker';
export type {
  SwatchPickerProps,
  SwatchPickerShape,
  SwatchPickerSize,
  SwatchPickerSlots,
  SwatchPickerSpacing,
  SwatchPickerState,
} from './components/SwatchPicker';

export { ColorSwatch, colorSwatchClassNames, useColorSwatchStyles } from './components/ColorSwatch';
export type { ColorSwatchProps, ColorSwatchSlots, ColorSwatchState } from './components/ColorSwatch';

export { EmptySwatch, emptySwatchClassNames, useEmptySwatchStyles } from './components/EmptySwatch';
export type { EmptySwatchProps, EmptySwatchSlots, EmptySwatchState } from './components/EmptySwatch';

export { ImageSwatch, imageSwatchClassNames, useImageSwatchStyles } from './components/ImageSwatch';
export type { ImageSwatchProps, ImageSwatchSlots, ImageSwatchState } from './components/ImageSwatch';

export { SwatchPickerRow, swatchPickerRowClassNames, useSwatchPickerRowStyles } from './components/SwatchPickerRow';
export type { SwatchPickerRowProps, SwatchPickerRowSlots, SwatchPickerRowState } from './components/SwatchPickerRow';

/** Headless building blocks, re-exported for consumers composing their own SwatchPicker. */
export {
  renderColorSwatch,
  renderEmptySwatch,
  renderImageSwatch,
  renderSwatchPicker,
  renderSwatchPickerRow,
  useColorSwatch,
  useEmptySwatch,
  useImageSwatch,
  useSwatchPicker,
  useSwatchPickerContextValue,
  useSwatchPickerContextValues,
  useSwatchPickerRow,
} from '@fluentui/react-headless-components-preview/swatch-picker';
