# Dialog — Headless Spec

## Overview

Dialog is a modal or non-modal overlay container that presents focused content or a confirmation action. It manages focus trapping, backdrop interaction, dismissal, and keyboard navigation. Dialog can operate in modal mode (blocking background interaction) or non-modal mode (allowing background interaction). It composes a header (optional with close button and optional subtitle/image), body (scrollable content area), and footer (action buttons).

## Composition

```
Dialog
├── DialogTrigger (optional — opens dialog)
├── DialogSurface
│   ├── DialogHeader
│   │   ├── DialogTitle
│   │   ├── DialogSubtitle (optional)
│   │   ├── DialogImage (optional — can be thumbnail or full-width inset)
│   │   └── DialogCloseButton (optional)
│   ├── DialogBody
│   │   └── children / content slots
│   └── DialogActions
│       └── action buttons (1–3 actions)
└── DialogBackdrop (when modal)
```

Dialog is a compound component. DialogTrigger is optional if opened programmatically via `open` prop.

## Props API

| Prop             | Type                                                   | Default     | Description                                                                                          |
| ---------------- | ------------------------------------------------------ | ----------- | ---------------------------------------------------------------------------------------------------- |
| `open`           | `boolean`                                              | `undefined` | Controlled: whether dialog is visible. Omit for uncontrolled.                                        |
| `defaultOpen`    | `boolean`                                              | `false`     | Uncontrolled: initial visibility state.                                                              |
| `onOpenChange`   | `(open: boolean, data?: DialogOpenChangeData) => void` | —           | Fires when open state changes (user action or programmatic).                                         |
| `modal`          | `boolean`                                              | `true`      | If `true`, backdrop prevents background interaction. If `false`, non-modal (can interact with page). |
| `size`           | `'small' \| 'medium' \| 'large'`                       | `'medium'`  | Logical size (layout only, no visual effect).                                                        |
| `inertTrapFocus` | `boolean`                                              | `true`      | When `true`, focus is trapped inside dialog (modal behaviour).                                       |
| `onDismiss`      | `() => void`                                           | —           | Fires when dialog requests closure (Escape key, close button, backdrop click in modal mode).         |

## States

| State                  | Trigger                                                      | Behaviour                                                                                                                         | ARIA attribute                                                                                                                                           |
| ---------------------- | ------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Rest**               | Dialog mounted with `open={true}` or `defaultOpen={true}`    | Dialog visible, focus initially set to first focusable element or explicitly via `initialFocusRef`. Backdrop rendered (if modal). | `role="dialog"` (or `alertdialog` for alerts); `aria-labelledby` points to DialogTitle; `aria-modal="true"` (modal) or `aria-modal="false"` (non-modal). |
| **Closed**             | `open={false}` or user dismisses                             | Dialog removed from DOM or hidden; focus restored to trigger element (if DialogTrigger used).                                     | No dialog role attributes present.                                                                                                                       |
| **Escape Pressed**     | User presses Escape key                                      | If `inertTrapFocus={true}`, `onDismiss()` fires → typically closes dialog. Non-modal dialogs do not close on Escape by default.   | No ARIA change; behaviour is prop-driven.                                                                                                                |
| **Backdrop Click**     | User clicks backdrop overlay (modal only)                    | In modal mode, `onDismiss()` fires. Non-modal dialogs have no backdrop.                                                           | No ARIA change.                                                                                                                                          |
| **Focus Trapped**      | Dialog is modal (`modal={true}` and `inertTrapFocus={true}`) | Tab/Shift+Tab wrap within dialog; focus cannot leave dialog boundary.                                                             | `aria-modal="true"`.                                                                                                                                     |
| **Scrollable Content** | Body content exceeds container height                        | Body region becomes scrollable. Header and Footer remain fixed.                                                                   | Body container has `overflow: auto` (visual only). Announce scrollable region via `aria-live="polite"` if content changes dynamically.                   |

## Keyboard Navigation

| Key               | Action                                                                                                                                               |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Tab**           | Move focus to next focusable element within dialog (or wrap to first if at last). Blocked from leaving dialog boundary when `inertTrapFocus={true}`. |
| **Shift + Tab**   | Move focus to previous focusable element within dialog (or wrap to last if at first). Blocked from leaving dialog boundary.                          |
| **Escape**        | Close dialog by triggering `onDismiss()` (if modal or if configured). Non-modal dialogs may not close on Escape depending on use case.               |
| **Enter / Space** | Activate focused button in DialogActions. Standard button activation.                                                                                |
| **Home / End**    | No special handling at dialog level. Passed through to content (e.g., list inside body).                                                             |

## Content Slots

### DialogHeader

- **DialogTitle** (text slot) — primary heading. Required for accessibility (used in `aria-labelledby`).
- **DialogSubtitle** (optional text slot) — secondary heading or description.
- **DialogImage** (optional element slot) — image element. Can be thumbnail (start-aligned) or full-width inset (top-aligned, spans width).
- **DialogCloseButton** (optional element) — typically an icon button with `aria-label="Close"`. Triggers `onDismiss()` on click.

### DialogBody

- **children** / **content** (element slot) — main content. Can include text, images, forms, lists. Scrollable if content exceeds container height.

### DialogActions

- **action buttons** (element slot(s)) — 1–3 button elements, typically:

  - **1 action**: Single primary or dismiss button.
  - **2 actions**: Primary + Secondary (e.g., "Confirm" + "Cancel").
  - **3 actions**: Primary + Secondary + Tertiary (e.g., "Save" + "Discard" + "Cancel").

  Button layout may reflow from row (≥480px) to column (<480px) based on viewport.

