# @fluentui/react-datepicker-preview Spec

**Status:** Proposed. This document specifies the target component, not the current scaffold's implemented API.

## Background

`DatePicker` combines a date input with a popup calendar. It is the non-compat v9 replacement for
`@fluentui/react-datepicker-compat`, built on `@fluentui/react-calendar-preview`.

The goal is **the same appearance and user-visible behavior as DatePicker Compat, with a native v9
component contract**: slots, standard refs, controlled and uncontrolled state, event/data callbacks,
Field integration, token-based Griffel styles, and Calendar Preview's compositional APIs.

This is not a visual redesign, a native browser date input, or a wrapper around either compat package.
The default experience remains an initially empty, read-only date input with a trailing calendar icon
and a dismissible calendar dialog. Editable input is opt-in.

This package remains preview-only until the API and parity requirements below are verified. This spec
does not authorize production migration or declare parity achieved.

## Prior Art

- [Compat props and slots](../../../react-datepicker-compat/library/src/components/DatePicker/DatePicker.types.ts)
- [Compat behavior](../../../react-datepicker-compat/library/src/components/DatePicker/useDatePicker.tsx)
- [Compat styles](../../../react-datepicker-compat/library/src/components/DatePicker/useDatePickerStyles.styles.ts)
- [Compat unit tests](../../../react-datepicker-compat/library/src/components/DatePicker/DatePicker.test.tsx)
  and [browser tests](../../../react-datepicker-compat/library/src/components/DatePicker/DatePicker.cy.tsx)
- [Compat examples](../../../react-datepicker-compat/stories/src/DatePicker)
- [Calendar Preview spec](../../../react-calendar-preview/library/docs/Spec.md)
  and [API](../../../react-calendar-preview/library/src/components/Calendar/Calendar.types.ts)
- [Input API](../../../react-input/library/src/components/Input/Input.types.ts)
- [WAI-ARIA date picker dialog example](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/examples/datepicker-dialog/)

When compat comments and implementation disagree, observable behavior and verified examples are the
baseline. In particular, the hook defaults to no opening on focus, Sunday as the first weekday,
`FirstDay` week numbering, and `date.toDateString()` input formatting. Do not infer defaults from the
compat prop comments alone.

## Sample Code

Examples use the proposed API; they are not examples of the current scaffold.

### Basic usage

```tsx
import { Field } from '@fluentui/react-components';
import { DatePicker } from '@fluentui/react-datepicker-preview';

export const Example = () => (
  <Field label="Start date">
    <DatePicker placeholder="Select a date..." />
  </Field>
);
```

### Controlled selection and validation

```tsx
import * as React from 'react';
import { Field } from '@fluentui/react-components';
import { DatePicker, defaultDatePickerErrorStrings } from '@fluentui/react-datepicker-preview';
import type { DatePickerErrorType } from '@fluentui/react-datepicker-preview';

export const EditableExample = () => {
  const [value, setValue] = React.useState<Date | null>(null);
  const [error, setError] = React.useState<DatePickerErrorType>();

  return (
    <Field label="Start date" required validationMessage={error ? defaultDatePickerErrorStrings[error] : undefined}>
      <DatePicker
        allowTextInput
        value={value}
        onDateChange={(_event, data) => setValue(data.value)}
        onValidationResult={(_event, data) => setError(data.error)}
      />
    </Field>
  );
};
```

### Calendar composition

```tsx
<DatePicker
  defaultValue={new Date(2030, 0, 15)}
  minDate={new Date(2030, 0, 1)}
  maxDate={new Date(2030, 11, 31)}
  appearance="underline"
  calendar={{
    firstDayOfWeek: 'monday',
    firstWeekOfYear: 'firstFourDayWeek',
    showWeekNumbers: true,
    layout: 'overlay',
    goToTodayButton: null,
    dayPicker: { closeButton: { 'aria-label': 'Close date picker' } },
  }}
/>
```

For localization, pair input `formatDate` and `parseDate` functions with Calendar's `formatters`
and localized action-slot content. `Intl.DateTimeFormat` formats dates but does not parse user input.
Use `popupSurface={{ 'aria-label': localizedCalendarLabel }}` to localize the dialog name.

## Variants

- **Input:** selection-only by default; editable with `allowTextInput`.
- **Appearance and size:** Input's `appearance` and `size` APIs. Defaults are `outline` and `medium`.
  `underline` and `filled-lighter` reproduce compat's underlined and borderless treatments.
