// Named imports only - a namespace import keeps every export name as a string property in the minified output,
// which no consumer ships, and inflates the measured size.
import {
  Combobox,
  Listbox,
  Option,
  OptionGroup,
  renderCombobox,
  renderListbox,
  renderOption,
  renderOptionGroup,
  useActiveDescendantContext,
  useCombobox,
  useComboboxContextValues,
  useComboboxFilter,
  useListbox,
  useListboxContext,
  useListboxContextValues,
  useOption,
  useOptionGroup,
} from '@fluentui/react-headless-components-preview/combobox';

console.log(
  Combobox,
  Listbox,
  Option,
  OptionGroup,
  renderCombobox,
  renderListbox,
  renderOption,
  renderOptionGroup,
  useActiveDescendantContext,
  useCombobox,
  useComboboxContextValues,
  useComboboxFilter,
  useListbox,
  useListboxContext,
  useListboxContextValues,
  useOption,
  useOptionGroup,
);

export default {
  name: '@fluentui/react-headless-components-preview/combobox',
};
