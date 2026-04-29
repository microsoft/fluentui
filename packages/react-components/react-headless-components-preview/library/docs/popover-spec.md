# Popover — Headless Spec

## Overview

Popover is an anchored overlay surface that displays transient content (actions, details, confirmations, rich tooltips) next to a trigger element. It composes a trigger (optional if opened programmatically), a surface (the floating content), and an optional arrow. The surface can elevate into the browser's **top layer** via the native HTML Popover API, or render inline in DOM order when `inline={true}`. Placement is computed via the native **CSS Anchor Positioning API** — no JS layout loop.

Popover lets the browser manage dismissal: the surface is rendered with `popover="auto"`, so Escape, click-outside, and popover-stack peer-dismissal happen at HTML Popover spec timing and are mirrored back into React via the surface's `toggle` event. Open paths (click, hover, context-menu, controlled `open`) flow through React; close paths defer to the browser. Focus trapping is deferred to a later iteration — the surface is currently a non-modal `role="group"`.

## Composition

```
Popover
├── PopoverTrigger (optional — clones a single child, wires events)
└── PopoverSurface
    ├── [arrow] (optional — rendered when withArrow={true})
    └── children / content
```

Popover is a compound component. `PopoverTrigger` is optional — a surface with no trigger can be opened via `defaultOpen`, a controlled `open` prop, or imperatively via `positioning.target` / `positioning.positioningRef.setTarget`.

`PopoverTrigger` takes **exactly one child** and clones it to attach click/keydown/hover/context-menu handlers plus a merged ref.

## Props API

### `Popover`

