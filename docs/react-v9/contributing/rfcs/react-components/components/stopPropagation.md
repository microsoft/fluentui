# RFC: using stopPropagation or preventDefault on escape-to-close events

---

Contributors: @smhigley @bsunderhus

28 January 2025

## Summary

This RFC discusses whether to preserve the removal of `event.stopPropagation()` in escape key events in #29262, affecting `Dialog`, `Menu`, `Popover`, and `Tooltip`. The `Combobox`, `Tagpicker`, and `Dropdown` controls all currently still use `event.stopPropagation()`.

## Background

Prior to #29262 as well as in Fluent v8, controls used `event.stopPropagation()` when the `Escape` key was used to close a popup to prevent a single escape key press from closing multiple levels of popups (e.g. a popover in a dialog, or multiple levels of menus). This is also common practice in other control libraries such as Material, Semantic UI, or other teams within Microsoft (e.g. OWA, who reached out just before this RFC). We've also had a number of issues logged since the change: #28316, #28789, #30384, #30590, #33062.

On the other hand, the newer HTML `<dialog>` element and `popover` functionality do not automatically stop propagation of escape. In general `<dialog>`s should not be nested, but I've logged an issue for `popover` [on Open UI](https://github.com/openui/open-ui/issues/1147), since this issue has not yet been discussed.

After the change, our controls call `event.preventDefault()` instead of `event.stopPropagation()`, and we check `event.defaultPrevented` to handle multiple levels of popups.

## Problem statement

By switching to `event.preventDefault()` and putting the onus on authoring teams to handle preventing cascade closures, we're going against the more common pattern used in v8, v0, and third party libraries, making interop more error-prone. It's also not an immediately apparent issue -- it's only found when a partner team both:

1. Uses a Fluent v9 popup inside a not-v9 outer popup
2. Tests closing the inner popup with the keyboard

On the other hand, using `event.stopPropagation` makes it harder for teams who want to listen to escape key events, even when they are consumed by a downstream control. One possible use case for this would be a marketing tracking script to determine how users are leaving a dialog on a granular level (i.e. measure escape behavior vs. close button click). With `stopPropagation`, it would be necessary to use the capture phase to catch escape dismissal.

## Detailed Design or Proposal

This one is pretty simple, we have two options:

1. Keep the current approach of calling `event.preventDefault()` and checking `event.defaultPrevented`
2. Switch back to `event.stopPropagation()`

The one thing to note is that this RFC is narrowly scoped to only escape key keyboard events that are used to perform a close action, and no other events.

### Pros and Cons

`preventDefault`:

- Is less opinionated about when & how partner teams should be able to listen to the escape key

`stopPropagation`:

- Follows the most common established pattern
- Interop with v8, v0, the HTML `<dialog>` element, and other non-Fluent controls

## Open Issues

No current open issues, but these are closed issues from partners asking about `stopPropagation`:

- #28316
- #28789
- #30384
- #30590
- #33062