- **Calendar:** day/month side by side, responsive overlay, explicit overlay, day-only, week numbers,
  and optional close and Go to today actions. Configure these through the `calendar` slot.
- **Selection range:** Calendar's `day`, `week`, `workWeek`, and `month` modes are supported through
  `calendar.dateRangeType`. The input still displays the activated date, not a formatted range.
- **Popup:** portaled by default; inline when `inlinePopup` is true. Inline means DOM placement,
  not an always-visible calendar.
- **State:** empty, selected, hovered, focused, pressed, open, disabled, required, and invalid.
  Invalid appearance comes from Field or explicit input accessibility props, not an internal label.

There is no additional clear button, time picker, multiple-date selection, or start/end-range input.

## API

The implementation must replace the scaffold in
[DatePicker.types.ts](../src/components/DatePicker/DatePicker.types.ts) with this contract.

### Slots and ref

| Slot           | Type                                 | Contract                                                                              |
| -------------- | ------------------------------------ | ------------------------------------------------------------------------------------- |
| `root`         | `NonNullable<Slot<typeof Input>>`    | Required Input component, preserving Input's native-prop routing and styling surface. |
| `calendar`     | `NonNullable<Slot<typeof Calendar>>` | Required Calendar Preview component; mounted only while the dialog is open.           |
| `popupSurface` | `Slot<'div'>`                        | Dialog surface, rendered by default while open and absent while closed.               |

Input's `input`, `contentBefore`, and `contentAfter` shorthand props remain available through the
root Input contract. They are not duplicate DatePicker-owned slots. The default `contentAfter` is
the calendar icon and its activation affordance. Customizing its content must not remove opening
behavior or accessible trigger semantics.

The forwarded ref is `HTMLInputElement`, matching Input and compat. The Input wrapper can be reached
through `root.ref`. Calendar's root ref is an `HTMLDivElement`; its picker-slot refs expose the
existing Calendar Preview focus handles. Do not introduce `componentRef`, `ICalendar`, or a second
imperative DatePicker API.

### Props

Start from `ComponentProps<Partial<DatePickerSlots>>`, omitting Input's string `value`,
`defaultValue`, `type`, and `readOnly`. DatePicker fixes `type="text"` and derives `readOnly` from
`allowTextInput`. Preserve other applicable Input props, including `name`, `id`, `placeholder`,
`size`, `appearance`, `disabled`, `required`, `onChange`, and native `aria-*` props.

| Prop                 | Type                                           | Default / contract                                                                  |
| -------------------- | ---------------------------------------------- | ----------------------------------------------------------------------------------- |
| `value`              | `Date \| null`                                 | Controlled committed date; `undefined` means uncontrolled and `null` means empty.   |
| `defaultValue`       | `Date \| null`                                 | Initial uncontrolled committed date; defaults to `null`.                            |
| `onDateChange`       | `EventHandler<DatePickerDateChangeData>`       | Reports a user date commit or clear, not each keystroke.                            |
| `allowTextInput`     | `boolean`                                      | `false`; input is read-only but remains enabled and focusable.                      |
| `formatDate`         | `(date: Date) => string`                       | `date.toDateString()`; never called with an empty value.                            |
| `parseDate`          | `(text: string) => Date \| null`               | Uses `Date.parse`; failure returns `null`. Used only for editable input.            |
| `onValidationResult` | `EventHandler<DatePickerValidationResultData>` | Reports the result of a user validation attempt.                                    |
| `open`               | `boolean`                                      | Controlled popup visibility.                                                        |
| `defaultOpen`        | `boolean`                                      | `false`; initial uncontrolled visibility.                                           |
| `onOpenChange`       | `EventHandler<DatePickerOpenChangeData>`       | Requests a visibility transition.                                                   |
| `openOnClick`        | `boolean`                                      | `true`; controls opening from the input body, not the icon or keyboard.             |
| `openOnFocus`        | `boolean`                                      | `false`; opt-in focus opening for selection-only input.                             |
| `today`              | `Date`                                         | Current local date; shared with Calendar. Does not select or populate the input.    |
| `minDate`, `maxDate` | `Date`                                         | Inclusive local-calendar-date boundaries for both parsing and Calendar.             |
| `inlinePopup`        | `boolean`                                      | `false`; renders the positioned surface next to the trigger instead of in a Portal. |
| `mountNode`          | `PortalProps['mountNode']`                     | Portal target; ignored for inline rendering.                                        |
| `positioning`        | `PositioningProps`                             | Below the input wrapper, aligned to logical start, with normal collision handling.  |

