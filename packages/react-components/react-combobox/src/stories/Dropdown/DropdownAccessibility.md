<details>
<summary>
 Accessibility
</summary>

### Do

- **Provide a label for the Dropdown.** This can be done either by using the `DropdownField` component with a `label` prop, or by using a [custom labelling technique](#TODO).
- **Consider using Select or a Checkbox group.** For simple single-select use cases, consider using `Select` for better accessibility and mobile support. For simple multiselect use cases with less than 10 options, consider using a group of `Checkbox` components.
- **Consider using `Dropdown` with outline or underline appearances.** When the contrast ratio against the immediate surrounding color is less than 3:1, consider using underline or outline styles which has a bottom border stroke. But please ensure the color of bottom border stroke has a sufficient contrast which is greater than 3 to 1 against the immediate surrounding color.
- **Set `inlinePopup={true}` when possible for better VoiceOver support.** The `inlinePopup` prop will cause the listbox popup to be rendered immediately after the button in the DOM. Safari does not support `aria-owns`, so this enables iOS VoiceOver swipe navigation between the button and options.
- **Review [known accessiblity issues](#TODO).**

### Don't

- **Don't nest interactive controls in Dropdown slots or children.** The `Dropdown`'s `button` slot and children of `<Option>` components will not expose nested interactive elements to screen reader users, and additional non-`Option` children in the `listbox` slot will not be keyboard accessible.
- **Don’t place the Dropdown button on a surface which doesn’t have a sufficient contrast.** The colors adjacent to the input should have a sufficient contrast. Particularly, the color of input with filled darker and lighter styles needs to provide greater than 3 to 1 contrast ratio against the immediate surrounding color to pass accessibility requirements.

Read the [Dropdown accessibility spec](#TODO) for more detailed information, as well as full descriptions of semantics and keyboard behavior.

</details>
