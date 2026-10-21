# Top Layer — Headless Spec

## Overview

`useTopLayer` is the internal hook for putting an overlay element into the browser **top layer**. It owns show/hide, browser opens and closes, Escape, focus return and the exit lifecycle, and is built on two native APIs:

- the Popover API: `popover="auto" | "hint" | "manual"` with `showPopover()` / `hidePopover()`, on any element;
- the modal `<dialog>`: `showModal()` / `close()`, which also makes the rest of the page inert.

The element stays where it is in the DOM, so it keeps theme tokens, `dir` and event bubbling without the copying and wiring `Portal` needs. The top layer still escapes the `overflow`, `transform`, `contain` and `z-index` of its ancestors.

No positioning: overlays compose it with `usePositioning`.

The hook is not exported. Custom overlays should compose `Popover`, `Dialog` and the other components, which bring roles, keyboard handling and focus behaviour; see [Decisions](#decisions).

## `useTopLayer`

```ts
useTopLayer(elementRef: React.RefObject<HTMLElement | null>, options: UseTopLayerOptions): UseTopLayerReturn;
```

| Option               | Type                                                                  | Default | Description                                                                                                                                                |
| -------------------- | --------------------------------------------------------------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `open`               | `boolean`                                                             | —       | Controlled.                                                                                                                                                |
| `mode`               | `'auto' \| 'hint' \| 'manual' \| 'modal'`                             | —       | See [Modes](#modes). `modal` needs a `<dialog>`.                                                                                                           |
| `onOpenChange`       | `(open: boolean, data: TopLayerOpenChangeData) => void`               | —       | The browser opened or closed the element, or the hook handled Escape. Never called for changes made through `open`. See [Open and close](#open-and-close). |
| `initialFocus`       | `RefObject<HTMLElement> \| (element) => HTMLElement \| null \| false` | —       | Focused after the element is shown. `false` keeps focus where it was; `null` leaves it to the browser.                                                     |
| `returnFocus`        | `boolean \| 'always' \| RefObject<HTMLElement>`                       | `true`  | See [Focus](#focus).                                                                                                                                       |
| `onShow`             | `(element: HTMLElement) => void`                                      | —       | Called after the element is shown, e.g. to set up content that needs it visible.                                                                           |
| `unmountOnClose`     | `boolean`                                                             | `true`  | Unmount after the element closes and exit animations end.                                                                                                  |
| `preventEscapeClose` | `boolean`                                                             | `false` | `modal` only. Keep the dialog open on Escape and report it, so the consumer can veto. By default the browser closes it.                                    |

`TopLayerOpenChangeData` is `{ type, event }`:

| `type`          | When                                                                                                                                                               | `event`                                                   |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------- |
| `escape`        | Escape, or another close request such as the Android back button                                                                                                   | the React `keydown` when the hook handled it, else native |
| `light-dismiss` | any other popover close: a click outside, another `auto` popover or a modal opening, a `popovertarget` or `commandfor` invoker, `hidePopover()` from outside React | `toggle`                                                  |
| `native-close`  | any other dialog close: `<form method="dialog">`, `dialog.close()` from outside React                                                                              | `close`                                                   |
| `native-open`   | a browser open: `popovertarget`, `commandfor`, `showModal()` from outside React                                                                                    | `toggle`                                                  |

| Return         | Type                                            | Description                                                                                                        |
| -------------- | ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `shouldRender` | `boolean`                                       | Whether to render the element. Stays true while it exits.                                                          |
| `phase`        | `'closed' \| 'entering' \| 'open' \| 'exiting'` | `entering` only while enter animations run; `exiting` until the browser reports the close and exit animations end. |
| `popover`      | `'auto' \| 'hint' \| 'manual' \| undefined`     | Value for the `popover` attribute; `undefined` for `modal`.                                                        |
| `onKeyDown`    | `(event: React.KeyboardEvent) => void`          | Merge into the element's `onKeyDown`. See [Escape](#escape).                                                       |

### Example

```tsx
const ref = React.useRef<HTMLDivElement>(null);
const { shouldRender, popover, onKeyDown } = useTopLayer(ref, {
  open,
  mode: 'auto',
  onOpenChange: nextOpen => setOpen(nextOpen),
  returnFocus: triggerRef,
});
const { targetRef, containerRef } = usePositioning({ position: 'below' });

<button
  ref={mergeRefs(triggerRef, targetRef)}
  onClick={() => setOpen(!open)}
  aria-haspopup="menu"
  aria-expanded={open}
/>;
{
  shouldRender && (
    <div
      ref={mergeRefs(ref, containerRef)}
      id={id}
      role="menu"
      aria-label="Actions"
      popover={popover}
      onKeyDown={onKeyDown}
      data-open={open ? '' : undefined}
    />
  );
}
```

## Modes

| Mode     | Element                 | Light dismiss | Closes other `auto` popovers | Page inert | Escape                                                                  |
| -------- | ----------------------- | ------------- | ---------------------------- | ---------- | ----------------------------------------------------------------------- |
| `auto`   | any, `popover="auto"`   | yes           | yes, except its ancestors    | no         | the browser closes the topmost                                          |
| `hint`   | any, `popover="hint"`   | yes           | no                           | no         | the browser closes it                                                   |
| `manual` | any, `popover="manual"` | no            | no                           | no         | the hook reports it through `onKeyDown`                                 |
| `modal`  | `<dialog>`              | no            | yes                          | yes        | the browser closes it, or the hook reports it with `preventEscapeClose` |

Browsers without `popover="hint"` (Safari ≤ 26.5) treat it as `manual`, so a hint never closes an open `auto` popover. The attribute stays `hint`, so server and client markup match.

## Open and close

- **React owns `open`.** The hook reports what the browser does and never what `open` does.
- **Browser closes are final.** The browser can't cancel a close, so the element stays hidden even if `open` stays true; showing it again would flicker, leave focus outside it and fight other open `auto` popovers. In development, the hook warns when `open` stays true after it reported a browser close. An Escape the hook handles itself leaves the element open, so keeping `open` true there is a veto and gets no warning. To keep a popover open, use `manual`.
- **Browser opens.** Reported as `native-open`, including `showModal()` or `commandfor` on a closed `modal` dialog in browsers that fire `toggle` on dialogs (Chromium 132+). If `open` stays false, the element is hidden again. If the consumer accepts, `initialFocus` and `onShow` run as for any other open.
- **Close reason.** A capture `keydown` listener on the document, attached only while open, marks Escape when no nested `auto` or `hint` popover is open, since Escape closes the topmost one. Other popover closes are `light-dismiss`, since the browser does not say why a popover closed. A modal close is `escape` only if its `cancel` wasn't prevented, by the hook or another listener.
- **Stale `toggle`.** `toggle` is async. An event whose `newState` no longer matches the element is ignored.
- **Nested dialogs.** `cancel` from a descendant dialog is ignored. WebKit fires `cancel` on a modal when Escape closed a popover inside it; that `cancel` is ignored too.

## Escape

The browser closes `auto`, `hint` and modal layers on Escape. Where it doesn't, the returned `onKeyDown` reports Escape as `escape`, stops it from reaching outer layers' `onKeyDown` and prevents its default, so the browser doesn't close a native ancestor either:

- `manual`, including `hint` where unsupported;
- a `<dialog>` shown with `show()` because the Popover API is missing;
- `modal` with `preventEscapeClose`. The `cancel` that follows is prevented and not reported again. A `cancel` without a `keydown` on the element (focus on `<body>`, the Android back button) is reported on its own.

Escape is not for the layer when it comes from a popover or dialog nested inside it, or when an open `auto` or `hint` popover inside it (such as a Tooltip) takes it first. Because it is a React handler, Escape from content portaled out of the element still counts.

## Lifecycle

- **Exit.** A closing element stays mounted until the browser reports the close (`close` or `toggle`) and finite animations on the element and its pseudo-elements (`::backdrop`, `::before`, `::after`) end; animations on descendants are not awaited. The close is awaited by its own listener, so changing `mode` during the exit can't drop it. An element that never opened unmounts right away. Opening adds a render only when enter animations run.
- **Exit styles.** Keep the element displayed and in the top layer while it animates out: `transition: display … allow-discrete, overlay … allow-discrete`, or `display` keyframes. Target the exit with `:not([data-open])`, and handle `prefers-reduced-motion` in CSS.
- **Inert while exiting.** The exiting element gets `inert` and `aria-hidden="true"` after the browser's focus restore. When the exit ends, both go back to the values they had before, unless React changed them meanwhile (e.g. `aria-hidden={!open}` on a reopen).
- **`popover` attribute changed while open** (e.g. Popover `mode`). The browser hides the element; it is shown again with the new value, focus stays on the control that had it, and no close is reported.
- **Switching between `modal` and a popover mode while open** (e.g. Popover `trapFocus`). The element is closed and shown in the new mode, focus stays on the control that had it, and no close is reported. The hook sets the `popover` attribute itself if it isn't there yet. Without the Popover API, a `<dialog>` switches between `show()` and `showModal()`.
- **Element replaced or mounted late.** A new element (changed `key`, or rendered after `open` became true) is shown, with `initialFocus` and `onShow` as on any other open. An exiting element that is replaced or removed finishes its exit.
- **Element rendered only while open.** Works with `unmountOnClose: false`; listeners attach when it appears.
- **Listeners.** Element listeners are added once per element and mode kind. Document listeners exist only while open, so closed layers that stay mounted (Tooltip, Menu) cost nothing.
- **SSR.** Renders hidden (`popover` attribute or closed `<dialog>`) and is shown in a layout effect after hydration.

## Focus

Focus on open and Tab order are the browser's unless `initialFocus` is set:

- `showModal()` focuses `[autofocus]` or the dialog. Tab can leave a modal through the browser chrome.
- `showPopover()` focuses an `[autofocus]` element and otherwise leaves focus alone. React's `autoFocus` prop runs on mount, before the popover is shown, so it doesn't help; use `initialFocus`.

On close, `returnFocus` decides:

| Value      | Focuses                              | When                                                                     |
| ---------- | ------------------------------------ | ------------------------------------------------------------------------ |
| `true`     | the element focused before opening   | focus was inside when closing started and is still inside or on `<body>` |
| a ref      | the ref's element (e.g. the trigger) | same as `true`                                                           |
| `'always'` | the element focused before opening   | always, if it is still in the document                                   |
| `false`    | —                                    | never                                                                    |

This covers what the browser doesn't restore: `manual`, `hint`, a `<dialog>` shown as a popover, and light dismiss. After a browser close, focus is returned right away, since `open` may never change. Works inside shadow roots.

## Stacking and nesting

- The top layer is ordered by insertion; `z-index` has no effect.
- Elements stay inline, so a popover rendered inside an `auto` popover is nested: opening it keeps the parent open, and Escape and light dismiss close the topmost first. Portals break this.
- Showing a modal closes open `auto` popovers. Content that must sit above a modal, like toasts, has to be shown after it.
- Popovers opened without user activation in between share a close watcher, so one Escape closes them all. Tests need trusted input (`cypress-real-events`).

## Decisions

**React owns `open`.** The hook reports every open and close the browser makes, and none made through `open`. A browser close is final: the element stays closed even if the consumer keeps `open`. Escape on a modal follows the platform: the browser closes it and `onOpenChange` reports it. `preventEscapeClose` keeps it open for consumers that can veto.

**One place for Escape.** The rule for which layer an Escape belongs to lives in the hook. Consumers merge `onKeyDown` and get `onOpenChange(false, { type: 'escape' })`.

**Internal only.** A public hook would let consumers build overlays without roles, keyboard handling or focus behaviour. Custom overlays compose the components instead; where a component lacks a mode (e.g. `manual` or `hint` on Popover), the component gains it. The hook can become public later if a case comes up that composition cannot cover. Option shapes can change freely until then.

**Focus follows the platform.** The hook doesn't move focus on open unless asked, doesn't wrap Tab, and returns focus only where the browser doesn't, including after light dismiss, so keyboard and screen reader users don't lose their place.
