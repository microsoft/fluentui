# @fluentui/react-positioning

A react hook wrapper around [Popper.js](https://popper.js.org/) for Fluent UI.

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
