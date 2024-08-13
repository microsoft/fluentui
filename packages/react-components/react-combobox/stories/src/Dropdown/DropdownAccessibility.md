## Accessibility

### Do

- **Provide a label for the Dropdown.** This can be done either by using the `DropdownField` component with a `label` prop, or by using a [custom labeling technique](#TODO).
- **Use Dropdown when you need JSX or styled options, otherwise use Select.** For simple single-select use cases, consider using `Select` for better accessibility and mobile support.
- **Use multi-select Dropdown when you have 10+ options, otherwise use a Checkbox group.** For simple multiselect use cases with less than 10 options, consider using a group of `Checkbox` components.
- **Set `inlinePopup={true}` when possible for better VoiceOver support.** The `inlinePopup` prop will cause the listbox popup to be rendered immediately after the button in the DOM. Safari does not support `aria-owns`, so this enables iOS VoiceOver swipe navigation between the button and options.
- **Review [known accessiblity issues](./?path=/docs/concepts-developer-accessibility-components-dropdown--page).**

### Don't

- **Don't nest interactive controls in Dropdown slots or children.** The `Dropdown`'s `button` slot and children of `<Option>` components will not expose nested interactive elements to screen reader users, and additional non-`Option` children in the `listbox` slot will not be keyboard accessible.
- **Don’t place the Dropdown button on a surface which doesn’t have a sufficient contrast.** The colors adjacent to the input should have a sufficient contrast. Particularly, the color of input with filled darker and lighter styles needs to provide greater than 3 to 1 contrast ratio against the immediate surrounding color to pass accessibility requirements. When using underline or outline styles, ensure the color of bottom border stroke has a sufficient contrast of greater than 3 to 1 against the immediate surrounding color.

Read the [Dropdown accessibility spec](./?path=/docs/concepts-developer-accessibility-components-dropdown--page) for more detailed information, as well as full descriptions of semantics and keyboard behavior.
