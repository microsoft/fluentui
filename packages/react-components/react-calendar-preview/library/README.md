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

## Opt-in CSS Modules styles

CSS Modules alternatives are available beside the original Griffel style modules as
`use*Styles.styles.css.ts`, with layered `*.module.css` assets. The default imports
remain unchanged. Configure the consumer bundler to replace the corresponding
`.styles` / `.styles.js` modules with their `.styles.css` alternatives, and enable
CSS Modules processing for package CSS (including `node_modules`).

All calendar style modules have opt-in alternatives, including the shared picker
helpers and day-grid focus/corner rules. Compatibility class-map helpers preserve
their existing return shapes; preview state hooks preserve their slot contracts.
Motion layers and other independently styled components still need their own
selection; these alternatives do not make a calendar tree Griffel-free.

Hook tests cover class mapping and caller classes, not browser styling parity.
Computed-style, screenshots, forced-colors, Firefox, RTL rendering, SSR, and full
alternate Storybook/VRT coverage have not been verified for these alternatives.
