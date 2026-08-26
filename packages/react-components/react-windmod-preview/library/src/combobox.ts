export { Combobox, comboboxClassNames, useComboboxStyles } from './components/Combobox';
export type {
  ComboboxAppearance,
  ComboboxProps,
  ComboboxSize,
  ComboboxSlots,
  ComboboxState,
} from './components/Combobox';

/** Headless building blocks, re-exported for consumers composing their own Combobox. */
export {
  renderCombobox,
  useCombobox,
  useComboboxContextValues,
  useComboboxFilter,
} from '@fluentui/react-headless-components-preview/combobox';
