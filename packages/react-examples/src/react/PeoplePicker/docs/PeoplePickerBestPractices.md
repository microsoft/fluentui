### Layout

- Use the people picker to add someone to the To line of an email, or to add someone to a list.
- Use the `MemberList PeoplePicker` to display selections below the input field.

### Accessibility

#### Mobile Accessibility

PeoplePicker dropdowns render in their own layer by default to ensure they are not clipped by containers with `overflow: hidden` or `overflow: scroll`. This causes extra difficulty for people who use touch-based screen readers, so we recommend rendering the PeoplePicker inline unless it is in an overflow container. To do so, set the following property on the PeoplePicker:

```js
pickerCalloutProps={{ doNotLayer: true }}
```

#### Truncation

By default, the PeoplePicker truncates item text in the dropdown instead of wrapping to a new line. To avoid losing meaningful information, adjusting styles to wrap the name while keeping additional secondary text short is recommended. Tooltips are not shown for truncated text within the dropdown to avoid nested popups and the usability and accessibility issues they cause.

The List People Picker example demonstrates how to override truncation styles to support wrapping. The default style will continue to truncate to support existing implementations.
