# @fluentui/react-timepicker-compat Migration Guide

## Migration from v8 TimePicker

### Property mapping

TimePicker specific props:

| v8 TimePicker         | v9 TimePicker                                                 |
| --------------------- | ------------------------------------------------------------- |
| `dateAnchor`          | `dateAnchor`                                                  |
| `defaultValue`        | `defaultSelectedTime`                                         |
| `increments`          | `increment`                                                   |
| `label`               | handled by `Field`                                            |
| `onChange`            | `onTimeChange`                                                |
| `onFormatDate`        | `formatDateToTimeString`                                      |
| `onValidateUserInput` | `formatDateToTimeString`                                      |
| `onValidationResult`  | `onTimeChange` contains error type in `data`                  |
| `showSeconds`         | `showSeconds`                                                 |
| `strings`             | use `Field` to display error. See 'Custom Validation' example |
| `timeRange`           | `startHour` and `endHour`                                     |
| `useHour12`           | `hourCycle='h11'` or `hourCycle='h12'`                        |
| `value`               | `selectedTime`                                                |

V8 TimePicker is built on v8 Combobox, and v9 TimePicker compat on v9 Combobox. Please see Combobox migration guide for the rest of the props.

\*In v9, any native HTML properties supported on an `<input>` element may be set on `<Combobox>`, including the `onChange` handler. Because of this, the v8 `onChange` selection callback has been updated to `onTimeChange`. The v9 TimePicker's `onChange` event behavior is the same as for an `<input>` element, or the v9 Input control.

### Validate selected time

V8 TimePicker allows custom validation on freeform input via `onValidateUserInput`. There is no way to validate selected option from dropdown.
V9 TimePicker should be used together with `Field` component, and it provides more flexibility for custom validation. You can perform custom parsing and validation for freeform input using `formatDateToTimeString`. Validation of the selected time option from the dropdown can be achieved by validating the `selectedTime` within `onTimeChange` callback.

v8 TimePicker has default error messages. v9 TimePicker has no default error message - it returns an error type from `onTimeChange` that can be used to display a custom error message.