`onChange` retains Input's `(event, { value: string })` signature and observes editable draft text.
It does not commit a date. DatePicker owns the displayed string; the nested Input `value`,
`defaultValue`, `type`, and `readOnly` must not independently override DatePicker's state or input mode.
Independent controlled text state is outside this proposal.

Use `calendar` for Calendar-only configuration: `firstDayOfWeek`, `firstWeekOfYear`, `formatters`,
`layout`, `view`, `defaultView`, `displayedDate`, `defaultDisplayedDate`, `showWeekNumbers`,
`highlightCurrentMonth`, `highlightSelectedMonth`, `allFocusable`, `restrictedDates`, `workWeekDays`,
and picker/action slots. Use Calendar Preview's string unions, not compat enums or interfaces.

DatePicker owns Calendar's `value`, selection/dismissal wiring, and shared `today`, `minDate`, and
`maxDate`. Omit conflicting `calendar.value`, `calendar.defaultValue`, `calendar.today`,
`calendar.minDate`, and `calendar.maxDate` from the slot's accepted props. Slot event handlers and refs
are composed with internal handlers and refs, not overwritten. A consumer handler runs first;
`preventDefault()` cancels the corresponding built-in action.

Retain Calendar's default `layout="auto"`, Sunday week start, `firstWeekOfYear="firstDay"`, day-range
selection, visible month picker, visible Go to today action, no close button, no week numbers, and no
month highlights. Do not pass compat-era visibility flags down to Calendar Preview.

### Events and exports

Use the repository's `EventHandler` / `EventData` types, with `(event, data)` on every component
callback. Each payload also carries the originating event and its correctly typed event discriminator.
The additional payload fields are:

```ts
type DatePickerDateChangeData = {
  value: Date | null;
  selectedDateRange: Date[];
  reason: 'calendar' | 'input' | 'clear';
};

type DatePickerOpenChangeData = {
  open: boolean;
  reason: 'input' | 'icon' | 'keyboard' | 'focus' | 'selection' | 'dismiss';
};

type DatePickerErrorType = 'invalid-input' | 'out-of-bounds' | 'required-input';

type DatePickerValidationResultData = {
  error?: DatePickerErrorType;
};
```

These shapes describe payload fields, not complete type declarations. Input commits report
`selectedDateRange: [value]`; clearing reports `[]`; Calendar commits forward Calendar's actual range.
Range generation stays in Calendar, even when a consumer configures week or month selection.
Use `React.ChangeEvent`, `React.FocusEvent`, `React.KeyboardEvent`, or pointer/click events as
appropriate; outside-interaction requests can originate from native events. Do not fabricate a click
event for a blur, scroll, or controlled prop change.

Each logical action emits at most one date-change request and one open-change request, even when
selection, blur, and dismissal occur together. External prop updates and initial render emit neither.
Controlled callbacks describe a request; they do not imply the owner accepted it.

Export `DatePicker`, its props/slots/state and event-data types, `DatePickerErrorType`,
`defaultDatePickerErrorStrings`, `datePickerClassNames`, and the standard
`useDatePicker_unstable`, `useDatePickerStyles_unstable`, and `renderDatePicker_unstable` helpers.
The default error messages remain "Invalid date format", "Date is out of bounds", and
"Field is required". Applications can replace them with localized messages.

## Structure

### Component implementation

Use `ForwardRefComponent<DatePickerProps>` and `React.forwardRef`, with the standard state-hook,
style-hook, and render-function split. DatePicker owns input text, parsing, validation, popup
visibility, positioning, dismissal, and popup focus management.

Calendar Preview owns date arithmetic, range generation, day/month/year navigation, disabled dates,
week numbers, localization of calendar content, grid semantics, selection announcements, and motion.
Do not copy Calendar Compat's implementation or fork Calendar Preview inside DatePicker.

Compose the existing Input, Portal, positioning, Field-context, utility, and Tabster primitives.
Use `useFluent_unstable().targetDocument` and its `defaultView` for environment access. Opening,
positioning, dismissal, and focus must work in a non-default document as well as during SSR.

### DOM

The conceptual default structure is:

