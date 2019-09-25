Checkbox is accessible if these considerations are followed:

- The check mark should have contrast ratio of 3:1 with checkbox fill color.
- The checkbox fill color should either have a:
  - Contrast ratio of 3:1 with the border color.
  - Contrast ratio of 3:1 with the adjacent background color.
- Checkbox should get activated with SPACE key.
- If there is a group of checkboxes, it should be contained inside a list using `<ul>`, as it helps screen readers parse the number of checkboxes in the group.
- The check container element should have a `role="group"`
- The container element is associated with visible label using `aria-labelledby` property.
- When further instruction is needed, they should be conveyed by associating the instruction to the container element using using `aria-discribedby` property.
- For a custom checkbox:
  - The `role="checkbox"` should be provided, so that screen readers identify it as a checkbox.
  - Tabindex property should be set to "0", so that it would become focusable using TAB key.
  - The checked and unchecked state should be conveyed by setting `aria-checked` property to "true" or "false" respectively.
  - When using a tri-state checkbox, `aria-checked` property should be set to "mixed".
