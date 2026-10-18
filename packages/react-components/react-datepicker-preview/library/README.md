# @fluentui/react-datepicker-preview

**React Datepicker components for [Fluent UI React](https://react.fluentui.dev/)**

These are not production-ready components and **should never be used in product**. This space is useful for testing new components whose APIs might change before final release.

DatePicker composes Input and Calendar Preview with controlled/uncontrolled date selection, optional
text editing, validation callbacks, popup positioning, and modal focus management. Use Field for labels
and validation presentation. See the [spec](./docs/Spec.md) for the API and parity requirements.

```tsx
<Field label="Start date">
  <DatePicker placeholder="Select a date..." />
</Field>
```

`useDatePickerBase_unstable` shares date-input state, availability checks, and popup requests without
visual components, positioning, or Tabster. Custom integrations own their slots, focus, and dismissal
behavior. `useDatePicker_unstable` adds the standard Input/Calendar slots and popup integration.

For server rendering, wrap the application in Fluent UI's `SSRProvider`. An initially open portaled
popup mounts after hydration; an inline popup can be included in the server markup. Popup focus entry
and return use `preventScroll` so they do not trigger outside-scroll dismissal.

Automated interaction tests and example stories cover the supported API. Paired visual fixtures are
provided, but exact compat visual parity and manual screen-reader verification remain release gates;
this component is not yet certified as a production replacement for DatePicker Compat.
