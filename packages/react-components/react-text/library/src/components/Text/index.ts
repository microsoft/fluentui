export { Text } from './Text';
export type { TextPresetProps, TextProps, TextSlots, TextState } from './Text.types';
export { renderText_unstable } from './renderText';
export { useText_unstable } from './useText';
// eslint-disable-next-line @typescript-eslint/no-deprecated -- `textClassNames` is deprecated for styling (DECISIONS.md D16.5); re-exporting it is the point.
export { textClassNames, useTextStyles_unstable } from './useTextStyles.styles';
