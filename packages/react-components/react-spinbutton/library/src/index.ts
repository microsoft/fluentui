export {
  SpinButton,
  renderSpinButton_unstable,
  // eslint-disable-next-line @typescript-eslint/no-deprecated -- re-exporting the retained identity constant IS the public-surface contract (DECISIONS.md D16.5): the export is kept so `root` keeps resolving, and `@deprecated` targets consumers who used it for styling, not this barrel.
  spinButtonClassNames,
  useSpinButtonStyles_unstable,
  useSpinButtonBase_unstable,
  useSpinButton_unstable,
} from './SpinButton';
export type {
  SpinButtonBaseProps,
  SpinButtonBaseState,
  SpinButtonOnChangeData,
  SpinButtonChangeEvent,
  SpinButtonProps,
  SpinButtonSlots,
  SpinButtonState,
  SpinButtonSpinState,
  SpinButtonBounds,
} from './SpinButton';
