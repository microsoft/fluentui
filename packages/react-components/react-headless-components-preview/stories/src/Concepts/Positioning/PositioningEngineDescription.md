Placement is performed by an **engine**. By default that is native CSS anchor positioning, which needs no configuration and adds nothing to your bundle.

CSS anchor positioning cannot express everything the positioning contract offers. It flips between discrete fallback positions rather than sliding, it resolves collisions against the viewport or containing block rather than an element you choose, and it needs a real DOM node to anchor to. When you need one of those behaviours, supply a JavaScript engine:

```tsx
import { usePositioning } from '@fluentui/react-positioning';

<Popover positioning={{ position: 'below', flipBoundary: scrollBox, engine: usePositioning }}>
```

The example above shows `flipBoundary`, which has no CSS anchor equivalent. Both popovers request `below`. The one on the left has viewport space beneath its trigger, so it stays below and overflows the scrolling box. The one on the right treats the box as its flip boundary and flips above to stay inside it.

`flipBoundary` scopes the decision to flip; `overflowBoundary` scopes sliding along an edge, which CSS anchor positioning cannot do at all.

Options that only a JavaScript engine can honour are rejected at compile time unless you supply one, so `positioning={{ flipBoundary: el }}` does not silently do nothing.

### Things to know

- **Pass the engine uncalled.** The component invokes it, with options it has already merged. Configuration a component derives internally — a submenu's placement, a context menu's pointer target — therefore reaches the engine without you restating it.
- **Its identity must be stable**, because it is invoked as a hook. Pass a module-scope import, not an inline function such as `engine={o => usePositioning(o)}`; changing it while the component is mounted fails as a React hook-order error.
- **Nothing is bundled unless you supply it.** No default entry point of this library references a JavaScript positioner, and that is enforced by an automated bundle check rather than convention.
- **Styling keyed on placement keeps working.** `data-placement` is reported the same way under either engine, so arrow and animation styles do not need to change.
- Supplying `@fluentui/react-positioning` means adding it to your own dependencies.

### When you do not need this

Most surfaces do not. `position`, `align`, `offset`, `coverTarget`, `matchTargetSize`, `pinned` and `fallbackPositions` are all handled by the default engine. Reach for an engine when you need collision behaviour the browser cannot express, or a positioning target that is not an element.
