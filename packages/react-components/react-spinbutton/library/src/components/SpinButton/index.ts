export { SpinButton } from './SpinButton';
export type {
  SpinButtonBaseProps,
  SpinButtonBaseState,
  SpinButtonBounds,
  SpinButtonChangeEvent,
  SpinButtonOnChangeData,
  SpinButtonProps,
  SpinButtonSlots,
  SpinButtonSpinState,
  SpinButtonState,
} from './SpinButton.types';
export { renderSpinButton_unstable } from './renderSpinButton';
export { useSpinButtonBase_unstable, useSpinButton_unstable } from './useSpinButton';
// eslint-disable-next-line @typescript-eslint/no-deprecated -- re-exporting the retained identity constant IS the public-surface contract (DECISIONS.md D16.5): the export is kept so `root` keeps resolving, and `@deprecated` targets consumers who used it for styling, not this barrel.
export { spinButtonClassNames, useSpinButtonStyles_unstable } from './useSpinButtonStyles.styles';
