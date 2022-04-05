### Layout

- Use a picker to quickly search for a few tags or files.
- Use a picker to manage a group of tags or files.

### Accessibility

Picker dropdowns render in their own layer by default to ensure they are not clipped by containers with `overflow: hidden` or `overflow: scroll`. This causes extra difficulty for people who use touch-based screen readers, so we recommend rendering pickers inline unless they are in overflow containers. To do so, set the following property on the picker, as demonstrated in the Tag Picker with Inline Suggestions example:

```js
pickerCalloutProps={{ doNotLayer: true }}
```
