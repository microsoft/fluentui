### Layout

- Use a dropdown when there are multiple choices that can be collapsed under one title, if the list of items is too long, or when space is constrained.
- Use a dropdown when the selected option is more important than the alternatives (in contrast to radio buttons where all the choices are visible, putting equal emphasis on all options).

### Content

- Use sentence-style capitalization—only capitalize the first word. For more info, see [Capitalization](https://docs.microsoft.com/style-guide/capitalization) in the Microsoft Writing Style Guide.
- The dropdown label should describe what can be found in the list of options.
- Use shortened statements or single words as list options.
- If there isn't a default option, use "Select an option" as placeholder text.
- If "None" is an option, include it.
- Write the choices using parallel construction. For example, start with the same part of speech or verb tense.
- Dropdown does not support any interactive content aside from the options themselves.

### Accessibility

Dropdown popups render in their own layer by default to ensure they are not clipped by containers with `overflow: hidden` or `overflow: scroll`. This causes extra difficulty for people who use touch-based screen readers, so we recommend rendering the Dropdown options list inline unless they are in overflow containers. To do so, set the following property on the Dropdown:

```jsx
calloutProps={{ doNotLayer: true }}
```

#### Truncation

By default, the Dropdown truncates option text instead of wrapping to a new line.
Because this can lose meaningful information, it is recommended to adjust styles to wrap the option text.

The `Dropdown with wrapping option text` example demonstrates how to override truncation styles to support wrapping. The default style will continue to truncate to support existing implementations.

#### Selected option styles

The default styles for the selected option in single-select Dropdowns is a light grey background. This doesn't have strong contrast against the default white background, so adding custom selection styles is recommended and demonstrated in the "Dropdown with custom selected option styles" example.

Although the selected item text is displayed in the Dropdown itself, adding additional contrast to the selected option within the list of options adds better accessibility for users with low vision.
