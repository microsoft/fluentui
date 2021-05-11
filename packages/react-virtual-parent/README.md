# @fluentui/react-virtual-parent

**React Virtual Parent components for [Fluent UI React](https://developer.microsoft.com/en-us/fluentui)**

Utilities to set virtual DOM parents for out of order hierarchies.

## Why virtual parents ?

When using popular positioning libraries such as [Popper](https://popper.js.org/), often the [stacking context](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context) can be a problem when you want to nest positioned elements.

```tsx
<div id="popper" style={{ overflow: 'auto' }}>
  Positioned popper
  {/* This popper is going to be clipped by overflow */}
  <div id="nested-popper">Another positioned popper</div>
</div>
```

Apart from `position` or `z-index` hacking, the safest way to make sure your positioned content is not clipped is to do render all positioned content as siblings in DOM

```tsx
<div id="popper" style={{ overflow: 'auto' }}>
  Positioned popper
</div>;

// This popper will still be positioned in the previous one
<div id="nested-popper">Another positioned popper</div>;
```

However with this method `element.contains` no longer works even though we would want it to behave as if the nested popper was a child.

## Usage

```typescript
import { setVirtualParent, elementContains } from '@fluentui/react-virtual-parents';

const parent = document.createElement('div');
const child = document.createElement('div');

setVirtualParent(child, parent);
// This will be true, virtual parents are preferred over actual parents
elementContains(parent, child);
```
