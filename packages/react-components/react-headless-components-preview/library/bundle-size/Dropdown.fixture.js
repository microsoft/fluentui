// Named imports only - a namespace import keeps every export name as a string property in the minified output,
// which no consumer ships, and inflates the measured size.
import {
  Dropdown,
  Listbox,
  Option,
  OptionGroup,
  renderDropdown,
  renderListbox,
  renderOption,
  renderOptionGroup,
  useActiveDescendantContext,
  useDropdown,
  useDropdownContextValues,
  useListbox,
  useListboxContext,
  useListboxContextValues,
  useOption,
  useOptionGroup,
} from '@fluentui/react-headless-components-preview/dropdown';

console.log(
  Dropdown,
  Listbox,
  Option,
  OptionGroup,
  renderDropdown,
  renderListbox,
  renderOption,
  renderOptionGroup,
  useActiveDescendantContext,
  useDropdown,
  useDropdownContextValues,
  useListbox,
  useListboxContext,
  useListboxContextValues,
  useOption,
  useOptionGroup,
);

export default {
  name: '@fluentui/react-headless-components-preview/dropdown',
};