```html
<!-- Input wrapper; the DatePicker ref targets its input, not this span. -->
<span class="fui-DatePicker">
  <input
    type="text"
    role="combobox"
    readonly
    aria-haspopup="dialog"
    aria-expanded="true"
    aria-controls="date-picker-popup"
  />
  <span role="button" aria-label="Open calendar" aria-expanded="true">
    <!-- CalendarMonthRegular icon -->
  </span>
</span>
<!-- Portaled by default; adjacent to the input wrapper in inline mode. -->
<div id="date-picker-popup" class="fui-DatePicker__popupSurface" role="dialog" aria-label="Calendar" aria-modal="true">
  <!-- Calendar Preview, including its day/month/year slots and live regions -->
</div>
```

The icon's semantic activation target is not an extra Tab stop, matching compat. The input provides
the keyboard route to the same dialog. Expose an accessible name based on the input's label and a
localized action label; preserve voice-control and touch-screen-reader activation.
The dialog and its `aria-controls` relationship exist only while open. Input's `id`, `name`,
description, required state, and invalid state belong on the native input.

### Styling and visual parity

Use the compat DatePicker and Calendar rendered together as the visual reference, not just Input.
Match input height, width behavior, padding, typography, icon size and placement, cursor, borders,
focus indicator, surface geometry, calendar spacing, divider, action placement, cell treatments,
and popup alignment in equivalent configurations.

The popup uses `colorNeutralBackground1`, `colorNeutralForeground1`, `shadow16`,
`borderRadiusMedium`, `strokeWidthThin`, `colorTransparentStroke`, and `typographyStyles.body1`.
Use semantic theme tokens for colors, spacing, typography, and strokes throughout. Inline rendering
must preserve the compat stacking behavior above the positioned input.

Calendar Preview is not automatically a visual-parity guarantee: for example, its root uses intrinsic
width while [Calendar Compat styles](../../../react-calendar-compat/library/src/components/Calendar/useCalendarStyles.styles.ts)
specify different widths for single/dual pickers and week numbers. Its Go to today spacing also differs.
Record and resolve actual screenshot differences before claiming parity. Address reusable calendar
differences in Calendar Preview, not with DatePicker descendant selectors against private DOM.
Where no existing token reproduces a required measurement, obtain a token/design decision rather
than hardcoding legacy spacing or accepting a silent visual change.

Apply slot classes through Griffel with consumer `className` last. Preserve the static
`fui-DatePicker`, `fui-DatePicker__calendar`, and `fui-DatePicker__popupSurface` class names.
No new visual adornment or motion is introduced; Calendar Preview motion must respect reduced motion.

## Migration

This is an explicit API migration, not a drop-in re-export.

| Compat API                                      | Proposed API                                                                             |
| ----------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `value`, `onSelectDate(date)`                   | `value`, `onDateChange(event, { value })`; use `null` for empty controlled state.        |
| No date `defaultValue`                          | `defaultValue` initializes uncontrolled selection.                                       |
| `onOpenChange(open)`                            | `onOpenChange(event, { open, reason })`.                                                 |
| `onValidationResult(data)`                      | `onValidationResult(event, data)`.                                                       |
| `underlined`                                    | `appearance="underline"`.                                                                |
| `borderless`                                    | `appearance="filled-lighter"`.                                                           |
| `disableAutoFocus`                              | `openOnFocus` with inverted meaning; default remains no focus opening.                   |
| `parseDateFromString`                           | `parseDate`.                                                                             |
| `initialPickerDate`                             | `calendar.defaultDisplayedDate`; initializes navigation, not the selected input value.   |
| `isMonthPickerVisible={false}`                  | `calendar={{ monthPicker: null }}`.                                                      |
| `showMonthPickerAsOverlay`                      | `calendar={{ layout: 'overlay' }}`.                                                      |
| `showGoToToday={false}`                         | `calendar={{ goToTodayButton: null }}`.                                                  |
| `showCloseButton`                               | `calendar={{ dayPicker: { closeButton: {} } }}`.                                         |
| Week settings, month highlights, `allFocusable` | Corresponding `calendar` props, using string unions rather than compat enums.            |
| `strings`, `dateTimeFormatter`                  | Calendar `formatters` and action-slot content; input formatting/parsing remain separate. |
| `calendar.componentRef`                         | Standard Calendar root ref or child picker focus handles.                                |

