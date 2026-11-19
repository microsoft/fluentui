# TimePicker — Headless Spec

## Background

`TimePicker` lets a user type a time of day or pick one from a list of suggested times. It is built on top of the headless `Combobox`, so it shares Combobox's structure and accessibility semantics, and like every headless component it ships no styles, design props or default icons. Its keyboard and focus behavior follows the Fluent TimePicker design spec, which differs from Combobox in a few keys (see "Keyboard").

It is exported from `@fluentui/react-headless-components-preview/time-picker`. The package is a preview: its API can change and it must not be used in production.

It replaces [`@fluentui/react-timepicker-compat`](../../../react-timepicker-compat/library/docs/Spec.md). The compat component kept most of the v8 API surface; the headless TimePicker keeps the same behavior but follows v9 conventions:

- the value uses the `value` / `defaultValue` / `onChange` convention of v9 form controls: `value` is a `Date | null`, the display text is derived from it, and `onChange` fires on a change, not on every keystroke;
- callbacks use the v9 `EventHandler<Data>` signature;
- time formatting and parsing utilities are part of the public API;
- state is never mutated after it is created by the Combobox hook; behavior is composed through merged callbacks and refs.

## Glossary

**Value**: the time the TimePicker holds, a `Date | null`. It is set by a change and read from `value` or `data.value`.
_Avoid_: selection, selected time, time.

**Selected option**: the listbox option whose time equals the value. There is none when the value is `null`, lies between options or lies outside the range.
_Avoid_: selection, highlighted option.

**Display text**: the text the input shows at any moment.
_Avoid_: input text, input value.

**Typed text**: text the user entered in freeform mode that has not been committed yet.

**Change**: any event that sets the value (a select, a valid commit or a clear), a failed commit, or <kbd>Escape</kbd> clearing the error of a failed commit. It is what `onChange` reports.

**Select**: choosing an option, by click or by <kbd>Enter</kbd> on the active option.

**Commit**: parsing the typed text into a value, on <kbd>Enter</kbd> with no active option or when focus leaves the TimePicker. Only freeform TimePickers commit. A **failed commit** keeps the value and the typed text.
_Avoid_: submit.

**Clear**: setting the value to `null` through the clear button, without validation.

**Anchor**: the calendar day the options are built on, from `dateAnchor` or from the value.
_Avoid_: anchor date, base date.

**Start anchor**, **end anchor**: the first instant of the range and the first instant after it, both on the anchor day or the day after.

**Range**: the half-open span from the start anchor to the end anchor. A time outside it is **out of bounds**, which is also the name of the error type.
_Avoid_: time range, window.

**Resolved hour cycle**: the hour cycle used for formatting and parsing: the `hourCycle` prop, otherwise the one of the locale (the `locale` prop, otherwise the runtime locale).

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
import { Field } from '@fluentui/react-headless-components-preview/field';
import { TimePicker } from '@fluentui/react-headless-components-preview/time-picker';
import type { TimePickerOnChangeData } from '@fluentui/react-headless-components-preview/time-picker';

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
const [value, setValue] = React.useState<Date | null>(null);
const [errorType, setErrorType] = React.useState<TimePickerErrorType>();

<Field
  label="Start time"
  required
  validationState={errorType ? 'error' : 'none'}
  validationMessage={errorType ? 'Enter a time between 9:00 AM and 5:00 PM, for example 9:30 AM' : undefined}
>
  <TimePicker
    startHour={9}
    endHour={17}
    value={value}
    onChange={(_e, data) => {
      // A failed commit reports the unchanged value, so this is safe for every call.
      setValue(data.value);
      setErrorType(data.errorType);
    }}
  />
