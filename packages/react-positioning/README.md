# @fluentui/react-positioning

A react hook wrapper around [Popper.js](https://popper.js.org/) for Fluent UI.

These are not production-ready utilities and **should never be used in product**. This space is useful for testing new utilities whose APIs might change before final release.

## Usage

```tsx
import React from 'react';
import { usePopper } from '@fluentui/react-positioning';

function PopupExample: React.FC = ({ children }) => {
  const {targetRef, containerRef} = usePopper();
  const [open, setOpen] = React.useState(false);

  const onClick = () => setOpen(s => !s);
  return (
    <>
      <button ref={targetRef} onClick={onClick}> Toggle popup </button>
      { open && <div ref={containerRef}>{children}</div> }
    </>
  )
}
```
