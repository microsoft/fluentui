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
} from './components/SpinButton/index';
export {
  SpinButton,
  renderSpinButton_unstable,
  // eslint-disable-next-line @typescript-eslint/no-deprecated -- re-exporting the retained identity constant IS the public-surface contract (DECISIONS.md D16.5): the export is kept so `root` keeps resolving, and `@deprecated` targets consumers who used it for styling, not this barrel.
  spinButtonClassNames,
  useSpinButtonStyles_unstable,
  useSpinButtonBase_unstable,
  useSpinButton_unstable,
} from './components/SpinButton/index';
