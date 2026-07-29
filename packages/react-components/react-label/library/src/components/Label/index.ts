export { Label } from './Label';
export type { LabelBaseProps, LabelBaseState, LabelProps, LabelSlots, LabelState } from './Label.types';
export { renderLabel_unstable } from './renderLabel';
export { useLabel_unstable, useLabelBase_unstable } from './useLabel';
// eslint-disable-next-line @typescript-eslint/no-deprecated -- `labelClassNames` is deprecated for styling (DECISIONS.md D16.5); re-exporting it is the point.
export { labelClassNames, useLabelStyles_unstable } from './useLabelStyles.styles';
