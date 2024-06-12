# @fluentui/react-timepicker-compat Spec

## Background

Compat component for [V8 TimePicker](https://developer.microsoft.com/en-us/fluentui#/controls/web/timepicker).

> ⚠️ A compat component is a component taken from v8 and partially updated with the v9 toolset while keeping its original functionality and most of the original API surface. The most noticeable change being the removal of all v8 dependencies and using only v9 dependencies. While this is a good first step, this is not the final v9 component. We are working on a fully fleshed v9 replacement that will follow all v9 patterns and conventions.

TimePicker offers a control that’s optimized for selecting a time from a drop-down list or using free-form input to enter a custom time.

**TimePicker is built on top of v9 Combobox. Combobox [Spec.md](../../react-combobox/docs/Spec.md) covers the variants, structure and accessibility of TimePicker. This spec highlights the TimePicker specifics.**

## Prior Art

- [26642](https://github.com/microsoft/fluentui/issues/26642)

## Selection Behaviors

When selecting a time, the time is validated, `onTimeChange` callback is fired with the selected time and the error if the time is invalid. TimePicker has two variants that provides different selection behavior:

1. **Basic TimePicker**: a v9 Combobox with predefined time options.
   - Selecting an option from the dropdown invokes `onTimeChange` callback.
2. **Freeform TimePicker**: a v9 Combobox with predefined time options that allows freeform input.
   - Selecting an option from the dropdown invokes `onTimeChange` callback.
   - Time is selected from freeform input when its value has changed, and TimePicker loses focus or <kbd>Enter</kbd> key is pressed. `onTimeChange` is triggered with the selected time from `input` value. This behavior aligns with the native `change` event for text input.
     > freeform TimePicker's selection behavior is different from freeform Combobox. Combobox lacks the equivalent callback for native change event ([29494](https://github.com/microsoft/fluentui/issues/29494))

## API

See API at [TimePicker.types.ts](../src/components/TimePicker/TimePicker.types.ts).

TimePicker share slots, visual and positioning props with Combobox. Its own specific props are:

- For selection: `defaultSelectedTime`, `selectedTime` and `onTimeChange`.
  - parsing and validation of selected time text: `formatDateToTimeString`
- For generating time options:
  - `startHour`, `endHour` and `increment` props are used to generate the predefined time options.
  - The options' format can be changed via `hourCycle` and `showSeconds` props. Further customization is available via `formatDateToTimeString`.
