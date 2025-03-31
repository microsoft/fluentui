### Layout

- Use a picker to quickly search for a few tags or files.
- Use a picker to manage a group of tags or files.

### Accessibility

Picker dropdowns render in their own layer by default to ensure they are not clipped by containers with `overflow: hidden` or `overflow: scroll`. This causes extra difficulty for people who use touch-based screen readers, so we recommend rendering pickers inline unless they are in overflow containers. To do so, set the following property on the picker, as demonstrated in the Tag Picker with Inline Suggestions example:

```js
pickerCalloutProps={{ doNotLayer: true }}
```

#### Truncation

By default, the Picker truncates item text in the dropdown instead of wrapping to a new line. To avoid losing meaningful information, adjusting styles to wrap the text is recommended. Tooltips are not shown for truncated text within the dropdown to avoid nested popups and the usability and accessibility issues they cause.

The Wrapped Picker example demonstrates how to override truncation styles to support wrapping. The default style will continue to truncate to support existing implementations.