Retain `allowTextInput`, `formatDate`, boundaries, `today`, popup options, and Input shorthand
customization. Move Calendar-only settings into the slot; do not retain duplicate legacy aliases.

V8 consumers must additionally replace `styles`, `theme`, runtime styling, label, and inline error
props with Griffel, FluentProvider, Field, and slot props. V0 has no direct compatibility contract;
map its selected-date and popup state explicitly and revalidate interaction and localization.

Observable compat defects are not new API guarantees: duplicate close notifications, accepting an
invalid date object, treating the Unix epoch as parse failure, and leaving stale internal selection
after an uncontrolled clear must not be reproduced. Cover these corrections explicitly in tests.
Any other discovered user-visible difference requires a documented decision and regression coverage,
not an undocumented "v9 improvement".

### Compat-to-preview migration walkthrough

This walkthrough targets `@fluentui/react-datepicker-compat` consumers. The destination code uses
the **proposed** API in this spec and is not runnable against the current scaffold. Migrate only
after that API is implemented and parity is verified; keep production consumers on compat meanwhile.

#### 1. Replace imports and adapt controlled callbacks

Before:

```tsx
import * as React from 'react';
import { Field } from '@fluentui/react-components';
import { DayOfWeek, FirstWeekOfYear } from '@fluentui/react-calendar-compat';
import { DatePicker, defaultDatePickerErrorStrings } from '@fluentui/react-datepicker-compat';
import type { DatePickerValidationResultData } from '@fluentui/react-datepicker-compat';

export const Example = () => {
  const [value, setValue] = React.useState<Date | null>(null);
  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState<DatePickerValidationResultData['error']>();

  return (
    <Field label="Start date" required validationMessage={error ? defaultDatePickerErrorStrings[error] : undefined}>
      <DatePicker
        value={value}
        onSelectDate={date => setValue(date ?? null)}
        open={open}
        onOpenChange={setOpen}
        onValidationResult={data => setError(data.error)}
        allowTextInput
        underlined
        firstDayOfWeek={DayOfWeek.Monday}
        firstWeekOfYear={FirstWeekOfYear.FirstFourDayWeek}
        showWeekNumbers
        showMonthPickerAsOverlay
        showGoToToday={false}
        showCloseButton
      />
    </Field>
  );
};
```

After:

```tsx
import * as React from 'react';
import { Field } from '@fluentui/react-components';
import { DatePicker, defaultDatePickerErrorStrings } from '@fluentui/react-datepicker-preview';
import type { DatePickerErrorType } from '@fluentui/react-datepicker-preview';

export const Example = () => {
  const [value, setValue] = React.useState<Date | null>(null);
  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState<DatePickerErrorType>();

  return (
    <Field label="Start date" required validationMessage={error ? defaultDatePickerErrorStrings[error] : undefined}>
      <DatePicker
        value={value}
        onDateChange={(_event, data) => setValue(data.value)}
        open={open}
        onOpenChange={(_event, data) => setOpen(data.open)}
        onValidationResult={(_event, data) => setError(data.error)}
        allowTextInput
        appearance="underline"
        calendar={{
          firstDayOfWeek: 'monday',
          firstWeekOfYear: 'firstFourDayWeek',
          showWeekNumbers: true,
          layout: 'overlay',
          goToTodayButton: null,
          dayPicker: { closeButton: { 'aria-label': 'Close date picker' } },
        }}
      />
    </Field>
  );
};
```

Do not pass a state setter directly to an event/data callback: its first argument is the event.
Use `data.value`, `data.open`, or `data.error`. Update callback type imports and tests that previously
asserted a date-only or boolean-only call. Application side effects must not depend on duplicate
compat close notifications.

#### 2. Separate selection, navigation, and draft text

- Preserve `value={null}` for an empty controlled field. Do not replace it with `undefined`, which
  selects uncontrolled mode. If the application does not need controlled selection, replace its
  initial-value state plumbing with `defaultValue={initialDate}`.
- Move `initialPickerDate` to `calendar.defaultDisplayedDate`, not `defaultValue`. An initial
  navigation target must not populate the field. Use `calendar.displayedDate` and
  `calendar.onDisplayedDateChange` only when navigation itself needs to be controlled.
- Move date commits from compat `onSelectDate` to `onDateChange`. Retain `onChange` only for observing
  raw input text; it still receives a string and must not be used as a date-selection callback.