</Field>;
```

Field sets `aria-invalid` on the input and links the message through `aria-describedby`.

## Variants

- **Freeform** (`freeform`, the default): the user can type any time. The typed text is parsed with `parseTimeStringToDate` and committed when it has changed and the user presses <kbd>Enter</kbd> (with no active option) or focus leaves the TimePicker. This mirrors the native `change` event of `<input>`.
- **Options only** (`freeform={false}`): the user selects one of the generated options. Typed text filters the options and is discarded when the listbox closes.
- **Clearable** (`clearable`): renders a clear button that clears the value. It replaces the expand icon while there is a value.

There are no visual variants. The root carries the headless Combobox data attributes (`data-open`, `data-disabled`, `data-placeholder`, `data-clearable`) and `data-freeform`, plus `data-invalid` while a failed commit is shown or the input is marked invalid (for example by a `Field`). The listbox carries `data-empty` when no option matches the typed text; the input then reports `aria-expanded="false"`, so hide the empty listbox (for example `[data-empty] { display: none }`).

## API

### Props

Props, defaults and descriptions are in [TimePicker.types.ts](../src/components/TimePicker/TimePicker.types.ts) and the API report [time-picker.api.md](../etc/time-picker.api.md).

TimePicker also accepts the headless Combobox props `clearable`, `defaultOpen`, `open`, `onOpenChange`, `placeholder` and `positioning`, plus native `<input>` props. `locale` sets the locale used to format and parse times; it defaults to the runtime locale. `TimePickerProps` omits the native `value`, `defaultValue` and `onChange` from the input slot props, as Input and SpinButton do, and declares them with the `Date` types above. The display text cannot be controlled; it is always derived as described in "Display text".

### `onChange` data

The callback follows the v9 `EventHandler<Data>` signature: the data carries `value`, `displayValue`, `errorType`, and the `event` with its `type` (`click`, `keydown` or `blur`). It is called on each commit attempt, not only when the value changes: a failed commit reports its error with the unchanged value, so the consumer can show it through `Field` without a second callback.

The event part is a discriminated union, as in TagPicker and Tree, so checking `data.type` narrows `data.event` to the matching React event. `type` says which gesture caused the change; the outcome is read from the payload. <kbd>Enter</kbd> is a `keydown` both for a select and for a commit, so `type` alone does not tell the two apart.

| Change                            | `type`                 | `value`         | `displayValue`     | `errorType`        |
| --------------------------------- | ---------------------- | --------------- | ------------------ | ------------------ |
| Select (click, <kbd>Enter</kbd>)  | `'click'`, `'keydown'` | option time     | option text        | `undefined`        |
| Commit, valid                     | `'keydown'`, `'blur'`  | parsed time     | formatted value    | `undefined`        |
| Commit, failed                    | `'keydown'`, `'blur'`  | unchanged value | typed text         | set                |
| Commit, empty, not `required`     | `'keydown'`, `'blur'`  | `null`          | typed text (empty) | `undefined`        |
| Commit, empty, `required`         | `'keydown'`, `'blur'`  | `null`          | typed text (empty) | `'required-input'` |
| <kbd>Escape</kbd> after a failure | `'keydown'`            | unchanged value | formatted value    | `undefined`        |
| Clear                             | `'click'`, `'keydown'` | `null`          | `undefined`        | `undefined`        |

`errorType` set means a failed commit and `value` is the current, unchanged value, except for `required-input`: emptying the input is deliberate, so it clears the value as the clear button does. Without `errorType`, `value === null` means the value is now empty, and a `Date` is the current value, whether it came from a select, a commit, or <kbd>Escape</kbd> clearing an error. Consumers can therefore always call `setValue(data.value)` and set the Field validation state from `errorType`. An empty value comes either from the clear button (`type: 'click'` or `'keydown'`) or from committing empty typed text in a non-required freeform TimePicker (`type: 'keydown'` or `'blur'`); consumers that must tell the two apart check whether `event.target` is the input.

### Slots

Same as Combobox: `root`, `input`, `expandIcon`, `clearIcon`, `listbox`.

### Utilities

`formatDateToTimeString`, `getDateFromTimeString`, `getDateStartAnchor`, `getDateEndAnchor` and `getTimesBetween` are exported for consumers building custom formatting or parsing. `formatDateToTimeString` and `getDateFromTimeString` create a new `Intl.DateTimeFormat` on every call; `createTimeFormat(options)` returns one formatter and parser to reuse, for example in a custom `formatDateToTimeString` prop that formats every option.

#### Option generation

`getTimesBetween(start, end, increment)` returns the dates from `start` (inclusive) to `end` (exclusive) that are `increment` minutes of elapsed time apart. It advances by `increment * 60_000` milliseconds, not by calendar minutes, so the spacing is preserved across daylight saving transitions.

`increment` must be a finite positive integer. For any other value (`0`, negative, `NaN`, `Infinity`, fractional) `getTimesBetween` returns `[]` and logs an error in development, and the TimePicker renders no options.

#### Formatting and parsing

Formatting and the default parser share the resolved hour cycle: the `hourCycle` prop when set, otherwise the hour cycle of the runtime locale (`new Intl.DateTimeFormat(undefined, { hour: 'numeric' }).resolvedOptions().hourCycle`; `hourCycle` is only resolved when the hour is requested). `formatDateToTimeString` and `getDateFromTimeString` both receive the same `TimeFormatOptions`, so the default formatter and parser always agree on the format.

The default parser (`getDateFromTimeString`) builds its pattern from the parts of the default formatter (`Intl.DateTimeFormat.formatToParts()`), so it accepts the runtime locale's field order, separators, day period and digits. After trimming leading and trailing whitespace, removing bidi marks and mapping localized digits to ASCII (through `Intl.NumberFormat` with the resolved numbering system), it accepts:

- the hour, then `mm`, then `ss` with `showSeconds`, in the locale's order;
- between two fields, the locale's separator or `:` (`14.30` and `14:30` in `fi-FI`, `14 h 30` and `14:30` in `fr-CA`);
- a unit label before the first or after the last field (the trailing ` s` of `fr-CA` with `showSeconds`) as optional, so `14:30:45` and `14 h 30 min 45 s` both parse;
- in a 12-hour cycle, the locale's day period or `AM`/`PM`, case-insensitive, with U+00A0 and U+202F treated as a space.

| Resolved hour cycle | Hour range | Notes                                                                |
| ------------------- | ---------- | -------------------------------------------------------------------- |
| `h23`               | `0`–`23`   |                                                                      |
| `h24`               | `1`–`24`   | `24:mm` is hour `0` of the same day, not a rollover to the next day. |
| `h12`               | `1`–`12`   | Day period required.                                                 |
| `h11`               | `0`–`11`   | Day period required.                                                 |

With `showSeconds`, seconds are required; without it, seconds are rejected. Any other separator, digits outside the cycle's range or a missing day period in a 12-hour cycle produce `invalid-input`.

**Round trip guarantee**: the output of the default `formatDateToTimeString` parses back to the same clock time through the default `getDateFromTimeString` with the same options in the runtime locale, including locales with localized digits (`ar-EG`, `fa-IR`, `ff-Adlm`), localized day periods (`ja-JP`, `ko-KR`, `es-US`) and unit labels (`fr-CA`).

A parsed time earlier than the start anchor is placed on the day after the anchor (`startHour={22} endHour={2}` with input `1:00` yields 01:00 on the next day). The day is chosen before the clock fields are applied, so a time that does not exist on the anchor day because of a daylight saving transition is not shifted. When a clock time occurs twice because of a daylight saving transition, the earliest occurrence at or after the start anchor wins, so on a fall-back day the first (daylight saving) instant is chosen even when both are inside the range. Formatting and re-parsing therefore preserve the clock fields, not the instant: a value on the second occurrence of a repeated hour displays the same text and parses back to the first occurrence. A time at or after the end anchor is returned with `errorType: 'out-of-bounds'`.

### Hooks

`useTimePicker`, `useTimePickerContextValues` and `renderTimePicker` follow the headless hook pattern.

Internally `useTimePicker` resolves the time props into options, the value, the display text and Combobox props, calls the headless `useCombobox`, then applies the commit, clear and Field labelling behaviors on top of the returned state. These steps are not exported.

## Structure

```html
<div data-freeform="">
  <input
    role="combobox"
    aria-expanded="true"
    aria-controls="listbox-id"
    aria-autocomplete="list"
    aria-haspopup="listbox"
  />
  <span role="button" aria-label="Clear" aria-hidden="true" hidden><!-- clearIcon, consumer provided --></span>
  <span role="button" tabindex="-1" aria-label="Open"><!-- expandIcon, consumer provided --></span>
  <!-- rendered while open -->
  <div role="listbox" id="listbox-id">
    <div role="option" aria-selected="false">9:00 AM</div>
    <div role="option" aria-selected="true">9:30 AM</div>
  </div>
