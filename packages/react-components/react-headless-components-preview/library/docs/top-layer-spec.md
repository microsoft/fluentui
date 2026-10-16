# Top Layer — Headless Spec

## Overview

`useTopLayer` puts an element into the browser **top layer**, as the headless counterpart of v9 `Portal`. It wraps the two native mechanisms:

- the HTML Popover API (`popover="auto" | "hint" | "manual"` + `showPopover()` / `hidePopover()`), available on any element;
- the modal `<dialog>` (`showModal()` / `close()`), which also makes the rest of the page inert.

The element is **not moved** in the DOM. It inherits CSS custom properties (theme tokens), `dir` and React/DOM event bubbling from where it is rendered, so the theme-class copying, `dir` propagation, virtual-parent wiring and `z-index` that `Portal` needs are not required. The top layer still escapes `overflow`, `transform`, `contain` and `z-index` stacking of ancestors.

Positioning is not included. Compose with `usePositioning` (CSS anchor positioning).

Exported from `@fluentui/react-headless-components-preview/top-layer`.

| Export                    | Purpose                                                               |
| ------------------------- | --------------------------------------------------------------------- |
| `useTopLayer`             | top-layer lifecycle, focus and close reporting for an element you own |
| `getTopLayerTriggerProps` | trigger ARIA attributes                                               |

There are no ready-made components: `Popover` and `Dialog` are built on the same hook. The Concepts/Top Layer stories show recipes for a menu, a modal dialog and a hint.

### Terms

- **Top layer**: the browser's rendering layer above the document, shared by popovers and modal dialogs.
- **Top-layer element**: an element `useTopLayer` puts in the top layer.
- **Trigger**: the element that opens a top-layer element and carries its ARIA relationship.

## `useTopLayer`

```ts
useTopLayer(elementRef: React.RefObject<HTMLElement | null>, options: UseTopLayerOptions): UseTopLayerReturn;
```

