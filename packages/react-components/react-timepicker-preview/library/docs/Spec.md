# @fluentui/react-timepicker-preview Spec

## Background

`TimePicker` lets a user pick a time of day from a list of predefined options, or, in its freeform variant, type a custom time. It is built on top of the v9 `Combobox`, so it shares Combobox's structure, keyboard interaction and accessibility semantics.

This package is a preview. Its API can change before a stable v9 TimePicker is released and it must not be used in production.

It replaces [`@fluentui/react-timepicker-compat`](../../../react-timepicker-compat/library/docs/Spec.md). The compat component kept most of the v8 API surface; this package keeps the same behavior but follows v9 conventions:

- the value uses the `value` / `defaultValue` / `onChange` convention of v9 form controls: `value` is a `Date | null`, the display text is derived from it, and `onChange` fires on a change, not on every keystroke;
- callbacks use the v9 `EventHandler<Data>` signature;
- a design-free `useTimePickerBase_unstable` hook is exported so the component can be composed by `@fluentui/react-headless-components-preview`;
- time formatting and parsing utilities are part of the public API;
- state is never mutated after it is created by Combobox hooks; behavior is composed through merged callbacks and refs.

## Glossary

**Value**: the time the TimePicker holds, a `Date | null`. It is set by a change and read from `value` or `data.value`.
_Avoid_: selection, selected time, time.

**Selected option**: the listbox option whose time equals the value. There is none when the value is `null`, lies between options or lies outside the range.
_Avoid_: selection, highlighted option.

**Display text**: the text the input shows at any moment.
_Avoid_: input text, input value.

**Typed text**: text the user entered in freeform mode that has not been committed yet.

**Change**: any event that sets the value: a select, a commit or a clear. It is what `onChange` reports.

**Select**: choosing an option, by click or by <kbd>Enter</kbd> on the active option.

**Commit**: parsing the typed text into a value, on <kbd>Enter</kbd> with no active option or when focus leaves the TimePicker. Only freeform TimePickers commit.
_Avoid_: submit.

**Clear**: setting the value to `null` through the clear button, without validation.

**Anchor**: the calendar day the options are built on, from `dateAnchor` or from the initial value.
_Avoid_: anchor date, base date.

**Start anchor**, **end anchor**: the first instant of the range and the first instant after it, both on the anchor day or the day after.

**Range**: the half-open span from the start anchor to the end anchor. A time outside it is **out of bounds**, which is also the name of the error type.
_Avoid_: time range, window.

**Resolved hour cycle**: the hour cycle used for formatting and parsing: the `hourCycle` prop, otherwise the one of the runtime locale.

## Prior Art

