# @fluentui/react-calendar-preview

**React Calendar components for [Fluent UI React](https://react.fluentui.dev/)**

These are not production-ready components and **should never be used in product**. This space is useful for testing new components whose APIs might change before final release.

The `CalendarDay`, `CalendarMonth`, and `CalendarYear` ref handles accept native `FocusOptions`.
Use `ref.current?.focus({ preventScroll: true })` when moving focus into a positioned popup so
focus entry does not scroll the surrounding page. Calling `focus()` without options retains the
default browser scrolling behavior.

Calendar uses the compat picker footprint for single-picker, side-by-side, and week-number
layouts. The divider does not increase the overall width, and the "Go to today" action retains
the compat height and spacing. These defaults are applied by Calendar itself, including when
hosted in DatePicker; consumer slot styles still take precedence.

Keyboard date selection invokes date-selection callbacks before preventing the browser's default
Enter or Space behavior. Consumers can therefore distinguish canceled date selection from a handled
native key action, as they can with pointer activation. This ordering guarantee does not apply to
navigation or action callbacks.
