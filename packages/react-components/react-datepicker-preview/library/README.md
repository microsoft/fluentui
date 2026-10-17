# @fluentui/react-datepicker-preview

**React Datepicker components for [Fluent UI React](https://react.fluentui.dev/)**

These are not production-ready components and **should never be used in product**. This space is useful for testing new components whose APIs might change before final release.

The exported DatePicker is currently a scaffold, not a usable date input. The proposed API and parity
requirements are described in the [spec](./docs/Spec.md).

The internal `useDatePickerDateState` hook implements selection, editable draft text, parsing, and
validation for reuse by the styled and headless integrations. It is not yet connected to the scaffold
or exported as a supported API. Calendar availability is supplied by the integration so the hook does
not duplicate Calendar's date arithmetic or range generation.