| Prop              | Type                                                        | Default     | Description                                                                                                                  |
| ----------------- | ----------------------------------------------------------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `open`            | `boolean`                                                   | `undefined` | Controlled: whether the surface is visible. Omit for uncontrolled.                                                           |
| `defaultOpen`     | `boolean`                                                   | `false`     | Uncontrolled: initial visibility.                                                                                            |
| `onOpenChange`    | `(e, data: { open: boolean; type: string; event }) => void` | —           | Fires whenever the surface wants to open or close. Always paired with the originating event and its `type` (click/key/etc.). |
| `openOnHover`     | `boolean`                                                   | `false`     | Open on `mouseenter` of the trigger; close on `mouseleave` (with delay).                                                     |
| `mouseLeaveDelay` | `number` (ms)                                               | `500`       | Delay before closing when hover leaves, giving the user time to move into the surface.                                       |
| `openOnContext`   | `boolean`                                                   | `false`     | Open on the trigger's context-menu event (right-click / Shift+F10). Click and keyboard activation are ignored while on.      |
| `withArrow`       | `boolean`                                                   | `false`     | Render an arrow element inside the surface. Consumer CSS positions/rotates it using `[data-placement]`.                      |
| `inline`          | `boolean`                                                   | `false`     | Render the surface in DOM order (no top-layer elevation, no `popover` attribute, no browser light dismiss).                  |
| `mountNode`       | `HTMLElement \| null`                                       | `null`      | Optional portal target for the surface. When omitted, the surface renders in place (top layer if not `inline`).              |
| `positioning`     | `PositioningShorthand`                                      | `undefined` | Shorthand (`'below-start'`) or object (`{ position, align, offset, ... }`). See [Positioning](#positioning).                 |

### `PopoverTrigger`

| Prop                       | Type           | Default | Description                                                                                        |
| -------------------------- | -------------- | ------- | -------------------------------------------------------------------------------------------------- |
| `children`                 | `ReactElement` | —       | Exactly one child element. Cloned with merged handlers and ref.                                    |
| `disableButtonEnhancement` | `boolean`      | `false` | Skip `useARIAButtonProps` enhancement. Use when the child is already a fully-featured ARIA button. |

### `PopoverSurface`

| Prop       | Type        | Default | Description                                                                                                          |
| ---------- | ----------- | ------- | -------------------------------------------------------------------------------------------------------------------- |
| `tabIndex` | `number`    | —       | Forwarded to the rendered `<div>` so the surface can be focusable when the consumer needs it (e.g. `tabIndex={-1}`). |
| `children` | `ReactNode` | —       | Surface content.                                                                                                     |

## States

| State              | Trigger                                                                                                                                    | Behaviour                                                                                                                                                                                                                           | ARIA                                                                                    |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| **Closed**         | Initial, or after dismissal                                                                                                                | Surface unmounted. Trigger has `aria-expanded="false"`, no `data-open`.                                                                                                                                                             | `aria-expanded="false"` on trigger.                                                     |
| **Open**           | `open={true}` / click / keyboard activation / hover / right-click (depending on props)                                                     | Surface mounted. In non-`inline` mode it's promoted into the top layer via `showPopover()` (feature-detected). `data-placement` reflects the requested placement; `usePlacementObserver` overwrites it with the resolved placement. | `aria-expanded="true"`, `data-open` on trigger; `role="group"`, `data-open` on surface. |
| **Hover-held**     | `openOnHover` and pointer inside trigger or surface                                                                                        | Popover stays open while pointer is inside either element; closes `mouseLeaveDelay` ms after it leaves both.                                                                                                                        | Same as Open.                                                                           |
| **Context-pinned** | `openOnContext` + right-click                                                                                                              | `onOpenChange(e, { type: 'contextmenu', open: true })` with the mouse event; `contextTarget` state stores `{ x, y }`. Click and keyboard activation on the trigger do nothing.                                                      | Same as Open.                                                                           |
| **Dismissing**     | Browser-driven: Escape, click-outside, popover-stack peer dismissal. Plus React-driven hover-leave (`openOnHover`) and programmatic close. | `toggle` event on the surface mirrors the browser's decision into React; `onOpenChange(e, { open: false, type })` fires with the originating event.                                                                                 | `aria-expanded` returns to `"false"` on trigger.                                        |
| **Nested**         | Popover rendered inside another Popover's surface                                                                                          | Each instance manages its own Escape / click-outside. Escape filters via `e.target.closest('[data-popover-surface]') === ownSurface` — no `stopPropagation`, no cross-popover coupling.                                             | Each surface keeps its own `role="group"`.                                              |

## Keyboard Navigation

### On trigger

| Key                              | Action                                                                                                                                   |
| -------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| **Enter / Space**                | Toggle open state. (Provided by `useARIAButtonProps` when the child is not already a button/link; disabled when `openOnContext={true}`.) |
| **Escape**                       | If the surface is open, close it. (Handled on trigger + inside surface — see below.)                                                     |
| **Context-menu key / Shift+F10** | Fires the native `contextmenu` event. When `openOnContext={true}`, opens the popover.                                                    |

### Inside surface

| Key               | Action                                                                                                                                              |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Tab**           | Default browser tab order. The surface does **not** trap focus in this iteration; Tab can move focus out of the surface.                            |
| **Shift + Tab**   | Default browser reverse tab order.                                                                                                                  |
| **Escape**        | Dismiss the current popover. Filtered to the nearest enclosing surface, so Escape in a nested popover only closes that popover — not its ancestors. |
| **Enter / Space** | Default button activation inside the surface.                                                                                                       |

## Events

| Event          | Signature                                                                       | When it fires                                                                                                                                                            |
| -------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `onOpenChange` | `(e: SyntheticEvent \| DOMEvent, data: { event; type; open: boolean }) => void` | Whenever the popover wants to open or close (trigger click, trigger keyboard activation, hover, context menu, Escape, click-outside, scroll-outside, iframe focus move). |

There is no separate `onDismiss`. The `open: false` dispatches go through `onOpenChange` with a `type` that identifies the source (`'click'`, `'keydown'`, `'mouseleave'`, `'contextmenu'`, `'scroll'`, …).

## Accessibility

### ARIA pattern

```tsx
// Trigger
<button
  aria-expanded={open ? 'true' : 'false'}
  aria-haspopup="true"
  aria-details={open ? surfaceId : undefined}
  data-open={open || undefined}
  // click / keydown / context / hover handlers merged onto the cloned child
/>

// Surface (inline mode)
<div
  id={surfaceId}
  role="group"
  data-popover-surface=""
  data-placement="below-start"   // requested placement; live-updated by observer
  data-open="true"
/>

// Surface (top layer mode — non-inline, default)
<div
  id={surfaceId}
  popover="auto"
  role="group"
  data-popover-surface=""
  data-placement="below-start"
  data-open="true"
/>
```

### Trigger ↔ surface ARIA wiring

The HTML Popover spec sets up an **implicit `aria-details` / `aria-expanded` relationship** between an invoker (a button with the `popovertarget` attribute) and its popover. Headless Popover does **not** use `popovertarget` because:

- `popovertarget` is ignored on non-button elements (`<a>`, custom `<div>` triggers, etc.) per the HTML spec, so it cannot serve as the universal wiring path.
- Hover-to-open, context-menu-open, programmatic open, and trigger-less open all require an imperative `showPopover()` call, so the browser's invoker-driven open path is unused for those flows anyway.
- Maintaining two parallel open paths (browser-driven via `popovertarget`, React-driven via `showPopover()`) within a single component would force per-trigger branching and produce inconsistent ARIA across instances.

Instead, the relationship is wired **explicitly** and uniformly:

- `usePopover` generates a stable id via `useId('fui-popover-surface-')` and stores it on context as `surfaceId`.
- `usePopoverSurface` writes `id={surfaceId}` on the surface root **before** spreading `props`, so consumer-supplied `id` still wins (consumers who override `id` opt out of the implicit wiring).
- `usePopoverTrigger` writes `aria-details={surfaceId}` on the cloned trigger **only while `open` is true**, since the surface only mounts while open (`renderPopover.tsx`). When closed, `aria-details` is omitted to avoid pointing at a non-existent element.
- `aria-expanded` is set on every render to reflect `open` (already in place), and `aria-haspopup="true"` is always on.

This matches the behavioural guarantees consumers would get from `popovertarget` (for the ARIA-relationship piece).

### Role selection

The surface always renders as **`role="group"`** in this iteration — a non-modal anchored container suitable for menus, cards, and informational overlays. Modal `role="dialog"` (with `aria-modal="true"`, `aria-haspopup="dialog"` on the trigger, and a focus trap) is planned for a follow-up iteration that re-introduces a focus-management hook. Consumers needing modal semantics today should reach for the `Dialog` headless component instead.

### Focus management

This iteration ships **no built-in focus management**:

- **No auto-focus on open.** Whatever was focused before `open` flipped to `true` remains focused. Consumers who need focus inside the surface (e.g., for menu/dialog-style flows) should call `.focus()` on the desired element themselves, typically in their `onOpenChange` handler or in an effect keyed on the popover's open state.
- **No focus trap.** Tab / Shift+Tab follow the document's normal tab order. With a top-layer surface, focus may move to elements behind the surface — expected for a non-modal popover.

### Auto-focus on open — not currently supported

The previously-reserved `disableAutoFocus` prop has been **removed** from `PopoverProps`. The component does not move focus on open, so an opt-out flag is unnecessary. A future iteration will introduce a focus-management hook covering both auto-focus on open and focus trap; an opt-in/opt-out prop (likely with a different name reflecting the broader semantics) will arrive together with that hook.

### Focus restore on dismiss — native only

The component does **not** supplement the browser's focus restore. What `popover="auto"` provides is what the consumer gets. Per the HTML Popover spec, the `hide popover` algorithm restores focus to a stored `previously focused element` — but that field is set only for the **first popover in the auto stack** (the spec text states: _"This ensures that focus is returned to the previously-focused element only for the first popover in a stack."_), and only when focus is currently inside the dismissing surface, and only when the popover is dismissed via the spec's hide algorithm (Escape close-watcher, click-outside light-dismiss, peer-auto dismissal, an explicit `hidePopover()` call).

### Labeling

- Labels on a `role="group"` surface are optional but recommended when the surface's purpose isn't obvious from nearby context — e.g., `aria-label` or `aria-labelledby` pointing to a heading inside the surface.
- The trigger's accessible name remains the child element's own name (the component does nothing that would clobber it).

### Live regions

The headless Popover does **not** add `aria-live` to the surface. Consumers rendering dynamic content (loading states, async messages) inside the surface should wrap the dynamic region in their own live region.

## Positioning

Placement is handled entirely by the `usePositioning` hook, which writes native CSS anchor-positioning properties onto the surface element. No JS layout loop.

### Options (all optional)

| Option              | Type                                                  | Default      | Effect                                                                                                                                                                               |
| ------------------- | ----------------------------------------------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `position`          | `'above' \| 'below' \| 'before' \| 'after'`           | `'above'`    | Which side of the anchor the surface sits on. Physical `top` / `bottom` / `left` / `right` are normalized.                                                                           |
| `align`             | `'start' \| 'center' \| 'end' \| 'top' \| 'bottom'`   | `'center'`   | Cross-axis alignment. `top` → `start`, `bottom` → `end` (v9 aliases).                                                                                                                |
| `offset`            | `number \| { mainAxis?: number; crossAxis?: number }` | `0`          | Logical-margin offset from the anchor.                                                                                                                                               |
| `fallbackPositions` | `PositioningShorthandValue[]`                         | `[]`         | Custom fallback chain. Each entry is converted to a `<position-area>` value inline in `position-try-fallbacks`.                                                                      |
| `coverTarget`       | `boolean`                                             | `false`      | Overlap the anchor instead of sitting beside it.                                                                                                                                     |
| `pinned`            | `boolean`                                             | `false`      | Disable fallback flipping; surface stays at the requested placement even if it overflows.                                                                                            |
| `matchTargetSize`   | `'width'`                                             | —            | Sets the surface's `width` to `anchor-size(width)`.                                                                                                                                  |
| `strategy`          | `'fixed' \| 'absolute'`                               | `'absolute'` | CSS `position` property value on the surface. Matches v9's default. Use `'fixed'` when the surface needs to escape transformed / `contain: layout` ancestors for anchoring purposes. |
| `target`            | `HTMLElement \| RefObject`                            | —            | Custom anchor element. When set, `anchor-name` is written on this element instead of the trigger.                                                                                    |
| `positioningRef`    | `Ref<PositioningImperativeRef>`                       | —            | `{ setTarget(el): void; updatePosition(): void }`. `updatePosition` is a no-op — native positioning self-updates.                                                                    |

### Rendering

- The hook writes `anchor-name: --popover-anchor-<id>` on the anchor (trigger or custom target) via `useIsomorphicLayoutEffect`.
- On the surface it writes `position: absolute` (or `fixed` if `strategy: 'fixed'`); `inset: auto; margin: 0; position-anchor: --popover-anchor-<id>; position-area: <value>; position-try-fallbacks: flip-block, flip-inline, flip-block flip-inline`. The `inset: auto; margin: 0` reset is required because the UA popover stylesheet sets `inset: 0; margin: auto`, which fights `position-area`.
- For center alignment, the hook also writes `place-self: anchor-center` as a workaround for https://crbug.com/438334710 (Chromium <=130 doesn't reliably apply the implicit anchor-center self-alignment to single-keyword `position-area` values).
- `data-placement` is set to the requested placement and then live-updated by `usePlacementObserver` (ResizeObserver + scroll listener) to reflect the browser's post-flip decision.

### Arrow

Arrow positioning is **consumer-owned CSS** keyed off `[data-placement]`. The hook doesn't manipulate the arrow element. Consumers writing arrow styles typically target `[data-placement^='above']`, `[data-placement^='below']`, etc., and use anchor queries (`@container anchored()`) for flip-aware styling when supported.

## Open / dismiss model

The surface is rendered with `popover="auto"`, so the **browser owns light dismiss**. React only owns _opening_ the surface (and unmounting the JSX once state flips closed); every close path goes through the browser first and is mirrored back into React via the surface's `toggle` event.

### Open paths (React-driven)

| Source                   | Mechanism                                                                                                                                                                                                                                           |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Click trigger            | `PopoverTrigger`'s cloned `onClick` calls `toggleOpen` → `setOpen(true)`.                                                                                                                                                                           |
| Keyboard (Enter / Space) | `useARIAButtonProps` synthesizes a click for non-`<button>` triggers; native buttons activate normally.                                                                                                                                             |
| Hover                    | `openOnHover={true}` → `mouseenter` on trigger or surface calls `setOpen(true)`. Closing waits `mouseLeaveDelay` ms.                                                                                                                                |
| Context menu             | `openOnContext={true}` → `contextmenu` on trigger waits for the trailing right-click events to drain (see [Context-menu open deferral](#context-menu-open-deferral)), then calls `setOpen(true)` and stores the cursor `{x, y}` as `contextTarget`. |
| Programmatic             | Consumer sets `open={true}` or uses `defaultOpen` / `positioningRef.setTarget`.                                                                                                                                                                     |

When `open` flips to `true`, `usePopover` calls `surface.showPopover()` and the surface enters the top layer with `popover="auto"`.

#### Context-menu open deferral

`openOnContext` cannot call `setOpen(true)` synchronously from the `contextmenu` handler. The right-click sequence (`pointerdown` → `contextmenu` → `pointerup` → `auxclick`, plus on some platforms a synthetic `click`) is not finished when `contextmenu` fires. Because the surface is rendered with `popover="auto"` and is opened **imperatively** via `showPopover()` — i.e. without an invoker association (no `popovertarget` attribute on the trigger) — any of the trailing pointer/click events that arrive after `showPopover()` are walked by the browser's light-dismiss algorithm, found not to target the popover or its (non-existent) invoker, and treated as outside-clicks. The browser then fires `toggle({ newState: 'closed' })` and the surface snaps shut immediately after opening.

To avoid this, `PopoverTrigger`'s `onContextMenu` handler:

1. Calls `e.preventDefault()` to suppress the native menu.
2. Registers two one-shot capture-phase listeners on `targetDocument`: `auxclick` and `pointerup`. (`pointerup` is the fallback path for engines that don't dispatch `auxclick` after a preventDefaulted `contextmenu`.)
3. Whichever listener fires first removes the other, then `requestAnimationFrame`s a call to `setOpen(nativeEvent, true)` so the open is committed only after the right-click sequence has fully drained and after one paint frame.
4. If `targetDocument` / its `defaultView` is unavailable (SSR, detached DOM), falls back to a synchronous `setOpen(e, true)`.

A simpler single-`requestAnimationFrame` defer is **insufficient**: the trailing pointer/click events can land in the same task as the React commit + effect, so `showPopover()` ends up running before the sequence finishes. A future iteration that adopts `popovertarget` invoker association on the trigger would let us drop this deferral entirely, since the browser would then recognize the trigger's events as belonging to the popover.

### Dismiss paths (browser-driven, then mirrored)

| Source                                  | Mechanism                                                                                                                                                |
| --------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Escape                                  | Browser dismisses the topmost open popover per the HTML Popover light-dismiss algorithm.                                                                 |
| Click outside                           | Browser dismisses any popover whose ancestor chain doesn't contain the click target.                                                                     |
| Open an unrelated `popover="auto"` peer | Browser dismisses the existing root chain — only one auto-popover root can be open at a time.                                                            |
| Hover-leave (`openOnHover`)             | React-side: `setOpen(false)` after `mouseLeaveDelay` ms with the pointer outside both trigger and surface. `setOpen(false)` unmounts the surface in JSX. |
| Programmatic                            | Consumer sets `open={false}`. React unmounts the surface; the browser implicitly closes the popover when the element leaves the DOM.                     |

`usePopover` attaches a `toggle` listener on the surface (re-attached every time the surface mounts) that mirrors browser-driven dismissal:

```ts
surface.addEventListener('toggle', event => {
  const nextOpen = event.newState === 'open';
  if (nextOpen === open) return;          // skip our own showPopover() echo
  setOpenState(nextOpen);                  // sync React
  onOpenChange(event, { ..., open: nextOpen });
});
```

Without that mirror, browser-initiated closes would silently drift from React state. The early-return on `nextOpen === open` skips the no-op `toggle({ newState: 'open' })` event the browser fires for our own `showPopover()` call.

### Nested popovers

When `<Popover>` is rendered as a JSX descendant of another `<Popover>`'s surface, the inner trigger is a DOM descendant of the outer surface. The browser's popover-stack algorithm treats descendant invokers as **stack ancestors**: opening the inner does **not** dismiss the outer, Escape closes only the topmost popover, and click-outside dismisses the entire chain at once. No special wiring is needed — the JSX nesting is the signal.

### What `popover="auto"` does _not_ give you

- **Multiple unrelated popovers open at once.** Auto enforces a single-root stack. If you need that, the headless package needs another mode (intentionally not shipped).
- **Custom dismiss timing.** Browser light dismiss runs at platform-defined timings; consumers can't intercept individual dismiss reasons. Use the `toggle` listener (via `onOpenChange`) to react to dismissal, not to prevent it.
- **Scroll-to-close.** The HTML Popover spec doesn't dismiss on scroll. Re-introduce in consumer code if needed by listening to scroll and calling `setOpen(false)`.

## Controlled vs uncontrolled

### Uncontrolled

```tsx
<Popover defaultOpen={false} positioning="below-start">
  <PopoverTrigger>
    <button>Open</button>
  </PopoverTrigger>
  <PopoverSurface>…content…</PopoverSurface>
</Popover>
```

### Controlled

```tsx
const [open, setOpen] = React.useState(false);

<Popover open={open} onOpenChange={(_, data) => setOpen(data.open)} positioning={{ position: 'below', align: 'start' }}>
  <PopoverTrigger>
    <button>Open</button>
  </PopoverTrigger>
  <PopoverSurface>…content…</PopoverSurface>
</Popover>;
```

### Without a trigger

```tsx
const triggerRef = React.useRef<HTMLButtonElement>(null);

<>
  <button ref={triggerRef}>External trigger</button>
  <Popover open={open} positioning={{ target: triggerRef }}>
    <PopoverSurface>…</PopoverSurface>
  </Popover>
</>;
```

## RTL support

Positioning uses CSS _logical_ properties throughout (`block-start`, `block-end`, `inline-start`, `inline-end`, `margin-inline-start`, …), so placement semantics flip correctly in RTL:

- `position: 'before'` anchors on the inline-start side — left in LTR, right in RTL.
- `align: 'start'` anchors at the writing-mode start — top in horizontal-tb, left in vertical-rl.
- Physical v9 aliases (`top` / `bottom` / `left` / `right`) are normalized at the shorthand boundary and become logical internally.

## Native API surface

The package relies on three native browser APIs:

- **CSS Anchor Positioning** (Chromium 125+) — `anchor-name`, `position-anchor`, `position-area`, `anchor-size()`, `position-try-fallbacks`.
- **HTML Popover API** (Chromium 114+) — `popover="auto"` + `showPopover()` + the `toggle` event for top-layer elevation, light dismiss, and state mirroring. Feature-detected (`typeof el.showPopover === 'function'`); SSR-safe; `inline={true}` opts out entirely.
- **ResizeObserver** — used sparingly by `usePlacementObserver` (for live `data-placement`)

Firefox and Safari are implementing CSS Anchor Positioning; most features work but flip behaviour is still WIP. `inline={true}` works in every engine.

## Notes

- **Auto mode is the only mode**: the surface always renders with `popover="auto"`, so the browser owns light dismiss and the popover-stack semantics. There is no manual-mode escape hatch — consumers that need React-driven dismiss timing or multiple unrelated popovers open at once should not use this component (or should fork the dismiss layer).
- **Top layer vs inline**: by default the surface is promoted to the top layer via `showPopover()`, which escapes `overflow: hidden` and `z-index` stacking contexts. Set `inline={true}` for scenarios where the surface must stay within a containing block (containerized demos, `contain: layout` ancestors). Inline mode also opts out of the native `popover` attribute, so the browser's light dismiss does _not_ apply.
- **Nested popovers**: nesting is JSX-nesting. The browser's popover-stack treats the inner trigger's DOM descendancy of the outer surface as the ancestor signal — Escape closes only the topmost popover, click-outside dismisses the chain.
- **Hover-to-open**: `openOnHover` opens on `mouseenter` of the trigger and _stays_ open while the pointer is over the surface. Closing waits `mouseLeaveDelay` ms; this is the one close path that is React-driven (it unmounts the surface, which implicitly closes the native popover).
- **Context popovers**: when `openOnContext={true}`, the mouse event's `clientX` / `clientY` are stored as `contextTarget` state — available to consumers via the popover context if they want to anchor the surface at the cursor position instead of on the trigger.
- **Positioning is CSS, not JS**: because placement computation is pushed to the browser, there's no JS layout loop and `positioning.updatePosition()` is a no-op. Consumers that need imperative retargeting use `positioning.setTarget(el)`.
