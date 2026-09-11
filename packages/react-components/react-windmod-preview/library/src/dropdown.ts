export { Dropdown, dropdownClassNames, useDropdownStyles } from './components/Dropdown';
export type { DropdownAppearance, DropdownProps, DropdownSize, DropdownState } from './components/Dropdown';

/** Headless building blocks, re-exported for consumers composing their own Dropdown. */
export {
  renderDropdown,
  useDropdown,
  useDropdownContextValues,
} from '@fluentui/react-headless-components-preview/dropdown';
