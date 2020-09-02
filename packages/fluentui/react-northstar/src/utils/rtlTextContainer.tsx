import * as React from 'react';

export const rtlTextContainer = {
  getAttributes: ({ condition = true, forElements = [] }: { condition?: boolean; forElements: any[] }) => {
    return condition && forElements.some(child => child && typeof child === 'string') ? { dir: 'auto' } : {};
  },
  createFor: ({ element, condition = true }: { element: any; condition?: boolean }) => {
    if (condition && element && typeof element === 'string') {
      return <span dir="auto">{element}</span>;
    }
    return element;
  },
};
