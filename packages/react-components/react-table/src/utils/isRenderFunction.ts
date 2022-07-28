import * as React from 'react';

export function isRenderFunction(children: React.ReactNode): children is (item: unknown) => React.ReactNode {
  if (typeof children === 'function') {
    return true;
  }
  return false;
}
