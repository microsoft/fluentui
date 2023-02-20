Popup is a utility component that handles the following functionality for a transient surface, intended to be used for a dialog, modal, or non-modal callout:

- Restoring focus to a previously focused element when the Popup is destroyed.
- Setting `overflowY: scroll` when the content height exceeds the Popup height.
- Setting nodes outside the Popup to `aria-hidden="true"` for screen reader accessibility when used as a modal.
