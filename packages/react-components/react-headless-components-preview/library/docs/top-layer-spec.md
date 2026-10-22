# Top Layer — Headless Spec

## Overview

Internal hooks for putting an overlay element into the browser **top layer**, in `src/hooks/top-layer/`. They are built on two native APIs:

- the Popover API: `popover="auto" | "hint" | "manual"` with `showPopover()` / `hidePopover()`, on any element;
- the modal `<dialog>`: `showModal()` / `close()`, which also makes the rest of the page inert.

The element stays where it is in the DOM, so it keeps theme tokens, `dir` and event bubbling without the copying and wiring `Portal` needs. The top layer still escapes the `overflow`, `transform`, `contain` and `z-index` of its ancestors.

Each hook does one job, and a component composes only the ones it needs:

| Hook                      | Job                                                                                                            |
| ------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `useLayerOpenState`       | Open state, kept in sync with the browser through the Popover API. Reports opens and closes the browser makes. |
| `useDialogLayerOpenState` | `useLayerOpenState` that also accepts `mode: 'modal'` and handles a `<dialog>` without the Popover API.        |
| `useLayerPresence`        | Whether to render the element, its animation `phase`, and keeping it mounted and inert while it animates out.  |
| `useLayerEscape`          | Closes the element on Escape where the browser doesn't, or reports every Escape so the consumer can veto it.   |

No positioning: overlays compose them with `usePositioning`.

