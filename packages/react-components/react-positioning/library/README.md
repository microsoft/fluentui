# @fluentui/react-positioning

A React utilities built on top of an inlined, trimmed-down port of [Floating UI](https://floating-ui.com/) (see `src/floating`) for positioning elements in the DOM.

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
