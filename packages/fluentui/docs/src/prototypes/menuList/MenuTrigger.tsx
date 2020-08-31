import * as React from 'react';
import { useMenuContext } from './useMenu';

export function MenuTrigger({ children }) {
  const { triggerRef } = useMenuContext();
  return <div ref={triggerRef}>{children}</div>;
}
