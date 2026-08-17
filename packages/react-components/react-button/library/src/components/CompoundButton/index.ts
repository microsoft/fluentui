export { CompoundButton } from './CompoundButton';
export type {
  CompoundButtonBaseProps,
  CompoundButtonBaseState,
  CompoundButtonProps,
  CompoundButtonSlots,
  CompoundButtonState,
} from './CompoundButton.types';
export { renderCompoundButton_unstable } from './renderCompoundButton';
export { useCompoundButtonBase_unstable, useCompoundButton_unstable } from './useCompoundButton';
// eslint-disable-next-line @typescript-eslint/no-deprecated -- deprecated for STYLING (DECISIONS.md D16.5); re-exporting the identity constant is the point.
export { compoundButtonClassNames, useCompoundButtonStyles_unstable } from './useCompoundButtonStyles.styles';