- Rename `parseDateFromString` to `parseDate`. Keep the existing parser and formatter paired;
  do not assume that switching Calendar localization also changes input parsing.
- Keep `minDate`, `maxDate`, and `today` at DatePicker level. Remove duplicate values from the
  `calendar` slot so input validation and calendar availability share one source of truth.

For example, browsing an initial month while leaving the input empty becomes:

```tsx
<DatePicker defaultValue={null} calendar={{ defaultDisplayedDate: new Date(2030, 5, 1) }} />
```

#### 3. Move Calendar customization without losing existing slot props

Merge migrated settings into the consumer's existing `calendar` object, including nested
`dayPicker` and `monthPicker` objects. Do not replace an existing slot object and inadvertently drop
its handlers, refs, labels, or custom content.

- Replace compat `DayOfWeek`, `FirstWeekOfYear`, and `DateRangeType` enum values with Calendar
  Preview's string unions. For example, `DateRangeType.WorkWeek` becomes
  `calendar={{ dateRangeType: 'workWeek' }}`.
- Move range, restricted-date, highlighting, and week-number configuration to Calendar Preview's
  corresponding props. Read `data.selectedDateRange` from `onDateChange` when the application needs
  the generated range; the input continues to display only `data.value`.
- Translate `strings` and `dateTimeFormatter` explicitly into Calendar `formatters` and action-slot
  content. There is no one-to-one object spread between compat's strings and the new formatter API.
  Include navigation labels, selection/today labels, week labels, Go to today content, and close labels.
- Preserve the popup's localized accessible name through `popupSurface['aria-label']` and preserve
  Field label, description, required state, and error-message wiring.
- Keep `inlinePopup`, `mountNode`, `positioning`, and applicable Input props. Replace legacy appearance
  flags rather than supplying both flags and `appearance`.
- Replace `disableAutoFocus` with `openOnFocus={!disableAutoFocus}` only when the old flag was
  explicitly configured. When it was omitted, omit `openOnFocus` to retain the default. Set
  `openOnClick` independently; do not rely on compat's coupling between click and focus flags.
- Keep input refs as `React.Ref<HTMLInputElement>`. Replace Calendar's `componentRef` only where
  imperative access is actually needed, using the preview root ref or a picker focus handle.

#### 4. Verify the migrated consumer

Check the consumer's existing compat configuration against the acceptance matrix below, not only
the default story. Compare identical values, dates, locale, theme, dimensions, and viewport.
Specifically verify opening and return focus, editable validation, required clearing, range
selection, localization, and controlled-owner acceptance/rejection.

Remove compat imports and direct dependencies only when no remaining consumer needs them. Do not
remove a shared dependency as part of migrating one DatePicker. A successful type check alone does
not establish visual or behavioral parity.

## Behaviors

### State and date model

- Maintain committed date, editable draft string, and popup visibility separately. Browsing a month
  or year, changing the displayed date, and using Go to today do not populate or change the input.
- Uncontrolled selection starts from `defaultValue ?? null`, never implicitly from today. Pass
  `value={null}` to Calendar when empty so its uncontrolled today default cannot select a date.
- The initial displayed date resolves from `calendar.defaultDisplayedDate`, the selected date,
  then the current local date. `calendar.displayedDate` controls navigation independently.
  Reopening with a selected date reveals it unless navigation is explicitly controlled; reopening
  empty uses the initial displayed-date rule. Bound navigation without committing a boundary date.
- `value` and `open` are independently controlled when defined; do not switch either between controlled
  and uncontrolled during the component's lifetime. Use `useControllableState`.
- An external `value` update reformats the input without interaction callbacks. A formatter change
  updates committed-date text. Do not overwrite a user's draft on unrelated rerenders.
  A controlled owner that rejects a commit remains authoritative.
- Compare boundaries and restricted dates by local year/month/day, not timestamps. Do not convert
  date-only values through UTC, mutate consumer dates, or change days around daylight-saving transitions.
- Out-of-range supplied values must not be silently clamped into a new committed value. Calendar
  cannot select them; validation reports the problem on the next user validation attempt.
- `disabled` prevents editing, activation, and a usable popup, including with `open={true}`. Disabling
  an already-open picker removes the popup without committing a draft or emitting a synthetic user event.

### Opening and dismissal