</div>
```

## Migration

### From `@fluentui/react-timepicker-compat`

| Compat                                       | Headless                                                     |
| -------------------------------------------- | ------------------------------------------------------------ |
| `selectedTime`                               | `value`                                                      |
| `defaultSelectedTime`                        | `defaultValue`                                               |
| `value` / `defaultValue` (input text)        | dropped; the display text is derived from `value`            |
| `onTimeChange(event, data)`                  | `onChange` (`EventHandler<TimePickerOnChangeData>`)          |
| `data.selectedTime`, `data.selectedTimeText` | `data.value`, `data.displayValue`                            |
| `onChange` (native input event)              | `onInput`                                                    |
| `required-input` on every empty commit       | only when `required` is set on the TimePicker or its `Field` |
| `TimeSelectionData`                          | `TimePickerOnChangeData`                                     |
| `TimeSelectionEvents`                        | `TimePickerOnChangeData['event']`                            |
| `formatDateToTimeString: (date) => string`   | `formatDateToTimeString: (date, options) => string`          |
| `freeform` defaults to `false`               | `freeform` defaults to `true`                                |
| failed commit sets `selectedTime` to `null`  | failed commit keeps `value`; `data.value` is unchanged       |
| `appearance`, `size`, Griffel styles         | dropped; style with `className` and data attributes          |

All other props are unchanged. Compat's documentation asked for a controlled `value` (or `defaultValue`) next to a controlled `selectedTime` (or `defaultSelectedTime`) so the input could show text before the options rendered; after that, Combobox derived the text from the selected option. Here the display text is always derived from `value`, so there is nothing to control.

### From v8

See the [compat migration guide](../../../react-timepicker-compat/library/docs/Migration.md). Unlike compat, v8 `value`, `defaultValue` and `onChange` keep their names here. v8 `onValidateUserInput` maps to `parseTimeStringToDate`.

## Behaviors

- **Opening**: click on the input or chevron, arrow keys, or typing.
- **Filtering**: while the user types, the listbox shows only the options that start with the typed text. Matching ignores case, bidi marks and the locale's digits, so `10` matches `١٠:٣٠ ص`. Reopening the listbox shows all options again, so a failed commit can be corrected by picking one.
- **Select**: click an option, or <kbd>Enter</kbd> on the active option. `onChange` fires with the option's time.
- **Commit**: when the typed text changed since the last commit, <kbd>Enter</kbd> without an active option or focus leaving the TimePicker parses the text and fires `onChange`, including `errorType` when parsing or range validation fails. While the typed text does not prefix-match the active option, the active option is cleared so <kbd>Enter</kbd> commits the typed text.
- **Cancel**: <kbd>Escape</kbd> discards the typed text and shows the committed value again. It does not undo a commit. When a failed commit was shown, `onChange` fires once with `errorType: undefined`.
- **Clear**: the clear button (click, or <kbd>Enter</kbd> / <kbd>Space</kbd> when focused) fires `onChange` with `value: null` and moves focus back to the input. It is not validated.

### Keyboard

DOM focus stays on the input; the active option is tracked with `aria-activedescendant`.

| Key                                   | Behavior                                                                                                                                                          |
| ------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Typing                                | Edits the typed text, opens the listbox, filters the options and activates the first match.                                                                       |
| <kbd>ArrowDown</kbd>                  | Closed: opens on the selected option, otherwise the first. Open: next option, without wrapping.                                                                   |
| <kbd>ArrowUp</kbd>                    | Closed: opens on the selected option, otherwise the last. Open: previous option, without wrapping.                                                                |
| <kbd>Alt</kbd>+<kbd>ArrowDown</kbd>   | Opens without activating an option.                                                                                                                               |
| <kbd>Alt</kbd>+<kbd>ArrowUp</kbd>     | Closes without selecting; the typed text stays.                                                                                                                   |
| <kbd>Home</kbd> / <kbd>End</kbd>      | Move the caret (native input behavior).                                                                                                                           |
| <kbd>Enter</kbd>                      | Selects the active option, otherwise commits the typed text. While closed, commits pending text without opening. Never submits an enclosing form, as in Combobox. |
| <kbd>Escape</kbd>                     | Closes and cancels the typed text. While closed with nothing to cancel, it propagates, so a surrounding Dialog can close.                                         |
| <kbd>Tab</kbd> / <kbd>Shift+Tab</kbd> | Commits and moves focus. The clear button, when shown, is the only other tab stop; the expand icon is not in the tab order.                                       |

### Display text

The display text is internal state, derived as follows:

- `formatDateToTimeString(value, options)` on mount, after a select, after a valid commit, and whenever the `value` prop changes to a time other than the one the last change produced. A `null` value shows an empty input.
- the typed text while the user edits in freeform mode, and after a failed commit, so the user can correct it, until the next commit, <kbd>Escape</kbd> or a new `value`.

A valid commit therefore normalizes what the user typed (`10:10 am` becomes `10:10 AM` in `en-US`), which confirms the input was understood. An external `value` change while the user is typing discards the typed text, since committing it later would overwrite the new value with stale input.

A `value` outside the range (for example 03:00 with `startHour={9} endHour={17}`) is shown as its formatted text with no selected option. It is the consumer's choice, so no error is reported and `onChange` is not called.

Keystrokes are observable through the native `onInput`.

### Anchor

All options and parsed dates are built from one anchor:

1. the `dateAnchor` prop when provided;
2. otherwise the day of the last valid `value` or `defaultValue`;
3. otherwise the date on mount.

The options are regenerated only when the anchor day changes, so accepting a time on the same day keeps the option list and the identity of the returned `Date` stable. A value that moves to another day, for example in a date and time picker, moves the options with it. Clearing the value keeps the last anchor day, and a failed commit does not change the value.

For ranges that cross midnight (`endHour < startHour`), a value on the following day cannot identify which range it belongs to, so `dateAnchor` must be passed explicitly. Without it, the anchor stays on the day of the initial value, and a TimePicker that mounts with such a value generates its options around the wrong day and has no selected option. The TimePicker logs an error in development when the range crosses midnight and `dateAnchor` is missing.

### Commit outcomes

A commit parses the typed text with `parseTimeStringToDate`. Only a valid result replaces the value; a failed commit of non-empty text keeps it, so invalid text is never committed. Empty text always clears the value.

| Result                        | `value` in data | Value after commit | Display text    | Selected option |
| ----------------------------- | --------------- | ------------------ | --------------- | --------------- |
| Valid, equals an option       | parsed time     | parsed time        | formatted value | that option     |
| Valid, between options        | parsed time     | parsed time        | formatted value | none            |
| `invalid-input`               | unchanged value | unchanged          | typed text      | unchanged       |
| `out-of-bounds`               | unchanged value | unchanged          | typed text      | unchanged       |
| `required-input` (empty text) | `null`          | `null`             | empty           | none            |

The default parser accepts the formatted text in the configured locale, `:` as a separator, and compact 24-hour digits such as `1030` (or `103045` with `showSeconds`) in every hour cycle. A valid commit normalizes the text, so `1030` shows `10:30 AM` in `h12`.

- `required-input` is reported only when `required` is set on the TimePicker or on the wrapping `Field`, as DatePicker does. Otherwise an empty commit reports `value: null` with no error.
- The clear button bypasses parsing and validation. It fires once with the cleared payload; when focus then leaves the still-empty input, no additional `required-input` is reported.
- A custom `parseTimeStringToDate` replaces the default parsing **and** the range validation. The TimePicker applies no further checks to its result except the `required` check; `getDateStartAnchor`, `getDateEndAnchor` and `getDateFromTimeString` are exported so a custom parser can reuse the default validation.
- The TimePicker has no built-in error messages. Consumers render `errorType` through `Field`'s `validationMessage`.

## Accessibility

- Follows the ARIA combobox pattern implemented by Combobox (`role="combobox"` input with `aria-activedescendant` pointing into a `role="listbox"` popup), with `aria-autocomplete="list"` and `aria-haspopup="listbox"`. `aria-controls` references the listbox while it is mounted. While no option matches, `aria-expanded` is `false`.
- Hidden icons carry the `hidden` attribute. Consumer styles that set `display` on the icons must keep `[hidden] { display: none }`; a hidden icon is also `aria-hidden`, and a hidden clear button leaves the tab order.
- The clear button is a focusable `role="button"` named "Clear" by default. Localize the name through the `clearIcon` slot (`clearIcon={{ 'aria-label': … }}`), and show the same text in a Tooltip for sighted users. The expand icon is a pointer-only affordance (`tabindex="-1"`); the keyboard opens the listbox from the input.
- Error state: `aria-invalid` and the error message association come from `Field`. Set its `validationState` from `onChange`'s `errorType`, and describe the expected format or range in the message.
- Result counts: the state exposes `optionCount`. Announce changes through a polite live region when that helps, for example debounced "5 times available".
- When wrapped in `Field`, the chevron button is labelled by its own label and the field label (`aria-labelledby`) so screen readers announce e.g. "Open, Meeting time".
