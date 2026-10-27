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
| `useDialogLayerOpenState` | `useLayerOpenState` that also accepts `mode: 'modal'` for a `<dialog>`.                                        |
| `useLayerPresence`        | Whether to render the element, keeping it mounted and inert while it animates out.                             |
| `useLayerFocusReturn`     | Returns focus on close where the browser doesn't. Plugs into the open-state hook through its callbacks.        |
| `useLayerEscape`          | Closes the element on Escape where the browser doesn't, or reports every Escape so the consumer can veto it.   |

`useLayerPresence` and `useLayerEscape` land in #37018, together with their first consumers. This spec describes the whole stack.

No positioning: overlays compose them with `usePositioning`.

The Popover API is required. Without it, or a polyfill, popover layers don't open and the hooks warn in development; a modal `<dialog>` still opens.

The hooks are not exported. Custom overlays should compose `Popover`, `Dialog` and the other components, which bring roles, keyboard handling and focus behaviour; see [Decisions](#decisions).

## `useLayerOpenState` and `useDialogLayerOpenState`

```ts
useLayerOpenState(elementRef: React.RefObject<HTMLElement | null>, options: UseLayerOpenStateOptions<PopoverMode>): UseLayerOpenStateReturn;
useDialogLayerOpenState(elementRef: React.RefObject<HTMLElement | null>, options: UseLayerOpenStateOptions<TopLayerMode>): UseLayerOpenStateReturn;
```

| Option         | Type                                                               | Default | Description                                                                                                                                         |
| -------------- | ------------------------------------------------------------------ | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `open`         | `boolean`                                                          | —       | Controlled. `undefined` keeps the state inside the hook.                                                                                            |
| `defaultOpen`  | `boolean`                                                          | `false` | Initial state when uncontrolled.                                                                                                                    |
| `mode`         | `'auto' \| 'hint' \| 'manual'`, plus `'modal'` for the dialog hook | —       | See [Modes](#modes). `modal` needs a `<dialog>`.                                                                                                    |
| `onOpenChange` | `(open: boolean, data: TopLayerOpenChangeData) => void`            | —       | The browser opened or closed the element. Never called for changes made through `open` or `setOpen`.                                                |
| `onBeforeShow` | `(element: HTMLElement) => void`                                   | —       | Called before the element is shown, once per open and per new element. For a browser open, on its `beforetoggle`, before `[autofocus]` takes focus. |
| `onShow`       | `(element: HTMLElement) => void`                                   | —       | Called after the element is shown, once per show of each element, e.g. to set up content that needs it visible.                                     |
| `onBeforeHide` | `(element: HTMLElement) => void`                                   | —       | Called once per close as it starts: before the hook hides it, or on the browser's `beforetoggle` or `cancel`.                                       |
| `onHide`       | `(element: HTMLElement) => void`                                   | —       | Called once per close after the element left the top layer, whether React or the browser closed it.                                                 |

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

`mode` is a runtime value, so a bundler can't drop the dialog code from a hook that checks it. The dialog code (`showModal()`, the `cancel` and `close` handling) lives in `dialogAdapter.ts`, and only `useDialogLayerOpenState` imports it. Components that never open as a dialog (Tooltip, Menu, Toaster, Listbox) use `useLayerOpenState` and don't bundle it; Popover (`trapFocus`) and Dialog use `useDialogLayerOpenState`.

| Bundle (esbuild, minified, production, React and `@fluentui/*` external) | Minified | Gzip   |
| ------------------------------------------------------------------------ | -------- | ------ |
| `useLayerOpenState`                                                      | 2602 B   | 1198 B |
| `useDialogLayerOpenState`                                                | 3164 B   | 1400 B |
| `useLayerPresence`                                                       | 1888 B   | 1001 B |
| `useLayerOpenState` + `useLayerPresence`                                 | 4317 B   | 1906 B |
| `useDialogLayerOpenState` + `useLayerPresence`                           | 4891 B   | 2096 B |
| `useDialogLayerOpenState` + `useLayerPresence` + `useLayerFocusReturn`   | 5827 B   | 2437 B |

`useLayerPresence` has no dialog variant: its only dialog code is a check for `dialog.open` and the `close` event, about 50 B gzip.

## `useLayerPresence`

Added in #37018.

```ts
useLayerPresence(elementRef: React.RefObject<HTMLElement | null>, options: UseLayerPresenceOptions): UseLayerPresenceReturn;
```

| Option           | Type      | Default | Description                                               |
| ---------------- | --------- | ------- | --------------------------------------------------------- |
| `open`           | `boolean` | —       | The open state, usually from the open-state hook.         |
| `unmountOnClose` | `boolean` | `true`  | Unmount after the element closes and exit animations end. |

| Return         | Type      | Description                                               |
| -------------- | --------- | --------------------------------------------------------- |
| `shouldRender` | `boolean` | Whether to render the element. Stays true while it exits. |

It works whether it is declared before or after the open-state hook. It measures exit animations in a microtask after the commit, once the element has been hidden. On a reopen during the exit it clears `inert` in an insertion effect, before any layout effect shows the element, so focus can move into it. React 17 has no insertion effects; there, declare it before the open-state hook, as the components do.

### Example

A filter panel that opens below its button, closes on Escape or a click outside, and stays mounted while its exit animation runs:

```tsx
import * as React from 'react';
import { useId, useMergedRefs } from '@fluentui/react-utilities';
import { usePositioning } from '../hooks';
import { useLayerOpenState, useLayerPresence } from '../hooks/top-layer';

export const FilterPanel = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = React.useState(false);
  const panelId = useId('filter-panel');

  const layerRef = React.useRef<HTMLDivElement>(null);
  const { popover } = useLayerOpenState(layerRef, {
    open,
    mode: 'auto',
    // Escape, a click outside, or another `auto` popover opening.
    onOpenChange: nextOpen => setOpen(nextOpen),
  });
  const { shouldRender } = useLayerPresence(layerRef, { open });

  const { targetRef, containerRef } = usePositioning({ position: 'below' });
  const panelRef = useMergedRefs(layerRef, containerRef);

  return (
    <>
      <button
        ref={targetRef}
        aria-expanded={open}
        aria-controls={shouldRender ? panelId : undefined}
        onClick={() => setOpen(!open)}
      >
        Filters
      </button>
      {shouldRender && (
        <div
          ref={panelRef}
          id={panelId}
          role="group"
          aria-label="Filters"
          popover={popover}
          data-open={open ? '' : undefined}
        >
          {children}
        </div>
      )}
    </>
  );
};
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
- **Switching between `modal` and a popover mode while open** (`useDialogLayerOpenState`, e.g. Popover `trapFocus`). To `modal`: the popover is hidden and the element is shown again as a modal. From `modal`: it stays modal until it closes, with a dev warning, and opens in the new mode next time. No close is reported either way.
- **Element replaced or mounted late.** A new element (changed `key`, or rendered after `open` became true) is shown, with `onShow` as on any other open. An exiting element that is replaced or removed finishes its exit.
- **Element rendered only while open.** Listeners attach when it appears.
- **Listeners.** Element listeners only, added once per element and event set. Closed layers that stay mounted (Tooltip, Menu) add no document listeners; `useLayerEscape` with `listen: 'document'` adds one only while open.
- **SSR.** Renders hidden (`popover` attribute or closed `<dialog>`) and is shown in a layout effect after hydration.

## `useLayerFocusReturn`

```ts
const focusReturn = useLayerFocusReturn(elementRef, {
  target: RefObject<HTMLElement | null>,
  when: 'inside' | 'always' | false,
});
useDialogLayerOpenState(elementRef, { open, mode, ...focusReturn });
```

It returns `onBeforeShow`, `onBeforeHide` and `onHide`, which the open-state hook calls at fixed points, so the hooks can be declared in any order.

| Option   | Type                             | Default    | Description                                                                                                                                         |
| -------- | -------------------------------- | ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `target` | `RefObject<HTMLElement \| null>` | —          | Where focus goes on close. Without it, the element focused before the layer was shown, followed into open shadow roots.                             |
| `when`   | `'inside' \| 'always' \| false`  | `'inside'` | `inside`: focus was inside as the close started and is now on `<body>` or still inside. `always`: whenever the target is connected. `false`: never. |

- Focus inside is read as the close starts: before the hook hides the element, on `beforetoggle`, or on `cancel`. For a modal `<dialog>` in browsers without `beforetoggle` on dialogs, focus leaving the closed dialog counts as inside.
- Focus goes back once per close, after the element left the top layer, so a browser close (light dismiss, `popovertarget`, `<form method="dialog">`) is covered too. Works inside shadow roots.
- It sits in its own module; Tooltip, Menu, Toaster and Listbox don't bundle it.

## `useLayerEscape`

Added in #37018.

```ts
const { onKeyDown } = useLayerEscape(elementRef, {
  open,
  onEscape: event => setOpen(false),
  when: 'manual' | 'always',
  listen: 'layer' | 'document',
});
```

| Option   | Type                    | Default    | Description                                                                                                                                                      |
| -------- | ----------------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `when`   | `'manual' \| 'always'`  | `'manual'` | `manual`: only where the browser leaves Escape to the page: `popover="manual"` and `hint` where unsupported (it reads back as `manual`). `always`: every Escape. |
| `listen` | `'layer' \| 'document'` | `'layer'`  | `layer`: merge the returned `onKeyDown` into the element. `document`: a capture listener on the document while open, for layers that never hold focus.           |

- With `listen: 'layer'`, Escape from a popover or dialog nested inside the element is left to that layer (`isEscapeForLayer`, which reads the event's composed path, so a layer inside a shadow root counts). Because it is a React handler, Escape from content portaled out of the element still counts.
- With `listen: 'document'`, the listener runs before any other handler, so the layer closes first, as Escape closes the topmost layer. With several such layers open, only the newest handles it. The listener doesn't need the element, so one that mounts after `open` turned true is covered.
- Escape already prevented is ignored. A handled Escape is reported first, so `onEscape` can check `isDefaultPrevented()` for a veto, then prevented and stopped: outer layers' handlers and the browser leave it alone.

## Not covered yet

`initialFocus` (Menu focuses its first item in `onShow`), and keeping focus on the same control across a mode switch.

Focus on open and Tab order are the browser's:

- `showModal()` focuses `[autofocus]` or the dialog, and `close()` returns focus. Tab can leave a modal through the browser chrome.
- `showPopover()` focuses an `[autofocus]` element and otherwise leaves focus alone. React's `autoFocus` prop runs on mount, before the popover is shown, so it doesn't help.

## Consumers

Each component composes the hooks it needs. This is the state after #37019; #36910 moves the components onto the open-state and focus-return hooks, #37018 adds `useLayerPresence` and `useLayerEscape`, and #37019 adds Popover `mode`.

- **Popover / TeachingPopover / InfoLabel.** `useDialogLayerOpenState` with `mode: trapFocus ? 'modal' : mode`, `useLayerPresence`, and `useLayerFocusReturn` with `target: triggerRef`. `useLayerEscape` closes a `manual` surface on Escape. `PopoverTrigger` keeps its own Escape handler for focus on the trigger.
- **Dialog / Drawer.** `useDialogLayerOpenState` with `'modal'`, or `'manual'` when non-modal, and `useLayerPresence`. Browser opens and closes are reported as `surfaceToggle`. `useLayerEscape` with `when: 'always'` reports every Escape as `escapeKeyDown`, skipping Escape from a layer nested inside. As on master, `DialogSurface` blocks the browser closing a modal on Escape so `onOpenChange` can veto, and locks scroll. `useLayerFocusReturn` with `when: 'always'` returns focus to the element focused before a non-modal dialog opened; a modal dialog's `close()` returns it natively.
- **Tooltip.** `useLayerOpenState` with `mode: 'hint'`, `useLayerPresence`, and `useLayerEscape` with `listen: 'document'`, which closes it on Escape where `hint` falls back to `manual`. Stays mounted so `aria-labelledby` / `aria-describedby` resolve.
- **Menu.** `useLayerOpenState` with `mode: 'auto'`. Stays mounted; `onShow` re-applies `focusgroup` and focuses the first enabled item. `useMenu` returns focus. Browser closes are reported as `clickOutside`.
- **Combobox / Dropdown / TagPicker listbox.** `useLayerOpenState` with `mode: 'auto'`. Combobox and Dropdown render the listbox while `shouldRenderListbox` from `useLayerPresence` is true. Focus stays on the trigger.
- **Toaster.** Each toast position is a `manual` popover, shown while it has toasts. Escape on the toaster closes all toasts, unless a layer inside already handled it.

## Changes from master

| PR     | Area                                                        | Master                                                                                                               | Now                                                                        |
| ------ | ----------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| #36910 | Popover kept `open` after a browser dismiss                 | shown again                                                                                                          | stays closed, with a dev warning; use `mode="manual"` to prevent dismissal |
| #36910 | Modal Dialog native close (`<form method="dialog">`)        | closes, not reported, so React state goes out of sync                                                                | closes, reported as `surfaceToggle`                                        |
| #36910 | Native opens (`popovertarget`, `commandfor`, `showModal()`) | non-modal Dialog synced as `surfaceToggle`; Popover unreachable while closed                                         | also modal Dialog, where dialogs fire `toggle` (Chromium 132+)             |
| #37018 | Escape in a layer nested in a `DialogSurface`               | the outer dialog closed too, unless a nested handler called `preventDefault()`; popovers the browser closes never do | only the inner one closes                                                  |
| #37018 | Tooltip Escape where `hint` is unsupported                  | ignored                                                                                                              | closes the tooltip                                                         |
| #37018 | Popover exit                                                | unmounted once the browser reported the close                                                                        | also waits for exit animations, like `DialogSurface`                       |
| #37018 | Exiting Popover and Dialog                                  | —                                                                                                                    | `inert` and `aria-hidden="true"` while exit animations run                 |
| #37018 | Tooltip, Dropdown and Combobox exit                         | unmounted as soon as they closed                                                                                     | wait for exit animations, `inert` while they run                           |
| #37019 | Popover `mode`                                              | always `auto`                                                                                                        | `auto`, `manual` or `hint`; a `manual` surface closes on Escape            |

## Stacking and nesting

- The top layer is ordered by insertion; `z-index` has no effect.
- Elements stay inline, so a popover rendered inside an `auto` popover is nested: opening it keeps the parent open, and Escape and light dismiss close the topmost first. Portals break this.
- Showing a modal closes open `auto` popovers. Content that must sit above a modal, like toasts, has to be shown after it.
- Before Chromium 120, Escape in a popover nested in a modal `<dialog>` goes to the dialog first, so both close.
- Popovers opened without user activation in between share a close watcher, so one Escape closes them all. Tests need trusted input (`cypress-real-events`).

## Decisions

**React owns `open`.** The hooks report every open and close the browser makes, and none made through `open`. A browser close is final: the element stays closed even if the consumer keeps `open`. Escape on a modal follows the platform: the browser closes it and `onOpenChange` reports it.

**Small hooks, composed.** Open state and presence are separate hooks with no shared state, so a component bundles only what it uses and the declaration order doesn't matter. Dialog support is a separate module behind `useDialogLayerOpenState` for the same reason.

**Internal only.** A public hook would let consumers build overlays without roles, keyboard handling or focus behaviour. Custom overlays compose the components instead; where a component lacks a mode (e.g. `manual` or `hint` on Popover), the component gains it. The hooks can become public later if a case comes up that composition cannot cover. Option shapes can change freely until then.
