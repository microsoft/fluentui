# @fluentui/react-positioning

React utilities for positioning elements in the DOM, powered by Fluent UI's positioning engine.

Scroll updates follow the physical ancestors of the target and positioned element, including shadow roots and slot
assignments. Virtual targets can provide a `contextElement` to identify their scroll ancestors. Calling
`positioningRef.current?.updatePosition()` also refreshes shadow-root subscriptions when an existing element has moved
between roots; arrow Popovers and Tooltips do this automatically after each render.

## Usage

```tsx
import * as React from 'react';
import { usePositiniong } from '@fluentui/react-positioning';

const PopupExample: React.FC = ({ children }) => {
  const { targetRef, containerRef } = usePositiniong();
  const [open, setOpen] = React.useState(false);

  const onClick = () => setOpen(s => !s);
  return (
    <>
      <button ref={targetRef} onClick={onClick}>
        Toggle popup
      </button>
      {open && <div ref={containerRef}>{children}</div>}
    </>
  );
};
```