The hooks are not exported. Custom overlays should compose `Popover`, `Dialog` and the other components, which bring roles, keyboard handling and focus behaviour; see [Decisions](#decisions).

## `useLayerOpenState` and `useDialogLayerOpenState`

```ts
useLayerOpenState(elementRef: React.RefObject<HTMLElement | null>, options: UseLayerOpenStateOptions<PopoverMode>): UseLayerOpenStateReturn;
useDialogLayerOpenState(elementRef: React.RefObject<HTMLElement | null>, options: UseLayerOpenStateOptions<TopLayerMode>): UseLayerOpenStateReturn;
```

| Option         | Type                                                               | Default | Description                                                                                                     |
| -------------- | ------------------------------------------------------------------ | ------- | --------------------------------------------------------------------------------------------------------------- |
| `open`         | `boolean`                                                          | —       | Controlled. `undefined` keeps the state inside the hook.                                                        |
| `defaultOpen`  | `boolean`                                                          | `false` | Initial state when uncontrolled.                                                                                |
| `mode`         | `'auto' \| 'hint' \| 'manual'`, plus `'modal'` for the dialog hook | —       | See [Modes](#modes). `modal` needs a `<dialog>`.                                                                |
| `onOpenChange` | `(open: boolean, data: TopLayerOpenChangeData) => void`            | —       | The browser opened or closed the element. Never called for changes made through `open` or `setOpen`.            |
| `onShow`       | `(element: HTMLElement) => void`                                   | —       | Called after the element is shown, once per show of each element, e.g. to set up content that needs it visible. |

| Return    | Type                                        | Description                                                 |
| --------- | ------------------------------------------- | ----------------------------------------------------------- |
| `open`    | `boolean`                                   | The current state, controlled or internal.                  |
| `setOpen` | `(open: boolean) => void`                   | Sets the state. Not reported through `onOpenChange`.        |
| `popover` | `'auto' \| 'hint' \| 'manual' \| undefined` | Value for the `popover` attribute; `undefined` for `modal`. |

`TopLayerOpenChangeData` is `{ type, event }`, where `event` is the native event:

| `type`          | When                                                                                                                                                                 | `event`  |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `escape`        | a modal dialog closed by Escape, or another close request such as the Android back button                                                                            | `close`  |
| `light-dismiss` | any popover close: Escape, a click outside, another `auto` popover or a modal opening, a `popovertarget` or `commandfor` invoker, `hidePopover()` from outside React | `toggle` |
| `native-close`  | any other dialog close: `<form method="dialog">`, `dialog.close()` from outside React                                                                                | `close`  |
| `native-open`   | a browser open: `popovertarget`, `commandfor`, `showModal()` from outside React                                                                                      | `toggle` |

### Why two open-state hooks

`mode` is a runtime value, so a bundler can't drop the dialog code from a hook that checks it. The dialog code (`showModal()`, the `show()` fallback, the `cancel` and `close` handling) lives in `dialogAdapter.ts`, and only `useDialogLayerOpenState` imports it. Components that never open as a dialog (Tooltip, Menu, Toaster, Listbox) use `useLayerOpenState` and don't bundle it; Popover (`trapFocus`) and Dialog (non-modal) use `useDialogLayerOpenState`, which also switches between modes while open.

| Bundle (esbuild, minified, production, React and `@fluentui/*` external) | Minified | Gzip   |
| ------------------------------------------------------------------------ | -------- | ------ |
| `useLayerOpenState`                                                      | 2146 B   | 1049 B |
| `useDialogLayerOpenState`                                                | 2898 B   | 1292 B |
| `useLayerPresence`                                                       | 2036 B   | 1072 B |
| `useLayerOpenState` + `useLayerPresence`                                 | 4007 B   | 1820 B |
| `useDialogLayerOpenState` + `useLayerPresence`                           | 4757 B   | 2056 B |

`useLayerPresence` has no dialog variant: its only dialog code is a check for `dialog.open` and the `close` event, about 50 B gzip.

## `useLayerPresence`

```ts
useLayerPresence(elementRef: React.RefObject<HTMLElement | null>, options: UseLayerPresenceOptions): UseLayerPresenceReturn;
```

| Option           | Type      | Default | Description                                               |
| ---------------- | --------- | ------- | --------------------------------------------------------- |
| `open`           | `boolean` | —       | The open state, usually from the open-state hook.         |
| `unmountOnClose` | `boolean` | `true`  | Unmount after the element closes and exit animations end. |

| Return         | Type                                            | Description                                                                                                             |
| -------------- | ----------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `shouldRender` | `boolean`                                       | Whether to render the element. Stays true while it exits.                                                               |
| `phase`        | `'closed' \| 'entering' \| 'open' \| 'exiting'` | `entering` only while enter animations run; `exiting` until the element has left the top layer and exit animations end. |

It works whether it is declared before or after the open-state hook: it measures animations in a microtask after the commit, once the element has been shown or hidden.

### Example

```tsx
const ref = React.useRef<HTMLDivElement>(null);
const { popover } = useLayerOpenState(ref, {
  open,
  mode: 'auto',
  onOpenChange: nextOpen => setOpen(nextOpen),
});
const { shouldRender } = useLayerPresence(ref, { open });
const { targetRef, containerRef } = usePositioning({ position: 'below' });

<button ref={targetRef} onClick={() => setOpen(!open)} aria-haspopup="menu" aria-expanded={open} />;
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

## Modes

| Mode     | Element                 | Light dismiss | Closes other `auto` popovers | Page inert | Escape                         |
| -------- | ----------------------- | ------------- | ---------------------------- | ---------- | ------------------------------ |
| `auto`   | any, `popover="auto"`   | yes           | yes, except its ancestors    | no         | the browser closes the topmost |
| `hint`   | any, `popover="hint"`   | yes           | no                           | no         | the browser closes it          |
| `manual` | any, `popover="manual"` | no            | no                           | no         | not handled yet                |
| `modal`  | `<dialog>`              | no            | yes                          | yes        | the browser closes it          |

Browsers without `popover="hint"` (Safari ≤ 26.5) treat it as `manual`, so a hint never closes an open `auto` popover. The attribute stays `hint`, so server and client markup match.

## Open and close

- **React owns `open`.** The hooks report what the browser does and never what `open` does.
- **Browser closes are final.** The browser can't cancel a close, so the element stays hidden even if `open` stays true; showing it again would flicker, leave focus outside it and fight other open `auto` popovers. In development, the hook warns when `open` stays true after it reported a browser close. To keep a popover open, use `manual`.
- **Browser opens.** Reported as `native-open`, including `showModal()` or `commandfor` on a closed `modal` dialog in browsers that fire `toggle` on dialogs (Chromium 132+). When uncontrolled, the state follows. When controlled and `open` stays false, the element is hidden again; without `onOpenChange`, the hook warns once in development.
- **Close reason.** The browser doesn't say why a popover closed, so every popover close is `light-dismiss`. A modal close is `escape` if a `cancel` that wasn't prevented came first, otherwise `native-close`.
- **Stale `toggle`.** `toggle` is async. An event whose `newState` no longer matches the element is ignored.
- **Nested dialogs.** `cancel` from a descendant dialog is ignored.

## Lifecycle

- **Exit.** A closing element stays mounted until it has left the top layer (waiting for `toggle` or `close` if it is still shown) and finite animations on the element and its pseudo-elements (`::backdrop`, `::before`, `::after`) end; animations on descendants are not awaited. An element that never opened unmounts right away. Opening adds a render only when enter animations run.
- **Exit styles.** Keep the element displayed and in the top layer while it animates out: `transition: display … allow-discrete, overlay … allow-discrete`, or `display` keyframes. Target the exit with `:not([data-open])`, and handle `prefers-reduced-motion` in CSS.
- **Inert while exiting.** While exit animations run, the element gets `inert` and `aria-hidden="true"`. When the exit ends, both go back to the values they had before, unless React changed them meanwhile (e.g. `aria-hidden={!open}` on a reopen).
- **`popover` attribute changed while open** (e.g. Popover `mode`). The browser hides the element; it is shown again with the new value, and no close is reported.
- **Switching between `modal` and a popover mode while open** (`useDialogLayerOpenState`, e.g. Popover `trapFocus`). The element is closed and shown in the new mode, and no close is reported. The hook sets the `popover` attribute itself if it isn't there yet. Without the Popover API, a `<dialog>` switches between `show()` and `showModal()`.
- **Element replaced or mounted late.** A new element (changed `key`, or rendered after `open` became true) is shown, with `onShow` as on any other open. An exiting element that is replaced or removed finishes its exit.
- **Element rendered only while open.** Listeners attach when it appears.
- **Listeners.** Element listeners only, added once per element and event set. Closed layers that stay mounted (Tooltip, Menu) add no document listeners; `useLayerEscape` with `listen: 'document'` adds one only while open.
- **SSR.** Renders hidden (`popover` attribute or closed `<dialog>`) and is shown in a layout effect after hydration.

## `useLayerEscape`

```ts
const { onKeyDown } = useLayerEscape(elementRef, {
  open,
  onEscape: event => setOpen(false),
  when: 'manual' | 'always',
  listen: 'layer' | 'document',
});
```

| Option   | Type                    | Default    | Description                                                                                                                                                                                     |
| -------- | ----------------------- | ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `when`   | `'manual' \| 'always'`  | `'manual'` | `manual`: only where the browser leaves Escape to the page: `popover="manual"`, `hint` where unsupported (it reads back as `manual`), a `<dialog>` shown with `show()`. `always`: every Escape. |
| `listen` | `'layer' \| 'document'` | `'layer'`  | `layer`: merge the returned `onKeyDown` into the element. `document`: a capture listener on the document while open, for layers that never hold focus.                                          |

- With `listen: 'layer'`, Escape from a popover or dialog nested inside the element is left to that layer (`isEscapeForLayer`). Because it is a React handler, Escape from content portaled out of the element still counts.
- With `listen: 'document'`, the listener runs before any other handler, so the layer closes first, as Escape closes the topmost layer.
- Escape already prevented is ignored. A handled Escape is reported first, so `onEscape` can check `isDefaultPrevented()` for a veto, then prevented and stopped: outer layers' handlers and the browser leave it alone.

## Not covered yet

The hooks leave focus to the browser. Components that need more keep their own code until this helper exists:

- **`useLayerFocus`** (wired through `onBeforeShow`, `onShow`, `onBeforeHide` and `onHide` callbacks on the open-state hook): `initialFocus`, returning focus where the browser doesn't (`manual`, `hint`, light dismiss, a `<dialog>` shown as a popover), and keeping focus on the same control across a mode switch.

Focus on open and Tab order are the browser's:

- `showModal()` focuses `[autofocus]` or the dialog, and `close()` returns focus. Tab can leave a modal through the browser chrome.
- `showPopover()` focuses an `[autofocus]` element and otherwise leaves focus alone. React's `autoFocus` prop runs on mount, before the popover is shown, so it doesn't help.

## Stacking and nesting

- The top layer is ordered by insertion; `z-index` has no effect.
- Elements stay inline, so a popover rendered inside an `auto` popover is nested: opening it keeps the parent open, and Escape and light dismiss close the topmost first. Portals break this.
- Showing a modal closes open `auto` popovers. Content that must sit above a modal, like toasts, has to be shown after it.
- Popovers opened without user activation in between share a close watcher, so one Escape closes them all. Tests need trusted input (`cypress-real-events`).

## Decisions

**React owns `open`.** The hooks report every open and close the browser makes, and none made through `open`. A browser close is final: the element stays closed even if the consumer keeps `open`. Escape on a modal follows the platform: the browser closes it and `onOpenChange` reports it.

**Small hooks, composed.** Open state and presence are separate hooks with no shared state, so a component bundles only what it uses and the declaration order doesn't matter. Dialog support is a separate module behind `useDialogLayerOpenState` for the same reason.

**Internal only.** A public hook would let consumers build overlays without roles, keyboard handling or focus behaviour. Custom overlays compose the components instead; where a component lacks a mode (e.g. `manual` or `hint` on Popover), the component gains it. The hooks can become public later if a case comes up that composition cannot cover. Option shapes can change freely until then.
