# @fluentui/react-timepicker-preview Spec

## Background

`TimePicker` lets a user pick a time of day from a list of predefined options, or, in its freeform variant, type a custom time. It is built on top of the v9 `Combobox`, so it shares Combobox's structure, keyboard interaction and accessibility semantics.

This package is a preview. Its API can change before a stable v9 TimePicker is released and it must not be used in production.

It replaces [`@fluentui/react-timepicker-compat`](../../../react-timepicker-compat/library/docs/Spec.md). The compat component kept most of the v8 API surface; this package keeps the same behavior but follows v9 conventions:

- callbacks use the v9 `EventHandler<Data>` signature;
- a design-free `useTimePickerBase_unstable` hook is exported so the component can be composed by `@fluentui/react-headless-components-preview`;
- time formatting and parsing utilities are part of the public API;
- state is never mutated after it is created by Combobox hooks; behavior is composed through merged callbacks and refs.

## Prior Art

- [Fluent UI v8 TimePicker](../../../../react/src/components/TimePicker/TimePicker.types.ts)
- [Fluent UI v9 TimePicker compatibility component](../../../react-timepicker-compat/library/src/components/TimePicker/TimePicker.types.ts)
- [Fluent UI v9 Combobox Spec](../../../react-combobox/library/docs/Spec.md)
- [GitHub issue #26642](https://github.com/microsoft/fluentui/issues/26642)
- [WAI-ARIA Authoring Practices combobox pattern](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/)

## Sample Code

### Basic selection

```tsx
import * as React from 'react';
import { Field } from '@fluentui/react-components';
import { TimePicker } from '@fluentui/react-timepicker-preview';
import type { TimePickerSelectedTimeChangeData } from '@fluentui/react-timepicker-preview';

export const Example = () => {
  const [selectedTime, setSelectedTime] = React.useState<Date | null>(null);

  const onSelectedTimeChange = (_event: unknown, data: TimePickerSelectedTimeChangeData) => {
    setSelectedTime(data.selectedTime);
  };

  return (
    <Field label="Meeting time">
      <TimePicker selectedTime={selectedTime} onSelectedTimeChange={onSelectedTimeChange} />
    </Field>
  );
};
```

### Business hours, 15 minute steps, 24 hour format

```tsx
<TimePicker startHour={9} endHour={17} increment={15} hourCycle="h23" />
```

### Freeform input with validation

```tsx
const [error, setError] = React.useState<string>();

<Field label="Start time" validationMessage={error}>
  <TimePicker
    freeform
    onSelectedTimeChange={(_e, { errorType }) => {
      setError(errorType === 'invalid-input' ? 'Enter a valid time' : undefined);
    }}
  />
</Field>;
```

## Variants

- **Basic**: the user selects one of the generated options. Typing moves the active option to the first match (Combobox behavior).
- **Freeform** (`freeform`): the user can type any time. The typed text is parsed with `parseTimeStringToDate` and committed when it has changed and the user presses <kbd>Enter</kbd> (with no active option) or focus leaves the TimePicker. This mirrors the native `change` event of `<input>`.
- **Clearable** (`clearable`): renders a clear button that resets the selection.

Visual variants (`appearance`, `size`) are the same as Combobox.

## API

See [TimePicker.types.ts](../src/components/TimePicker/TimePicker.types.ts).

### Props

| Prop                     | Type                                                        | Default                  | Description                                                                      |
| ------------------------ | ----------------------------------------------------------- | ------------------------ | -------------------------------------------------------------------------------- |
| `selectedTime`           | `Date \| null`                                              | —                        | Controlled selected time.                                                        |
| `defaultSelectedTime`    | `Date \| null`                                              | `null`                   | Initial selected time for uncontrolled usage.                                    |
| `onSelectedTimeChange`   | `EventHandler<TimePickerSelectedTimeChangeData>`            | —                        | Called when a time is selected or, in freeform mode, committed from input text.  |
| `startHour`              | `Hour` (0–24)                                               | `0`                      | Start hour (inclusive) of the generated options.                                 |
| `endHour`                | `Hour` (0–24)                                               | `24`                     | End hour (exclusive). When `endHour <= startHour` the range rolls over midnight. |
| `increment`              | `number`                                                    | `30`                     | Minutes between generated options.                                               |
| `dateAnchor`             | `Date`                                                      | selected time or today   | Date all options are based on.                                                   |
| `hourCycle`              | `'h11' \| 'h12' \| 'h23' \| 'h24'`                          | locale                   | 12 or 24 hour format.                                                            |
| `showSeconds`            | `boolean`                                                   | `false`                  | Show and validate seconds.                                                       |
| `formatDateToTimeString` | `(date: Date, options: TimeFormatOptions) => string`        | `formatDateToTimeString` | Customizes option text.                                                          |
| `parseTimeStringToDate`  | `(text: string \| undefined) => TimeStringValidationResult` | `getDateFromTimeString`  | Customizes parsing and validation of freeform text.                              |
| `freeform`               | `boolean`                                                   | `false`                  | Allows typing a custom time.                                                     |

TimePicker also accepts the Combobox props `appearance`, `clearable`, `defaultOpen`, `open`, `onOpenChange`, `inlinePopup`, `mountNode`, `placeholder`, `positioning`, `size`, `value` and `defaultValue` (input text), plus native `<input>` props.

`TimePickerSelectedTimeChangeData`:

```ts
type TimePickerSelectedTimeChangeData = {
  selectedTime: Date | null;
  selectedTimeText: string | undefined;
  errorType: TimePickerErrorType | undefined; // 'invalid-input' | 'out-of-bounds' | 'required-input'
};
```

### Slots

Same as Combobox: `root`, `input`, `expandIcon`, `clearIcon`, `listbox`.

### Utilities

`formatDateToTimeString`, `getDateFromTimeString`, `getDateStartAnchor`, `getDateEndAnchor` and `getTimesBetween` are exported for consumers building custom formatting or parsing.

### Hooks

| Hook                                  | Purpose                                                                                                 |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| `useTimePicker_unstable`              | Full styled state: design props, default icons, Tabster integration.                                    |
| `useTimePickerBase_unstable`          | Behavior only (no `appearance`/`size`, icons or Tabster), built on `useComboboxBase_unstable`.          |
| `useTimePickerSelection_unstable`     | Resolves time props into options, selection state and Combobox props. Independent of the Combobox hook. |
| `useTimePickerComboboxState_unstable` | Applies freeform commit, clear and Field labelling behavior on top of any Combobox state.               |
| `useTimePickerStyles_unstable`        | Griffel styles.                                                                                         |
| `useTimePickerContextValues_unstable` | Context values for the listbox.                                                                         |
| `renderTimePicker_unstable`           | Renders the state.                                                                                      |

`useTimePickerSelection_unstable` and `useTimePickerComboboxState_unstable` let `@fluentui/react-headless-components-preview` compose TimePicker with its own Combobox state hook, which does not use `@fluentui/react-positioning`.

## Structure

```html
<div class="fui-TimePicker">
  <input class="fui-TimePicker__input" role="combobox" aria-expanded="true" aria-controls="listbox-id" />
  <span class="fui-TimePicker__clearIcon" aria-hidden="true"></span>
  <span class="fui-TimePicker__expandIcon" role="button" aria-label="Open"></span>
  <!-- rendered in a portal unless inlinePopup -->
  <div class="fui-TimePicker__listbox" role="listbox" id="listbox-id">
    <div role="option" aria-selected="false">9:00 AM</div>
    <div role="option" aria-selected="true">9:30 AM</div>
  </div>
</div>
```

## Migration

### From `@fluentui/react-timepicker-compat`

| Compat                                                   | Preview                                                                   |
| -------------------------------------------------------- | ------------------------------------------------------------------------- |
| `onTimeChange(event, data)`                              | `onSelectedTimeChange` (`EventHandler<TimePickerSelectedTimeChangeData>`) |
| `TimeSelectionData`                                      | `TimePickerSelectedTimeChangeData`                                        |
| `TimeSelectionEvents`                                    | `TimePickerSelectedTimeChangeEvent`                                       |
| `formatDateToTimeString: (date) => string`               | `formatDateToTimeString: (date, options) => string`                       |
| `useTimePickerCompatStyles_unstable` (custom style hook) | not available yet; style with `className` or `timePickerClassNames`       |

All other props are unchanged.

### From v8

See the [compat migration guide](../../../react-timepicker-compat/library/docs/Migration.md). Note that v8 `onValidateUserInput` maps to `parseTimeStringToDate`.

## Behaviors

- **Opening**: click on the input or chevron, <kbd>Alt</kbd>+<kbd>ArrowDown</kbd>, or typing.
- **Selecting**: click an option, or <kbd>Enter</kbd> on the active option. `onSelectedTimeChange` fires with the option's time.
- **Freeform commit**: when the input text changed since the last commit, <kbd>Enter</kbd> without an active option or focus leaving the TimePicker parses the text and fires `onSelectedTimeChange`, including `errorType` when parsing or range validation fails. While the text does not prefix-match the active option, the active option is cleared so <kbd>Enter</kbd> commits the typed text.
- **Clearing**: the clear button fires `onSelectedTimeChange` with `selectedTime: null`.

## Accessibility

- Follows the ARIA combobox pattern implemented by Combobox (`role="combobox"` input with `aria-activedescendant` pointing into a `role="listbox"` popup).
- When wrapped in `Field`, the chevron button is labelled by its own label and the field label (`aria-labelledby`) so screen readers announce e.g. "Open, Meeting time".
- TimePicker has no built-in error messages. Consumers should render `errorType` through `Field`'s `validationMessage`.