| Option               | Type                                      | Default | Description                                                                                                                                                               |
| -------------------- | ----------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `open`               | `boolean`                                 | —       | React owns this state.                                                                                                                                                    |
| `mode`               | `'auto' \| 'hint' \| 'manual' \| 'modal'` | —       | See [Modes](#modes). `modal` requires a `<dialog>`.                                                                                                                       |
| `role`               | `TopLayerRole`                            | —       | Initial focus and modal focus wrap. See [Focus](#focus).                                                                                                                  |
| `onClose`            | `(data: TopLayerCloseData) => void`       | —       | The browser closed the element. `type` is `'escape' \| 'light-dismiss' \| 'native-close'`. Closes caused by `open` are not reported.                                      |
| `onOpen`             | `(event: Event) => void`                  | —       | The browser opened a popover while `open` is false (`popovertarget`, `commandfor`). Without it, such opens are ignored with a dev warning.                                |
| `restoreFocus`       | `boolean`                                 | `true`  | See [Focus](#focus).                                                                                                                                                      |
| `unmountOnClose`     | `boolean`                                 | `true`  | Unmount once closed and exit animations finish.                                                                                                                           |
| `preventEscapeClose` | `boolean`                                 | `false` | `modal` only. Keep the dialog open on Escape and report it through `onClose`; the consumer decides. By default the browser closes it and `onClose` reports it afterwards. |

| Return         | Type                                            | Description                                                                                                     |
| -------------- | ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `shouldRender` | `boolean`                                       | Render the element this pass. Stays true while it exits.                                                        |
| `phase`        | `'closed' \| 'entering' \| 'open' \| 'exiting'` | Lifecycle phase. `entering` and `exiting` last until the element's animations finish.                           |
| `popover`      | `'auto' \| 'hint' \| 'manual' \| undefined`     | Value for the `popover` attribute; `undefined` for `modal`. Stays `hint` when unsupported; see [Modes](#modes). |

### Example

```tsx
const ref = React.useRef<HTMLDivElement>(null);
const { shouldRender, popover } = useTopLayer(ref, {
  open,
  mode: 'auto',
  role: 'menu',
  onClose: () => setOpen(false),
});
const { targetRef, containerRef } = usePositioning({ position: 'below' });

<button
  ref={targetRef}
  onClick={() => setOpen(!open)}
  {...getTopLayerTriggerProps({ open, layerId: id, role: 'menu' })}
/>;
{
  shouldRender && (
    <div
      ref={mergeRefs(ref, containerRef)}
      id={id}
      role="menu"
      aria-label="Actions"
      popover={popover}
      data-open={open ? '' : undefined}
    />
  );
}
```

## `getTopLayerTriggerProps({ open, layerId, role })`

- `dialog`, `alertdialog` (→ `dialog`), `menu`, `listbox`, `tree`, `grid` → `aria-haspopup`, `aria-expanded`, and `aria-controls` while open.
- `tooltip` → `aria-describedby` while open.
- other roles → `aria-expanded`, and `aria-controls` while open.
- References to `layerId` are only set while open, because the element may be unmounted when closed. No event handlers are returned.

## Modes

| Mode     | Element                 | Light dismiss | Closes other `auto` popovers | Page inert | Escape                                                             |
| -------- | ----------------------- | ------------- | ---------------------------- | ---------- | ------------------------------------------------------------------ |
| `auto`   | any, `popover="auto"`   | yes           | yes, except its ancestors    | no         | closes topmost, reported as `escape`                               |
| `hint`   | any, `popover="hint"`   | yes           | no                           | no         | closes, reported as `escape`                                       |
| `manual` | any, `popover="manual"` | no            | no                           | no         | none                                                               |
| `modal`  | `<dialog>`              | no            | yes                          | yes        | closes, reported as `escape` (kept open with `preventEscapeClose`) |

`hint` falls back to `auto` where unsupported (Safari ≤ 26.5). The returned `popover` value stays `hint` so server and client markup match; the attribute is switched to `auto` after mount, before the element is shown.

## Behaviour

- **Close reason.** A capture-phase `keydown` on the document marks Escape when the element is open and no nested `auto`/`hint` popover is open (Escape closes the topmost one). Other popover closes are `light-dismiss`.
- **Stale `toggle` events are ignored.** `toggle` is dispatched asynchronously; an event whose `newState` no longer matches the element's state is dropped.
- **Nested dialogs.** `cancel` from a descendant dialog is ignored. WebKit fires `cancel` on a modal even when Escape closed a popover inside it; that one `cancel` is ignored.
- **Lifecycle.** `entering` and `exiting` last until running, finite animations on the element and its `::backdrop` finish (descendant animations are ignored). Exit styles must keep the element displayed and in the top layer: `transition: display … allow-discrete, overlay … allow-discrete`, or `display` keyframes. Style the exit with `:not([data-open])`. Respect `prefers-reduced-motion` in CSS; the hook does not skip animations on its own.
- **SSR.** The element renders with its `popover` attribute (hidden by the UA stylesheet) or as a closed `<dialog>`, and is shown in a layout effect after hydration.

## Focus

| Role                    | On open                                                                                     |
| ----------------------- | ------------------------------------------------------------------------------------------- |
| `dialog`, `alertdialog` | `[autofocus]`, else first tabbable element (native for `modal`)                             |
| `menu`                  | first tabbable element, unless a combobox controls the popup                                |
| `listbox`               | selected option, first option, first tabbable element; unless a combobox controls the popup |
| other                   | focus does not move (`autofocus` is still honoured by the browser)                          |

A combobox controls the popup when the focused element is text-like and its `aria-controls`/`aria-owns` point at the popup, an ancestor, or a descendant.

- **Focus wrap.** Tab and Shift+Tab cycle inside `modal` elements with role `dialog`/`alertdialog`. Native `showModal()` lets focus leave through the browser chrome. A focused nested popover or dialog handles its own Tab. Non-modal dialogs do not trap focus.
- **Restore.** The browser restores focus for `popover="auto"` and for modal dialogs (`showModal()` / `close()`). It does not for `popover="manual"`, `popover="hint"`, or a `<dialog>` shown as a popover: focus stays on the hidden element. The hook covers those modes: on close it focuses the element that was focused before opening (`preventScroll`), but only when focus is still inside the top-layer element or lost to `<body>`. For `auto` and modal it finds focus already restored and does nothing. After a light dismiss, focus is left where the user put it.
- **Exit.** While exiting, the element is `inert` and `aria-hidden="true"`, set after native focus restore. Both are removed on the next open, including a native one.

Tabbable elements exclude `tabindex="-1"`, disabled, `aria-disabled="true"`, `aria-hidden`/`inert` subtrees, elements of nested popovers or dialogs, and elements failing `checkVisibility()`. They are ordered like the browser's tab order (positive `tabindex` first), and a named radio group counts as one tab stop (its checked radio, else its first). `[autofocus]` inside a nested popover or dialog is ignored.

## Stacking and nesting

- The top layer is ordered by insertion (last shown is on top); `z-index` has no effect.
- Elements stay inline, so a top-layer element rendered inside an `auto` popover is its DOM descendant and the platform treats it as nested: opening the child keeps the parent open, and Escape / light dismiss close the topmost first. Portals break this.
- Showing a modal closes open `auto` popovers. Content that must sit above a modal (toasts) must be shown after it.
- Popovers opened without user activation between them share a close watcher, so one Escape closes them together. Tests must use trusted input (`cypress-real-events`).

## Consumers

- **Popover / TeachingPopover / InfoLabel.** `PopoverSurface` calls `useTopLayer` with `mode: trapFocus ? 'modal' : 'auto'` and routes `onClose` / `onOpen` to `onNativeOpenChange`. It reports whether it renders through `onSurfaceRenderChange`, and `Popover` keeps it mounted while it exits (`shouldRenderSurface`). Custom surfaces that never report are mounted only while open.
- **Dialog / Drawer.** `DialogSurface` calls `useTopLayer` with `mode: 'manual'` (non-modal) or `'modal'`. Escape and backdrop clicks stay in the surface's React handlers so `onOpenChange` keeps its event types; Escape from inside a nested popover or dialog is left to that layer. A non-modal surface toggled by a `popovertarget` invoker is reported as `surfaceToggle`.

## Decisions

**React is told about every change the browser makes, and never about its own.**

- Browser closes (Escape, light dismiss, `<form method="dialog">`) are reported through `onClose`; browser opens (`popovertarget`, `commandfor`) through `onOpen`, or ignored with a dev warning without it.
- Programmatic closes (`open` becoming false) are never reported.
- Escape on a modal follows the platform: the browser closes the dialog and `onClose` reports it. `preventEscapeClose` keeps the dialog open instead, for consumers that let the user veto a close. `DialogSurface` uses it, because `onOpenChange` can be default-prevented.

**Focus restore defers to the browser.** The hook only covers the modes the browser does not restore, and never pulls focus back after a light dismiss.

**Tab wraps only in modal dialogs.** A non-modal dialog that trapped Tab would keep keyboard users out of the page it sits next to.

## Changes from master

Observable differences for the components moved onto `useTopLayer`. Everything else is unchanged.

| Area                                                      | Master                                                                                      | Now                                                                                             |
| --------------------------------------------------------- | ------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| Popover exit                                              | surface unmounted as soon as `open` is false                                                | surface stays mounted until its exit animations finish, like `DialogSurface`                    |
| Exiting element                                           | —                                                                                           | `inert` and `aria-hidden="true"` while it exits (Popover and Dialog)                            |
| Modal Tab                                                 | browser default: Tab can leave a modal through the browser chrome                           | Tab wraps inside modal Dialog, `trapFocus` Popover and Drawer; a radio group counts as one stop |
| Non-modal Dialog open                                     | focus stays where it was, unless a child has `autofocus`                                    | focus moves to `[autofocus]`, else the first focusable element                                  |
| Non-modal Dialog close                                    | focus always returned to the element focused before opening, even if the user moved it away | returned only when focus is still inside the dialog or on `<body>`                              |
| Escape in a popover or dialog nested in a `DialogSurface` | the outer dialog closed too, unless the inner handler stopped the event                     | only the inner one closes                                                                       |
| `popover="hint"`                                          | Tooltip set `hint` directly                                                                 | the hook switches it to `auto` after mount in browsers without `hint`, without an SSR mismatch  |
| Custom Popover surface                                    | mounted only while open                                                                     | unchanged                                                                                       |
| Popover `trapFocus` Escape                                | browser closes the dialog, `onOpenChange` `type: 'close'`                                   | unchanged                                                                                       |
| Native opens (`popovertarget`)                            | non-modal Dialog synced as `surfaceToggle`; Popover unreachable while closed                | unchanged                                                                                       |
