DatePicker combines the headless Input and Calendar with shared date-input state from DatePicker
Preview. It applies no Fluent styles, icons, or motion. The forwarded ref targets the native input.

Provide an input name with `aria-label`, `aria-labelledby`, or Field. Localize the trigger's
`aria-label`, popupSurface's dialog name, date format/parser, and Calendar content independently.
Use `trigger` for your own text or icon; the default trigger has an accessible name but no visual
content. Input `contentAfter` content is preserved before this trigger.

The calendar opens in a native modal `dialog` in the same document, positioned with the headless
CSS-anchor positioning hook. The browser supplies top-layer rendering, focus containment, and
inert outside content. No Portal, `mountNode`, `inlinePopup`, or Tabster is used. Native dialog and
CSS anchor positioning support are required, as with the headless Popover. Calendar requires
native focusgroup support or the application-supplied focusgroup polyfill.

Click the input/trigger or press Enter/ArrowDown to open. Date selection, Escape, the Calendar
dismiss action, or a backdrop click closes the popup and restores input focus. Controlled close
requests may be rejected without closing the native dialog. Editable text is opt-in, validated
on blur/Enter/dismissal, and shares required, boundary, restricted-date, formatting, and callback
semantics with DatePicker Preview. Field owns validation presentation.
For editable fields, set `openOnClick={false}` to type without opening a modal dialog; the trigger
and Enter/ArrowDown still open the calendar.

Reserved root presence attributes are `data-open`, `data-disabled`, and `data-invalid`.
They are empty strings when active and absent otherwise; consumer props cannot misrepresent them.
The root is Input's wrapper (`root.root` in DatePicker state), not its native input. No size,
appearance, or other design-state attributes are added. CSS can also use native/ARIA selectors.

These examples provide their own token-based CSS, including focus and forced-colors affordances.
The headless library does not guarantee compat visual parity; callers own visual accessibility.

This implementation is developed against the pending headless Calendar in
[microsoft/fluentui#36752](https://github.com/microsoft/fluentui/pull/36752) and remains blocked until
that dependency and the standalone Calendar fixes in
[microsoft/fluentui#36917](https://github.com/microsoft/fluentui/pull/36917) merge.