- Clicking/tapping the input opens the calendar when `openOnClick` is true. Clicking the icon opens
  it independently. In editable mode, activating the already-open input or icon dismisses it for editing;
  in selection-only mode, repeated trigger activation leaves it open.
- Input focus alone does not open by default. `openOnFocus` applies only to selection-only mode.
  Focus restoration after dismissal must never immediately reopen the popup.
- A committed Calendar selection updates or requests the date, formats the input, validates, and
  closes or requests closure. Preserve `selectedDateRange` for non-day Calendar modes.
- Escape, Calendar's close action, an outside pointer interaction, or scrolling outside the
  trigger/surface dismisses the popup. Scrolling within the popup must not dismiss it.
- A dismissal validates editable text using the same rules as blur. Escape does not introduce a
  new rollback-to-open-time-value behavior. Navigation alone never emits `onDateChange`.
- Editing text while the popup is open closes it and retains the new draft. Do not parse every
  keystroke or accidentally commit the old draft as part of that edit.
- Closing unmounts the surface and Calendar. Opening focuses the selected/navigated day, or an
  available bounded fallback. If no day is selectable, focus an enabled navigation/close action or
  the dialog itself. Never leave focus in unmounted content.

### Editing, commits, and validation

Validate on input blur, Enter, and popup dismissal; coalesce overlapping events from one action.
Do not reparse unchanged text that already equals `formatDate(committedDate)`, since a custom format
may be intentionally ambiguous. Nevertheless, validate required state and availability.

| Input at validation                                             | Result                                                                                                                                         |
| --------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| Valid parse, in bounds and not restricted                       | Commit/request the date and normalize the displayed text with `formatDate`.                                                                    |
| Empty text, optional                                            | Commit/request `null`, display empty text, and report no error.                                                                                |
| Empty text, required                                            | Commit/request `null` and report `required-input`; do not resurrect the previous selection.                                                    |
| Parse failure or invalid `Date`                                 | Report `invalid-input`, retain the committed date, and restore its formatted text (or empty text), matching compat's invalid-format treatment. |
| Parsed date outside boundaries or in `calendar.restrictedDates` | Report `out-of-bounds`, retain the committed date, and leave the draft visible for correction.                                                 |
| Selection-only input                                            | Validate required state and committed-date availability without parsing.                                                                       |

Use finite timestamp checks, not truthiness, for default parsing. Empty handling happens before
`parseDate`; `null` or an invalid `Date` result means invalid input. A consumer parser's thrown
exception is not silently converted into success or an empty value.

Field's required state takes precedence as in compat. Use Field context to inherit input ID,
label/description relationships, invalid state, and validation presentation. DatePicker reports
validation but does not render an error message or automatically choose a localized message for Field.
The default `type="text"` submits the displayed string under `name`; do not add a hidden ISO-value input.

### Keyboard, pointer, and touch

| Focus area           | Input                                 | Behavior                                                                            |
| -------------------- | ------------------------------------- | ----------------------------------------------------------------------------------- |
| Closed input         | `Enter`                               | Validate and request opening; consume the key rather than submitting the form.      |
| Closed input         | `ArrowDown`                           | Request opening and move focus into Calendar.                                       |
| Open editable input  | `Enter`                               | Validate and request dismissal.                                                     |
| Open picker          | `Escape`                              | Dismiss, consume the key, and restore input focus.                                  |
| Closed input         | `Escape`                              | Leave the event available to the surrounding UI.                                    |
| Selection-only input | Text-editing keys                     | Do not edit the text; retain ordinary focus and selection behavior.                 |
| Editable input       | Text-editing keys                     | Preserve native editing, including caret movement and clipboard actions.            |
| Calendar grids       | Arrows, paging keys, `Enter`, `Space` | Delegate to Calendar Preview's documented day/month/year navigation and activation. |
| Open dialog          | `Tab`, `Shift+Tab`                    | Cycle through enabled dialog controls using its focus trap.                         |

Input and icon share the same mouse, touch, voice-control, and assistive-technology opening path.
Use pointer cursor treatment on the selection affordance, ordinary editing behavior where applicable,
and default cursors for disabled content. Unavailable dates can be focused with `allFocusable` but
cannot be selected. Consumer-canceled keyboard or activation events must not trigger internal actions.

## Accessibility

- Use a native text input, not `input[type=date]`: browser-native date controls cannot guarantee the
  specified styling, parsing, Calendar Preview composition, or interaction parity.
