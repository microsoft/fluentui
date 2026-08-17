export { ColorArea } from './ColorArea';
export type {
  ColorAreaBaseProps,
  ColorAreaBaseState,
  ColorAreaOnColorChangeData,
  ColorAreaProps,
  ColorAreaSlots,
  ColorAreaState,
} from './ColorArea.types';
export { renderColorArea_unstable } from './renderColorArea';
export { useColorAreaBase_unstable, useColorArea_unstable } from './useColorArea';
// eslint-disable-next-line @typescript-eslint/no-deprecated -- deprecated for STYLING (DECISIONS.md D16.5); re-exporting the identity constant is the point.
export { colorAreaClassNames, useColorAreaStyles_unstable } from './useColorAreaStyles.styles';
export { colorAreaCSSVars } from './ColorArea.constants';
