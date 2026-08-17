export { ColorSwatch } from './ColorSwatch';
export type {
  ColorSwatchBaseProps,
  ColorSwatchBaseState,
  ColorSwatchProps,
  ColorSwatchSlots,
  ColorSwatchState,
} from './ColorSwatch.types';
export { renderColorSwatch_unstable } from './renderColorSwatch';
export { useColorSwatch_unstable, useColorSwatchBase_unstable } from './useColorSwatch';
// eslint-disable-next-line @typescript-eslint/no-deprecated -- deprecated for STYLING (DECISIONS.md D16.5); re-exporting the identity constant is the point.
export { colorSwatchClassNames, useColorSwatchStyles_unstable } from './useColorSwatchStyles.styles';
export { swatchCSSVars } from './ColorSwatch.constants';
