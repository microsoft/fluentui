# Callout → Popover Migration

## Architecture Change

v8 `Callout` is a standalone component positioned next to a `target` element (ref or DOM node)
and configured via flat props (`directionalHint`, `isBeakVisible`, `gapSpace`).

v9 `Popover` is **composable**: `PopoverTrigger` wraps the element that opens the popover,
and `PopoverSurface` contains the floating content. This eliminates the need for a `target` ref
entirely — the trigger/surface relationship is established by co-location in JSX.

## Before / After Example

### Before

```tsx
import { Callout, DirectionalHint } from '@fluentui/react';

const targetRef = React.useRef<HTMLButtonElement>(null);
const [isVisible, setIsVisible] = React.useState(false);

<>
  <button ref={targetRef} onClick={() => setIsVisible(true)}>
    Open
  </button>
  {isVisible && (
    <Callout
      target={targetRef}
      onDismiss={() => setIsVisible(false)}
      directionalHint={DirectionalHint.bottomLeftEdge}
      isBeakVisible
      gapSpace={8}
    >
      <p style={{ padding: 16 }}>Callout content</p>
    </Callout>
  )}
</>;
```

### After

```tsx
import { Popover, PopoverTrigger, PopoverSurface, Button } from '@fluentui/react-components';

<Popover withArrow positioning="below-start">
  <PopoverTrigger disableButtonEnhancement>
    <Button>Open</Button>
  </PopoverTrigger>
  <PopoverSurface style={{ padding: 16 }}>
    <p>Popover content</p>
  </PopoverSurface>
</Popover>;
```

## Controlled Popover

```tsx
// v9 — controlled open state (equivalent to Callout hidden={!isVisible})
const [open, setOpen] = React.useState(false);

<Popover open={open} onOpenChange={(_, data) => setOpen(data.open)} positioning="below-start">
  <PopoverTrigger disableButtonEnhancement>
    <Button onClick={() => setOpen(true)}>Open</Button>
  </PopoverTrigger>
  <PopoverSurface style={{ padding: 16 }}>
    <p>Content</p>
    <Button onClick={() => setOpen(false)}>Close</Button>
  </PopoverSurface>
</Popover>;
```

**Critical:** `hidden={false}` (visible) in v8 → `open={true}` in v9. The logic is inverted.

## Focus Trap (`setInitialFocus` → `trapFocus`)

```tsx
// v8 — setInitialFocus moves focus into Callout on open
<Callout target={targetRef} setInitialFocus onDismiss={handleClose}>
  <FocusTrapZone>
    <button>Focusable</button>
  </FocusTrapZone>
</Callout>

// v9 — trapFocus moves focus in AND traps it; Escape still dismisses
<Popover trapFocus>
  <PopoverTrigger disableButtonEnhancement>
    <Button>Open</Button>
  </PopoverTrigger>
  <PopoverSurface>
    <button>Focusable</button>
    <Button onClick={() => setOpen(false)}>Close</Button>
  </PopoverSurface>
</Popover>
```

Use `inertTrapFocus` instead of `trapFocus` for a softer accessibility trap (marks background content
with the `inert` attribute but doesn't require an explicit close button for keyboard users):

```tsx
<Popover inertTrapFocus>
```

## Custom Trigger (non-button element)

If the trigger is a custom component, it must forward its `ref` — the same requirement as `Tooltip`.

```tsx
// v9 — custom trigger must forward ref
const MyTrigger = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>((props, ref) => (
  <div ref={ref} role="button" tabIndex={0} {...props} />
));

<Popover>
  <PopoverTrigger disableButtonEnhancement>
    <MyTrigger>Click me</MyTrigger>
  </PopoverTrigger>
  <PopoverSurface>Content</PopoverSurface>
</Popover>;
```

## DirectionalHint → positioning

| v8 `DirectionalHint` | v9 `positioning`  |
| -------------------- | ----------------- |
| `topCenter`          | `"above"`         |
| `topLeftEdge`        | `"above-start"`   |
| `topRightEdge`       | `"above-end"`     |
| `topAutoEdge`        | `"above"`         |
| `bottomCenter`       | `"below"`         |
| `bottomLeftEdge`     | `"below-start"`   |
| `bottomRightEdge`    | `"below-end"`     |
| `bottomAutoEdge`     | `"below"`         |
| `leftCenter`         | `"before"`        |
| `leftTopEdge`        | `"before-top"`    |
| `leftBottomEdge`     | `"before-bottom"` |
| `rightCenter`        | `"after"`         |
| `rightTopEdge`       | `"after-top"`     |
| `rightBottomEdge`    | `"after-bottom"`  |

For `gapSpace`, pass positioning as an object:

```tsx
// v8
<Callout directionalHint={DirectionalHint.bottomLeftEdge} gapSpace={8} />

// v9
<Popover positioning={{ position: 'below', align: 'start', offset: { mainAxis: 8 } }}>
```

## ICalloutProps → PopoverProps

| v8                       | v9                                       | Notes                                                          |
| ------------------------ | ---------------------------------------- | -------------------------------------------------------------- |
| `target`                 | `<PopoverTrigger>` child                 | Replaces ref-based targeting; trigger is co-located in JSX     |
| `hidden`                 | `open` (inverted)                        | `hidden={false}` = `open={true}`                               |
| `onDismiss`              | `onOpenChange`                           | `(ev, data) => data.open === false` on close                   |
| `directionalHint`        | `positioning`                            | String or object; see table above                              |
| `gapSpace`               | `positioning={{ offset: { mainAxis } }}` | Pass positioning as object with `offset`                       |
| `isBeakVisible`          | `withArrow`                              |                                                                |
| `beakWidth`              | —                                        | Removed                                                        |
| `setInitialFocus`        | `trapFocus`                              | Also traps focus; use `inertTrapFocus` for softer trap         |
| `calloutMaxHeight`       | `style` on `<PopoverSurface>`            | `<PopoverSurface style={{ maxHeight: '...' }}>`                |
| `calloutMaxWidth`        | `style` on `<PopoverSurface>`            | `<PopoverSurface style={{ maxWidth: '...' }}>`                 |
| `preventDismissOnScroll` | `closeOnScroll={false}`                  | Inverted logic — v9 default is `closeOnScroll={false}`         |
| `coverTarget`            | —                                        | No direct equivalent                                           |
| `doNotLayer`             | `mountNode` prop                         | Pass a DOM node to render outside the default portal container |
| `styles`                 | `className` on `<PopoverSurface>`        |                                                                |
| `theme`                  | `FluentProvider`                         |                                                                |
| `componentRef`           | `ref` on `<PopoverSurface>`              |                                                                |
| —                        | `trapFocus`                              | New — moves focus in and traps it                              |
| —                        | `inertTrapFocus`                         | New — softer focus trap via `inert` attribute                  |