## Events

| Event          | Signature                                                                                                                      | When it fires                                                                                                                                                           |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `onOpenChange` | `(open: boolean, data?: { trigger?: 'trigger' \| 'escapeKey' \| 'backdropClick' \| 'closeButton' \| 'programmatic' }) => void` | When dialog open state changes. Fires on mount/unmount, Escape key, backdrop click, close button click, or programmatic `open` prop change.                             |
| `onDismiss`    | `() => void`                                                                                                                   | When dialog receives a close request (Escape key, backdrop click in modal mode, or close button click). Does not close automatically; consumer must set `open={false}`. |

## Accessibility

### ARIA Pattern

```tsx
<div
  role="dialog" // or "alertdialog" for alert dialogs
  aria-modal={modal} // "true" (modal) or "false" (non-modal)
  aria-labelledby="dialog-title-id" // required; points to DialogTitle
  aria-describedby="dialog-description-id" // optional; points to DialogBody or subtitle
>
  {/* header, body, footer */}
</div>
```

### Role Selection

- **dialog**: General-purpose dialog (confirmation, settings, input forms).
- **alertdialog**: Alerts or warnings requiring immediate user acknowledgment (ARIA 1.2 spec).

### Focus Management

- **Initial focus**: Set to first focusable element (button, input) or explicit `initialFocusRef` prop if provided.
- **Focus trap**: When `inertTrapFocus={true}`, Tab/Shift+Tab wrap within dialog boundary; prevent focus escape.
- **Restore focus**: On close, restore focus to DialogTrigger or document.activeElement predecessor.

### Live Regions

- If DialogBody contains dynamic content (e.g., async-loaded messages), wrap in `aria-live="polite" aria-atomic="false"` to announce changes.

### Close Button

- DialogCloseButton must have `aria-label="Close"` or equivalent accessible name.
- Keyboard-accessible: Enter/Space keys activate.

### Labeling

- DialogTitle (`aria-labelledby`) is mandatory for accessible dialogs.
- DialogSubtitle or additional context can use `aria-describedby` pointing to body or subtitle element.

## Controlled vs Uncontrolled

### Uncontrolled (recommended for simple cases)

Dialog manages its own `open` state internally:

```tsx
<Dialog defaultOpen={false}>
  <DialogTrigger>
    <Button>Open Dialog</Button>
  </DialogTrigger>
  <DialogSurface>
    <DialogHeader>
      <DialogTitle>Confirm Action</DialogTitle>
      <DialogCloseButton />
    </DialogHeader>
    <DialogBody>Are you sure?</DialogBody>
    <DialogActions>
      <Button onClick={() => /* handle confirm */}>Confirm</Button>
      <Button onClick={() => /* dismiss will be called */}>Cancel</Button>
    </DialogActions>
  </DialogSurface>
</Dialog>
```

### Controlled (when parent component manages state)

Parent controls `open` prop and responds to `onOpenChange`:

```tsx
const [isOpen, setIsOpen] = useState(false);

<Dialog open={isOpen} onOpenChange={newOpen => setIsOpen(newOpen)} onDismiss={() => setIsOpen(false)}>
  <DialogTrigger>
    <Button onClick={() => setIsOpen(true)}>Open</Button>
  </DialogTrigger>
  <DialogSurface>
    <DialogHeader>
      <DialogTitle>Title</DialogTitle>
    </DialogHeader>
    <DialogBody>Content</DialogBody>
    <DialogActions>
      <Button onClick={() => setIsOpen(false)}>Close</Button>
    </DialogActions>
  </DialogSurface>
</Dialog>;
```

## RTL Support

Dialog layout mirrors in RTL (right-to-left) contexts:

- **DialogHeader**: Close button moves from top-right to top-left.
- **DialogActions**: Button order reverses (rightmost becomes leftmost).
- **DialogImage**: Full-width inset images remain unaffected (visual content); thumbnails move from start to end position.
- Implement via CSS `direction: rtl` or logical properties (`inset-inline-start`, `inset-inline-end`).

## Positioning

Dialog positioning is **not** a headless concern (purely visual). However, the component must:

- Expose a `containerRef` or `dialogSurfaceRef` prop to allow consumers to position/portal the dialog via CSS or JS (e.g., centering, fixed overlay).
- Support React `createPortal()` or custom mounting logic.
- Manage **backdrop** (visual layer behind dialog preventing background interaction in modal mode) — backstop click triggers `onDismiss()` in modal dialogs.

Example portal structure (visual rendering omitted):

```tsx
<Portal>
  <DialogBackdrop onClick={onBackdropClick} />
  <DialogSurface ref={dialogSurfaceRef} role="dialog" aria-modal={modal}>
    {/* header, body, footer */}
  </DialogSurface>
</Portal>
```

---

## Notes

- **Modal vs Non-Modal**: Modal dialogs block background interaction and trap focus. Non-modal dialogs allow background interaction but may still trap focus depending on `inertTrapFocus`.
- **Dismissal**: Dialog does not auto-close on action button clicks; parent must call `setOpen(false)` or equivalent after receiving the action event.
- **Scrolling**: Body content is independently scrollable when it exceeds container bounds. Header/Footer remain fixed (visual, not headless concern).
- **Responsive**: Footer button layout (row vs column) is responsive and controlled via layout logic, not headless state.
