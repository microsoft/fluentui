import * as React from 'react';
import { useMenuContext } from './useMenu';

export function MenuTrigger({ children }) {
  const { triggerRef, setOpen } = useMenuContext();
  return (
    <div
      onMouseEnter={() => {
        setOpen(true);
      }}
      ref={triggerRef}
    >
      {children}
    </div>
  );
}