- [Fluent UI v8 TimePicker](../../../../react/src/components/TimePicker/TimePicker.types.ts)
- [Fluent UI v9 TimePicker compatibility component](../../../react-timepicker-compat/library/src/components/TimePicker/TimePicker.types.ts)
- [Fluent UI v9 Combobox Spec](../../../react-combobox/library/docs/Spec.md)
- [GitHub issue #26642](https://github.com/microsoft/fluentui/issues/26642)
- [WAI-ARIA Authoring Practices combobox pattern](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/)

## Sample Code

### Basic usage

```tsx
import * as React from 'react';
import { Field } from '@fluentui/react-components';
import { TimePicker } from '@fluentui/react-timepicker-preview';
import type { TimePickerOnChangeData } from '@fluentui/react-timepicker-preview';

export const Example = () => {
  const [value, setValue] = React.useState<Date | null>(null);

  const onChange = (_event: unknown, data: TimePickerOnChangeData) => {
    setValue(data.value);
  };

  return (
    <Field label="Meeting time">
      <TimePicker value={value} onChange={onChange} />
    </Field>
  );
};
```

### Business hours, 15 minute steps, 24 hour format

```tsx
<TimePicker startHour={9} endHour={17} increment={15} hourCycle="h23" />
```

### Overnight range

```tsx
// Options from 22:00 on the anchor day to 02:00 on the next day.
// Ranges that cross midnight need an explicit `dateAnchor`, see "Anchor" below.
<TimePicker startHour={22} endHour={2} dateAnchor={new Date(2026, 9, 6)} />
```

### Freeform input with validation

```tsx
const [error, setError] = React.useState<string>();

<Field label="Start time" required validationMessage={error}>
  <TimePicker
    freeform
    onChange={(_e, { errorType }) => {
      setError(errorType === 'invalid-input' ? 'Enter a valid time' : undefined);
    }}
  />
</Field>;
```

## Variants

- **Basic**: the user selects one of the generated options. Typing moves the active option to the first match (Combobox behavior).
- **Freeform** (`freeform`): the user can type any time. The typed text is parsed with `parseTimeStringToDate` and committed when it has changed and the user presses <kbd>Enter</kbd> (with no active option) or focus leaves the TimePicker. This mirrors the native `change` event of `<input>`.
- **Clearable** (`clearable`): renders a clear button that clears the value.

Visual variants (`appearance`, `size`) are the same as Combobox.

## API

See [TimePicker.types.ts](../src/components/TimePicker/TimePicker.types.ts).

### Props

| Prop                     | Type                                                        | Default                               | Description                                                                                               |
| ------------------------ | ----------------------------------------------------------- | ------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| `value`                  | `Date \| null`                                              | —                                     | Controlled value.                                                                                         |
| `defaultValue`           | `Date \| null`                                              | `null`                                | Initial value for uncontrolled usage.                                                                     |
| `onChange`               | `EventHandler<TimePickerOnChangeData>`                      | —                                     | Called on a change: a select, a commit or a clear. Not called on every keystroke; use `onInput` for that. |
| `startHour`              | `Hour` (0–24)                                               | `0`                                   | Start hour (inclusive) of the range.                                                                      |
| `endHour`                | `Hour` (0–24)                                               | `24`                                  | End hour (exclusive). When `endHour < startHour` the range crosses midnight.                              |
| `increment`              | `number`                                                    | `30`                                  | Minutes of elapsed time between options. Must be a finite positive integer.                               |
| `dateAnchor`             | `Date`                                                      | initial value, else the date on mount | The anchor. Resolved once, see "Anchor" below. Required for ranges that cross midnight.                   |
| `hourCycle`              | `'h11' \| 'h12' \| 'h23' \| 'h24'`                          | locale                                | 12 or 24 hour format, used for both formatting and parsing. See "Formatting and parsing" below.           |
| `showSeconds`            | `boolean`                                                   | `false`                               | Show and validate seconds.                                                                                |
| `formatDateToTimeString` | `(date: Date, options: TimeFormatOptions) => string`        | `formatDateToTimeString`              | Customizes the option text and the display text.                                                          |
| `parseTimeStringToDate`  | `(text: string \| undefined) => TimeStringValidationResult` | `getDateFromTimeString`               | Customizes parsing and validation of the typed text.                                                      |
| `freeform`               | `boolean`                                                   | `false`                               | Allows typing a custom time.                                                                              |
| `required`               | `boolean`                                                   | `false`                               | Native attribute. Also read from the wrapping `Field`. Makes an empty commit report `required-input`.     |

TimePicker also accepts the Combobox props `appearance`, `clearable`, `defaultOpen`, `open`, `onOpenChange`, `inlinePopup`, `mountNode`, `placeholder`, `positioning` and `size`, plus native `<input>` props. `TimePickerProps` omits the native `value`, `defaultValue` and `onChange` from the input slot props, as Input and SpinButton do, and declares them with the `Date` types above. The display text cannot be controlled; it is always derived as described in "Display text".

### `onChange` data

The callback follows the v9 `EventHandler<Data>` signature, so the data carries the `event` and its `type`:

```ts
import type { EventData, EventHandler } from '@fluentui/react-utilities';

type TimePickerErrorType = 'invalid-input' | 'out-of-bounds' | 'required-input';

type TimePickerOnChangeData = {
  /** The new value: the selected option's time, the parsed typed text, or null. */
  value: Date | null;
  /** The display text after the change. */
  displayValue: string | undefined;
  /** Set when a commit failed. */
  errorType: TimePickerErrorType | undefined;
} & (
  | EventData<'click', React.MouseEvent<HTMLElement>>
  | EventData<'keydown', React.KeyboardEvent<HTMLElement>>
  | EventData<'blur', React.FocusEvent<HTMLElement>>
);

type OnChange = EventHandler<TimePickerOnChangeData>;
```

The event part is a discriminated union, as in TagPicker and Tree, so checking `data.type` narrows `data.event` to the matching React event. `type` says which gesture caused the change; the outcome is read from the payload. <kbd>Enter</kbd> is a `keydown` both for a select and for a commit, so `type` alone does not tell the two apart.

| Change                           | `type`                 | `value`               | `displayValue`  | `errorType` |
| -------------------------------- | ---------------------- | --------------------- | --------------- | ----------- |
| Select (click, <kbd>Enter</kbd>) | `'click'`, `'keydown'` | option time           | option text     | `undefined` |
| Commit, valid                    | `'keydown'`, `'blur'`  | parsed time           | formatted value | `undefined` |
| Commit, failed                   | `'keydown'`, `'blur'`  | see "Commit outcomes" | typed text      | set         |
| Clear                            | `'click'`              | `null`                | `undefined`     | `undefined` |

So: `errorType` set means a failed commit, `value === null` without `errorType` means a clear, and a `Date` without `errorType` is a new value regardless of whether it came from a select or a commit.

### Slots

Same as Combobox: `root`, `input`, `expandIcon`, `clearIcon`, `listbox`.

### Utilities

`formatDateToTimeString`, `getDateFromTimeString`, `getDateStartAnchor`, `getDateEndAnchor` and `getTimesBetween` are exported for consumers building custom formatting or parsing.

#### Option generation

`getTimesBetween(start, end, increment)` returns the dates from `start` (inclusive) to `end` (exclusive) that are `increment` minutes of elapsed time apart. It advances by `increment * 60_000` milliseconds, not by calendar minutes, so the spacing is preserved across daylight saving transitions.

`increment` must be a finite positive integer. For any other value (`0`, negative, `NaN`, `Infinity`, fractional) `getTimesBetween` returns `[]` and logs an error in development, and the TimePicker renders no options. Fractional minutes are not supported.

#### Formatting and parsing

Formatting and the default parser share the resolved hour cycle: the `hourCycle` prop when set, otherwise the hour cycle of the runtime locale (`Intl.DateTimeFormat().resolvedOptions().hourCycle`). `formatDateToTimeString` and `getDateFromTimeString` both receive the same `TimeFormatOptions`, so the default formatter and parser always agree on the format.

The default parser (`getDateFromTimeString`) accepts, after trimming leading and trailing whitespace:

| Resolved hour cycle | Accepted input                           | Notes                                                                 |
| ------------------- | ---------------------------------------- | --------------------------------------------------------------------- |
| `h23`               | `H:mm`, `HH:mm` with hour `0`–`23`       |                                                                       |
| `h24`               | `H:mm`, `HH:mm` with hour `1`–`24`       | `24:mm` is hour `0` of the same day, not a rollover to the next day.  |
| `h12`               | `h:mm AM`, `hh:mm AM` with hour `1`–`12` | Day period is case-insensitive and separated by a single ASCII space. |
| `h11`               | `h:mm AM`, `hh:mm AM` with hour `0`–`11` | Same as `h12`.                                                        |

With `showSeconds`, `:ss` is required; without it, seconds are rejected. Any other separator, digits outside the cycle's range or a missing day period in a 12-hour cycle produce `invalid-input`.

**Round trip guarantee**: the output of the default `formatDateToTimeString` parses back to the same time through the default `getDateFromTimeString` with the same options, for locales that use ASCII digits and `AM`/`PM` day periods (for example `en-US` and 24-hour locales such as `de-DE`). Localized digits and localized day periods (for example `午後`, `nachm.`) are **not** parsed by default. Consumers in those locales should pass `hourCycle="h23"` or supply a custom `parseTimeStringToDate`.

A parsed time earlier than the start anchor is placed on the day after the anchor (`startHour={22} endHour={2}` with input `1:00` yields 01:00 on the next day). The day is chosen before the clock fields are applied, so a time that does not exist on the anchor day because of a daylight saving transition is not shifted. When a clock time occurs twice on the anchor day, the occurrence inside the range wins. A time at or after the end anchor is returned with `errorType: 'out-of-bounds'`.

### Hooks

| Hook                                  | Purpose                                                                                        |
| ------------------------------------- | ---------------------------------------------------------------------------------------------- |
| `useTimePicker_unstable`              | Full styled state: design props, default icons, Tabster integration.                           |
| `useTimePickerBase_unstable`          | Behavior only (no `appearance`/`size`, icons or Tabster), built on `useComboboxBase_unstable`. |
| `useTimePickerSelection_unstable`     | Resolves time props into options, the value, the display text and Combobox props.              |
| `useTimePickerComboboxState_unstable` | Applies commit, clear and Field labelling behavior on top of any Combobox state.               |
| `useTimePickerStyles_unstable`        | Griffel styles.                                                                                |
| `useTimePickerContextValues_unstable` | Context values for the listbox.                                                                |
| `renderTimePicker_unstable`           | Renders the state.                                                                             |

`useTimePickerSelection_unstable` and `useTimePickerComboboxState_unstable` let `@fluentui/react-headless-components-preview` compose TimePicker with its own Combobox state hook, which does not use `@fluentui/react-positioning`. Their contracts are public:

```ts
/** Payload of a change, without the event part of `TimePickerOnChangeData`. */
type TimePickerCommitData = Pick<TimePickerOnChangeData, 'value' | 'displayValue' | 'errorType'>;

type TimePickerSelection<TComboboxProps> = TimePickerTimeState & {
  /** Props for the Combobox hook; its `children` are created from `options`. */
  comboboxProps: TComboboxProps;
  options: TimePickerOption[];
  /** Merged into the `clearIcon` slot to tell a clear apart from a commit. */
  clearIconRef: React.RefObject<HTMLSpanElement | null>;
  /** Applies a change: updates the value and the display text, then calls `onChange`. */
  commitValue: (event: TimePickerOnChangeData['event'], data: TimePickerCommitData) => void;
};

/** The part of a Combobox state the TimePicker behaviors need. */
type TimePickerComboboxState = Pick<
  BaseComboboxState,
  'root' | 'input' | 'listbox' | 'expandIcon' | 'clearIcon' | 'value' | 'getOptionById' | 'activeDescendantController'
>;

function useTimePickerSelection_unstable<TComboboxProps>(
  props: TimePickerTimeProps & TComboboxProps,
): TimePickerSelection<TComboboxProps>;
function useTimePickerComboboxState_unstable<TState extends TimePickerComboboxState>(
  comboboxState: TState,
  selection: TimePickerSelection<unknown>,
): TState & TimePickerTimeState;
```

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

The styled TimePicker applies `useComboboxStyles_unstable` after its own classes, so every slot also carries the matching `fui-Combobox*` class (for example `fui-Combobox fui-TimePicker` on the root), the same as compat.

## Migration

### From `@fluentui/react-timepicker-compat`

| Compat                                                   | Preview                                                      |
| -------------------------------------------------------- | ------------------------------------------------------------ |
| `selectedTime`                                           | `value`                                                      |
| `defaultSelectedTime`                                    | `defaultValue`                                               |
| `value` / `defaultValue` (input text)                    | dropped; the display text is derived from `value`            |
| `onTimeChange(event, data)`                              | `onChange` (`EventHandler<TimePickerOnChangeData>`)          |
| `data.selectedTime`, `data.selectedTimeText`             | `data.value`, `data.displayValue`                            |
| `onChange` (native input event)                          | `onInput`                                                    |
| `required-input` on every empty commit                   | only when `required` is set on the TimePicker or its `Field` |
| `TimeSelectionData`                                      | `TimePickerOnChangeData`                                     |
| `TimeSelectionEvents`                                    | `TimePickerOnChangeData['event']`                            |
| `formatDateToTimeString: (date) => string`               | `formatDateToTimeString: (date, options) => string`          |
| `useTimePickerCompatStyles_unstable` (custom style hook) | `useTimePickerStyles_unstable`                               |

All other props are unchanged. Compat required a controlled `value` whenever `selectedTime` was controlled; that is no longer needed because the display text is derived from `value`.

### From v8

See the [compat migration guide](../../../react-timepicker-compat/library/docs/Migration.md). Unlike compat, v8 `value`, `defaultValue` and `onChange` keep their names here. v8 `onValidateUserInput` maps to `parseTimeStringToDate`.

## Behaviors

- **Opening**: click on the input or chevron, <kbd>Alt</kbd>+<kbd>ArrowDown</kbd>, or typing.
- **Select**: click an option, or <kbd>Enter</kbd> on the active option. `onChange` fires with the option's time.
- **Commit**: when the typed text changed since the last commit, <kbd>Enter</kbd> without an active option or focus leaving the TimePicker parses the text and fires `onChange`, including `errorType` when parsing or range validation fails. While the typed text does not prefix-match the active option, the active option is cleared so <kbd>Enter</kbd> commits the typed text.
- **Clear**: the clear button fires `onChange` with `value: null`. It is not validated.

### Display text

The display text is internal state, derived as follows:

- `formatDateToTimeString(value, options)` on mount, after a select, after a valid commit, and whenever the `value` prop changes to a time other than the one the last change produced. A `null` value shows an empty input.
- the typed text while the user edits in freeform mode, and after a failed commit, so the user can correct it.

A valid commit therefore normalizes what the user typed (`10:10` becomes `10:10 AM` in `en-US`), which confirms the input was understood. An external `value` change while the user is typing discards the typed text, since committing it later would overwrite the new value with stale input.

A `value` outside the range (for example 03:00 with `startHour={9} endHour={17}`) is shown as its formatted text with no selected option. It is the consumer's choice, so no error is reported and `onChange` is not called.

Keystrokes are observable through the native `onInput`.

### Anchor

All options and parsed dates are built from one anchor:

1. the `dateAnchor` prop when provided;
2. otherwise `value` or `defaultValue` **at mount**;
3. otherwise the date on mount.

The fallback anchor is resolved once and does not change when the value changes. Accepting a change in a controlled TimePicker therefore keeps the option list and the identity of the returned `Date` stable; the range is never regenerated around the new value. The anchor changes only when the `dateAnchor` prop changes.

For ranges that cross midnight (`endHour < startHour`), a value on the following day cannot identify which range it belongs to, so `dateAnchor` must be passed explicitly. Without it, a TimePicker that mounts with such a value generates its options around the wrong day and has no selected option. The TimePicker logs an error in development when the range crosses midnight and `dateAnchor` is missing.

### Commit outcomes

A commit parses the typed text with `parseTimeStringToDate` and always replaces the value with the parsed result.

| Result                        | `value` in data             | Value after commit | Display text    | Selected option |
| ----------------------------- | --------------------------- | ------------------ | --------------- | --------------- |
| Valid, equals an option       | parsed time                 | parsed time        | formatted value | that option     |
| Valid, between options        | parsed time                 | parsed time        | formatted value | none            |
| `invalid-input`               | `null`                      | `null`             | typed text      | none            |
| `out-of-bounds`               | parsed time (outside range) | parsed time        | typed text      | none            |
| `required-input` (empty text) | `null`                      | `null`             | empty           | none            |

- `required-input` is reported only when `required` is set on the TimePicker or on the wrapping `Field`, as DatePicker does. Otherwise an empty commit reports `value: null` with no error.
- The clear button bypasses parsing and validation. It fires once with the cleared payload; when focus then leaves the still-empty input, no additional `required-input` is reported.
- A custom `parseTimeStringToDate` replaces the default parsing **and** the range validation. The TimePicker applies no further checks to its result except the `required` check; `getDateStartAnchor`, `getDateEndAnchor` and `getDateFromTimeString` are exported so a custom parser can reuse the default validation.
- The TimePicker has no built-in error messages. Consumers render `errorType` through `Field`'s `validationMessage`.

## Accessibility

- Follows the ARIA combobox pattern implemented by Combobox (`role="combobox"` input with `aria-activedescendant` pointing into a `role="listbox"` popup).
- When wrapped in `Field`, the chevron button is labelled by its own label and the field label (`aria-labelledby`) so screen readers announce e.g. "Open, Meeting time".
