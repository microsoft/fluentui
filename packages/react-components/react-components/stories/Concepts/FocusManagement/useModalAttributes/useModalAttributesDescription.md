This hook is a helper to create modal dialog like experiences. The hook creates accessible focus traps that set
[aria-hidden](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-hidden).
The focus trap can only be activated with explicit [HTMLElement.focus()](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus)
call in javscript code.

The hook returns two sets of attributes to spread to elements. This represents the two concepts of a modal dialog

- trigger - button that opens a dialog
- modal - the modal dialog surface itself

The hook will also handle reverting focus back to the trigger once the modal dialog is unmounted from DOM.

> ⚠️ Do not use this hook without appropriate guidance from your accessibility champ. Focus trap is only
> one of many requirements to consider when creating a modal dialog. Consider the `Dialog` and `Popover` components
> if you need modal dialog like components.
