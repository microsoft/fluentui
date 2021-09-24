### Layout

- Use a combo box when there are multiple choices that can be collapsed under one title, when the list of items is long, or when space is constrained.

### Content

- Use single words or shortened statements as options.
- Don't use punctuation at the end of options.

### Accessibility

Combobox dropdowns render in their own layer by default to ensure they are not clipped by containers with `overflow: hidden` or `overflow: scroll`. This causes extra difficulty for people who use touch-based screen readers, so we recommend rendering the Combobox options dropdown inline unless they are in overflow containers. To do so, set the following property on the Combobox, as demonstrated in the ComboBox with inline dropdown example:

```js
calloutProps={{ doNotLayer: true }}
```

#### Truncation

By default, the Combobox truncates option text instead of wrapping to a new line. To avoid losing meaningful information, adjusting styles to wrap the name while keeping additional secondary text short is recommended.

The `ComboBox with custom styling` example demonstrates how to override truncation styles to support wrapping. The default style will continue to truncate to support existing implementations.