- The input exposes `role="combobox"`, `aria-haspopup="dialog"`, current `aria-expanded`, and an
  `aria-controls` reference while open. Read-only mode must not be exposed as disabled.
- The popup is a named `role="dialog"` with default name "Calendar". Match compat's modal focus
  treatment using Tabster; `aria-modal="true"` is valid only while focus containment and assistive
  technology isolation are actually active. Calendar itself is not a modal and must not own the trap.
- Opening transfers focus into Calendar using merged picker handles, not compat `componentRef`,
  global document access, CSS-class queries, or an arbitrary timeout.
- Selection, Escape, and the close action return focus to the input without reopening. Outside
  pointer dismissal must not steal focus from the outside control the user activated. If the picker
  is disabled or unmounted, do not attempt to restore focus to it.
- Calendar owns roving grid focus, selected/current/unavailable semantics, view-switch focus,
  localized grid names, navigation announcements, and selection announcements. Do not add duplicate
  DatePicker live-region announcements. Field owns error-message association and presentation.
- Localize dialog/trigger/close names, Calendar labels, Go to today content, input formatting/parsing,
  and validation messages independently. Locale formatting does not change Gregorian arithmetic.
- Support RTL, keyboard-only operation, touch screen readers, voice control, forced colors, and
  reduced motion. Keep selected, current, disabled, and focused states distinguishable without color alone.
- At 400% zoom and narrow viewports, keep all controls usable through Calendar's overlay layout and
  popup collision handling. Test both inline and portaled rendering with VoiceOver, NVDA, and JAWS.

## Acceptance Criteria and Verification

Parity is a release requirement, not an assumption based on reusing Calendar Preview.

| Area                  | Required evidence                                                                                                                                                                                    |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Default configuration | Initially empty read-only input; click/Enter/ArrowDown opening; no default focus opening; matching popup and default Calendar configuration.                                                         |
| Visual parity         | Paired compat/preview fixtures for default, editable, disabled, focused, invalid, all matching appearances/sizes, day-only, side-by-side, overlay, week numbers, month/year views, and range states. |
| Visual environments   | Light, dark, brand theme, RTL, forced colors, narrow/wide viewport, zoom, reduced motion, inline/portal, and custom mount node.                                                                      |
| Selection             | Controlled and uncontrolled select, clear, repeat selection, same-date activation, external update, rejected controlled request, and every supported Calendar range mode.                            |
| Editing               | Draft changes versus date commits; blur/Enter/dismiss validation; ambiguous formatter round trips; invalid/empty/out-of-bounds/restricted dates; no duplicate callbacks.                             |
| Date arithmetic       | Inclusive boundaries, month/year rollover, leap day, non-midnight values, Unix epoch, and time zones with daylight-saving transitions.                                                               |
| Popup                 | Every open/dismiss path, controlled requests, focus entry/return, outside-target focus, internal versus external scroll, default-open, disabling while open, and no reopen loop.                     |
| Composition           | Input native props, forwarded ref, nested refs, slot handler ordering/cancellation, consumer classes last, Calendar display/view control, and Field required/invalid/description wiring.             |
| Accessibility         | Combobox/dialog relationships, localized names, grid announcements, focus trapping, keyboard navigation, disabled-but-focusable dates, and screen-reader checks.                                     |
| Environment           | SSR/hydration without global DOM access; correct document, portal, focus, and outside-interaction handling in an iframe.                                                                             |

Use frozen `today`, explicit dates/locales/time zones, equal container widths, and settled motion in
paired fixtures. Compare matching states rather than unrelated default screenshots. Require zero
unexplained screenshot differences under the same rendering environment; any approved rasterization
tolerance must not hide geometry, token, or interaction differences. Test actual popup and grid
measurements as well as screenshots.

Port the compat stories and behavioral assertions to the new API, retaining the originals as the
reference. Add focused unit tests for state/events/validation, browser tests for actual focus and
outside interactions, v9 conformance tests, and visual-regression fixtures for the matrix above.
API extraction and type tests must verify slot restrictions, event/data signatures, string unions,
and ref targets. Run relevant Nx targets for the new package and any Calendar Preview changes.

Implementation is ready for review only when every compat configuration has a migration path,
paired visual/behavioral evidence is recorded, and any remaining
difference has an explicit decision. Until then, retain the preview designation and do not claim the
component is an exact replacement.
