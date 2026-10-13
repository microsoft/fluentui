# @fluentui/react-positioning

React utilities for positioning elements in the DOM. The position is computed following the rules of CSS anchor positioning (`position-area`, `position-try-fallbacks`), in JavaScript.

Pinned elements preserve the requested placement and offset without flipping or shifting into the viewport.
Oversized popups remain beside their target rather than covering it. Visibility checks respect the target's
containing block, so fixed-position targets are not clipped by unrelated scrolling ancestors.

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
