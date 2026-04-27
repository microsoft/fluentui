# Popover — Headless Spec

## Overview

Popover is an anchored overlay surface that displays transient content (actions, details, confirmations, rich tooltips) next to a trigger element. It composes a trigger (optional if opened programmatically), a surface (the floating content), and an optional arrow. The surface can elevate into the browser's **top layer** via the native HTML Popover API, or render inline in DOM order when `inline={true}`. Placement is computed via the native **CSS Anchor Positioning API** — no JS layout loop.

Popover manages dismissal (click-outside, scroll-outside, Escape, iframe blur), opt-in hover/context interaction, and keeps `data-placement` in sync with the browser's post-flip decision so consumer CSS can style flipped placements. Focus trapping is deferred to a later iteration — the surface is currently a non-modal `role="group"`.

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

| Prop                 | Type                                                        | Default     | Description                                                                                                                  |
| -------------------- | ----------------------------------------------------------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `open`               | `boolean`                                                   | `undefined` | Controlled: whether the surface is visible. Omit for uncontrolled.                                                           |
| `defaultOpen`        | `boolean`                                                   | `false`     | Uncontrolled: initial visibility.                                                                                            |
| `onOpenChange`       | `(e, data: { open: boolean; type: string; event }) => void` | —           | Fires whenever the surface wants to open or close. Always paired with the originating event and its `type` (click/key/etc.). |
| `openOnHover`        | `boolean`                                                   | `false`     | Open on `mouseenter` of the trigger; close on `mouseleave` (with delay).                                                     |
| `mouseLeaveDelay`    | `number` (ms)                                               | `500`       | Delay before closing when hover leaves, giving the user time to move into the surface.                                       |
| `openOnContext`      | `boolean`                                                   | `false`     | Open on the trigger's context-menu event (right-click / Shift+F10). Click and keyboard activation are ignored while on.      |
| `closeOnScroll`      | `boolean`                                                   | `false`     | Close when the user scrolls anywhere outside the trigger + surface.                                                          |
| `closeOnIframeFocus` | `boolean`                                                   | `true`      | Close when focus moves into an external iframe. Internal iframes (inside the surface) don't dismiss.                         |
| `disableAutoFocus`   | `boolean`                                                   | `false`     | Reserved for the upcoming focus-management iteration. Currently inert — the surface no longer auto-focuses on open.          |
| `withArrow`          | `boolean`                                                   | `false`     | Render an arrow element inside the surface. Consumer CSS positions/rotates it using `[data-placement]`.                      |
| `inline`             | `boolean`                                                   | `false`     | Render the surface in DOM order (no top-layer elevation, no `popover="manual"`).                                             |
| `mountNode`          | `HTMLElement \| null`                                       | `null`      | Optional portal target for the surface. When omitted, the surface renders in place (top layer if not `inline`).              |
| `positioning`        | `PositioningShorthand`                                      | `undefined` | Shorthand (`'below-start'`) or object (`{ position, align, offset, ... }`). See [Positioning](#positioning).                 |

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

| State              | Trigger                                                                                         | Behaviour                                                                                                                                                                                                                           | ARIA                                                                                    |
| ------------------ | ----------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| **Closed**         | Initial, or after dismissal                                                                     | Surface unmounted. Trigger has `aria-expanded="false"`, no `data-open`.                                                                                                                                                             | `aria-expanded="false"` on trigger.                                                     |
| **Open**           | `open={true}` / click / keyboard activation / hover / right-click (depending on props)          | Surface mounted. In non-`inline` mode it's promoted into the top layer via `showPopover()` (feature-detected). `data-placement` reflects the requested placement; `usePlacementObserver` overwrites it with the resolved placement. | `aria-expanded="true"`, `data-open` on trigger; `role="group"`, `data-open` on surface. |
| **Hover-held**     | `openOnHover` and pointer inside trigger or surface                                             | Popover stays open while pointer is inside either element; closes `mouseLeaveDelay` ms after it leaves both.                                                                                                                        | Same as Open.                                                                           |
| **Context-pinned** | `openOnContext` + right-click                                                                   | `onOpenChange(e, { type: 'contextmenu', open: true })` with the mouse event; `contextTarget` state stores `{ x, y }`. Click and keyboard activation on the trigger do nothing.                                                      | Same as Open.                                                                           |
| **Dismissing**     | Click-outside / Escape inside surface / scroll-outside (if `closeOnScroll`) / iframe-focus move | `onOpenChange(e, { open: false, type })` fires with the originating DOM event. Consumer decides to close by updating state or letting uncontrolled state flip.                                                                      | `aria-expanded` returns to `"false"` on trigger.                                        |
| **Nested**         | Popover rendered inside another Popover's surface                                               | Each instance manages its own Escape / click-outside. Escape filters via `e.target.closest('[data-popover-surface]') === ownSurface` — no `stopPropagation`, no cross-popover coupling.                                             | Each surface keeps its own `role="group"`.                                              |

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
  data-open={open || undefined}
  // click / keydown / context / hover handlers merged onto the cloned child
/>

// Surface (inline mode)
<div
  role="group"
  data-popover-surface=""
  data-placement="below-start"   // requested placement; live-updated by observer
  data-open="true"
/>

// Surface (top layer mode — non-inline, default)
<div
  popover="manual"
  role="group"
  data-popover-surface=""
  data-placement="below-start"
  data-open="true"
/>
```

### Role selection

The surface always renders as **`role="group"`** in this iteration — a non-modal anchored container suitable for menus, cards, and informational overlays. Modal `role="dialog"` (with `aria-modal="true"`, `aria-haspopup="dialog"` on the trigger, and a focus trap) is planned for a follow-up iteration that re-introduces a focus-management hook. Consumers needing modal semantics today should reach for the `Dialog` headless component instead.

### Focus management

This iteration ships **no built-in focus management**:

- **No auto-focus on open.** The browser handles focus naturally. Top-layer popovers (`popover="manual"`) leave focus on the trigger; consumers can call `.focus()` on the surface or a descendant if needed.
- **No focus trap.** Tab / Shift+Tab follow the document's normal tab order. With a top-layer surface, focus may move to elements behind the surface — that's expected for a non-modal popover.
- **No focus restore.** When the surface unmounts, focus stays wherever the dismissal interaction left it (typically the trigger after click / Escape; arbitrary after click-outside).
- **`disableAutoFocus`** is preserved on `PopoverProps` for API stability but is currently inert. It will become meaningful again together with the upcoming focus hook.

### Labeling

- Labels on a `role="group"` surface are optional but recommended when the surface's purpose isn't obvious from nearby context — e.g., `aria-label` or `aria-labelledby` pointing to a heading inside the surface.
- The trigger's accessible name remains the child element's own name (the component does nothing that would clobber it).

### Live regions

The headless Popover does **not** add `aria-live` to the surface. Consumers rendering dynamic content (loading states, async messages) inside the surface should wrap the dynamic region in their own live region.

## Positioning

Placement is handled entirely by the `usePositioning` hook, which writes native CSS anchor-positioning properties onto the surface element. No JS layout loop.

### Options (all optional)

<<<<<<< HEAD
| Option | Type | Default | Effect |
| ------------------- | ----------------------------------------------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `position` | `'above' \| 'below' \| 'before' \| 'after'` | `'above'` | Which side of the anchor the surface sits on. Physical `top` / `bottom` / `left` / `right` are normalized. |
| `align` | `'start' \| 'center' \| 'end' \| 'top' \| 'bottom'` | `'center'` | Cross-axis alignment. `top` → `start`, `bottom` → `end` (v9 aliases). |
| `offset` | `number \| { mainAxis?: number; crossAxis?: number }` | `0` | Logical-margin offset from the anchor. |
| `fallbackPositions` | `PositioningShorthandValue[]` | `[]` | Custom fallback chain. Each entry is converted to a `<position-area>` value inline in `position-try-fallbacks`. |
| `coverTarget` | `boolean` | `false` | Overlap the anchor instead of sitting beside it. |
| `pinned` | `boolean` | `false` | Disable fallback flipping; surface stays at the requested placement even if it overflows. |
| `matchTargetSize` | `'width'` | — | Sets the surface's `width` to `anchor-size(width)`. |
| `strategy` | `'fixed' \| 'absolute'` | `'absolute'` | CSS `position` property value on the surface. Matches v9's default. Use `'fixed'` when the surface needs to escape transformed / `contain: layout` ancestors for anchoring purposes. |
| `target` | `HTMLElement \| RefObject` | — | Custom anchor element. When set, `anchor-name` is written on this element instead of the trigger. |
| `positioningRef` | `Ref<PositioningImperativeRef>` | — | `{ setTarget(el): void; updatePosition(): void }`. `updatePosition` is a no-op — native positioning self-updates. |
||||||| parent of 4f1eba10dc (docs(react-headless-components-preview): align Popover spec with iteration-1 strip-down)
| Option | Type | Default | Effect |
| ------------------------- | ----------------------------------------------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `position` | `'above' \| 'below' \| 'before' \| 'after'` | `'above'` | Which side of the anchor the surface sits on. Physical `top` / `bottom` / `left` / `right` are normalized. |
| `align` | `'start' \| 'center' \| 'end' \| 'top' \| 'bottom'` | `'center'` | Cross-axis alignment. `top` → `start`, `bottom` → `end` (v9 aliases). |
| `offset` | `number \| { mainAxis?: number; crossAxis?: number }` | `0` | Logical-margin offset from the anchor. |
| `fallbackPositions` | `PositioningShorthandValue[]` | `[]` | Custom fallback chain. Each entry is converted to a `<position-area>` value inline in `position-try-fallbacks`. |
| `coverTarget` | `boolean` | `false` | Overlap the anchor instead of sitting beside it. |
| `pinned` | `boolean` | `false` | Disable fallback flipping; surface stays at the requested placement even if it overflows. |
| `matchTargetSize` | `'width'` | — | Sets the surface's `width` to `anchor-size(width)`. |
| `strategy` | `'fixed' \| 'absolute'` | `'absolute'` | CSS `position` property value on the surface. Matches v9's default. Use `'fixed'` when the surface needs to escape transformed / `contain: layout` ancestors for anchoring purposes. |
| `target` | `HTMLElement \| RefObject` | — | Custom anchor element. When set, `anchor-name` is written on this element instead of the trigger. |
| `positioningRef` | `Ref<PositioningImperativeRef>` | — | `{ setTarget(el): void; updatePosition(): void }`. `updatePosition` is a no-op — native positioning self-updates. |
| `autoSize` | `boolean \| 'width' \| 'height'` | `false` | Cap the surface dimensions against `overflowBoundary`. Requires `overflowBoundary` — pure-CSS autoSize isn't possible due to spec-level restrictions on `anchor()` in `max-*`. |
| `overflowBoundary` | `HTMLElement \| RefObject` | — | Element the surface must stay inside. Drives a JS-measured `transform: translate3d()` **cross-axis shift** whenever the primary placement would exceed the boundary. Accepts a DOM element or a React ref to one. When paired with `autoSize`, the same rect is used to compute `max-*` caps. `overflowBoundaryPadding` adds breathing room on top of the shift. |
| `overflowBoundaryPadding` | `number \| { top, end, bottom, start }` | — | Breathing room kept between the surface and the `overflowBoundary` rect. Implemented as a JS-measured `transform: translate3d()` **cross-axis shift** on the surface (only — main-axis overflow is native flip's job, matching v9 / Floating UI's `shift()` middleware). Does not affect the surface's size. Accepts a uniform number or a logical-side object (RTL-aware). Has no effect when `overflowBoundary` is unset or when `coverTarget` is on. |
=======
| Option | Type | Default | Effect |
| ------------------- | ----------------------------------------------------- | ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `position` | `'above' \| 'below' \| 'before' \| 'after'` | `'above'` | Which side of the anchor the surface sits on. Physical `top` / `bottom` / `left` / `right` are normalized. |
| `align` | `'start' \| 'center' \| 'end' \| 'top' \| 'bottom'` | `'center'` | Cross-axis alignment. `top` → `start`, `bottom` → `end` (v9 aliases). |
| `offset` | `number \| { mainAxis?: number; crossAxis?: number }` | `0` | Logical-margin offset from the anchor. |
| `fallbackPositions` | `PositioningShorthandValue[]` | `[]` | Custom fallback chain. Each entry is converted to a `<position-area>` value inline in `position-try-fallbacks`. |
| `coverTarget` | `boolean` | `false` | Overlap the anchor instead of sitting beside it. |
| `pinned` | `boolean` | `false` | Disable fallback flipping; surface stays at the requested placement even if it overflows. |
| `matchTargetSize` | `'width'` | — | Sets the surface's `width` to `anchor-size(width)`. |
| `strategy` | `'fixed' \| 'absolute'` | `'absolute'` | CSS `position` property value on the surface. Matches v9's default. Use `'fixed'` when the surface needs to escape transformed / `contain: layout` ancestors for anchoring purposes. |
| `target` | `HTMLElement \| RefObject` | — | Custom anchor element. When set, `anchor-name` is written on this element instead of the trigger. |
| `positioningRef` | `Ref<PositioningImperativeRef>` | — | `{ setTarget(el): void; updatePosition(): void }`. `updatePosition` is a no-op — native positioning self-updates. |
| `overflowBoundary` | `HTMLElement \| RefObject` | — | Element the surface must stay inside. Implemented as a JS-measured **clamp**: `useBoundaryClamp` writes logical `max-inline-size` / `max-block-size` on the surface so its far edge cannot extend past the boundary's opposite edge. The surface's start edge stays where CSS anchor positioning placed it; only the far edge is clamped, so content reflows inside the clamped box rather than the surface sliding. |

> > > > > > > 4f1eba10dc (docs(react-headless-components-preview): align Popover spec with iteration-1 strip-down)

### Rendering

- The hook writes `anchor-name: --popover-anchor-<id>` on the anchor (trigger or custom target) via `useIsomorphicLayoutEffect`.
- On the surface it writes `position: absolute` (or `fixed` if `strategy: 'fixed'`); `inset: auto; margin: 0; position-anchor: --popover-anchor-<id>; position-area: <value>; position-try-fallbacks: flip-block, flip-inline, flip-block flip-inline`. The `inset: auto; margin: 0` reset is required because the UA popover stylesheet sets `inset: 0; margin: auto`, which fights `position-area`.
- For center alignment, the hook also writes `place-self: anchor-center` as a workaround for https://crbug.com/438334710 (Chromium <=130 doesn't reliably apply the implicit anchor-center self-alignment to single-keyword `position-area` values).
- `data-placement` is set to the requested placement and then live-updated by `usePlacementObserver` (ResizeObserver + scroll listener) to reflect the browser's post-flip decision.

### Arrow

Arrow positioning is **consumer-owned CSS** keyed off `[data-placement]`. The hook doesn't manipulate the arrow element. Consumers writing arrow styles typically target `[data-placement^='above']`, `[data-placement^='below']`, etc., and use anchor queries (`@container anchored()`) for flip-aware styling when supported.

## Dismissal

All dismissal paths are React-side (not the UA `popover="auto"` light-dismiss), so every `open: false` transition carries the originating event:

| Source                  | Mechanism                                                                                                   |
| ----------------------- | ----------------------------------------------------------------------------------------------------------- |
| Click outside           | `useOnClickOutside` across `triggerRef` + `contentRef`, optionally gated on `closeOnIframeFocus` behaviour. |
| Escape inside surface   | `onKeyDown` on the surface filters to `e.target.closest('[data-popover-surface]') === contentRef.current`.  |
| Scroll outside (opt-in) | `useOnScrollOutside` with `closeOnScroll` or `openOnContext`.                                               |
| Iframe focus (external) | Same mechanism as click-outside; `closeOnIframeFocus` gates the "iframe focus" case.                        |
| Programmatic            | Consumer sets `open={false}` or the uncontrolled state flips via toggleOpen.                                |

`openOnHover` close fires only after `mouseLeaveDelay` ms of pointer being outside both trigger and surface.

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
- **HTML Popover API** (Chromium 114+) — `popover="manual"` + `showPopover()` for top-layer elevation. Feature-detected (`typeof el.showPopover === 'function'`); SSR-safe; `inline={true}` opts out entirely.
- **ResizeObserver** — used sparingly by `usePlacementObserver` (for live `data-placement`)

Firefox and Safari are implementing CSS Anchor Positioning; most features work but flip behaviour is still WIP. `inline={true}` works in every engine.

## Notes

- **Top layer vs inline**: by default the surface is promoted to the top layer via `showPopover()`, which escapes `overflow: hidden` and `z-index` stacking contexts. Set `inline={true}` for scenarios where the surface must stay within a containing block (containerized demos, `contain: layout` ancestors).
- **Nested popovers**: each popover runs its own Escape / click-outside handlers. Escape in a nested surface closes only that surface.
- **Hover-to-open**: `openOnHover` opens on `mouseenter` of the trigger and _stays_ open while the pointer is over the surface (the surface has its own `mouseenter`/`mouseleave` handlers). `mouseLeaveDelay` protects against accidental close during pointer transitions.
- **Context popovers**: when `openOnContext={true}`, the mouse event's `clientX` / `clientY` are stored as `contextTarget` state — available to consumers via the popover context if they want to anchor the surface at the cursor position instead of on the trigger.
- **Positioning is CSS, not JS**: because placement computation is pushed to the browser, there's no JS layout loop and `positioning.updatePosition()` is a no-op. Consumers that need imperative retargeting use `positioning.setTarget(el)`.
