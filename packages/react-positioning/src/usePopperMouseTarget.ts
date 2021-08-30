import * as React from 'react';
import { createVirtualElementFromClick } from './createVirtualElementFromClick';
import * as PopperJs from '@popperjs/core';

/**
 * A state hook that manages a popper virtual element from mouseevents.
 * Useful for scenarios where a component needs to be positioned by mouse click (e.g. contextmenu)
 * React synthetic events are not persisted by this hook
 *
 * @param initialState - initializes a user provided state similare to useState
 * @returns state and dispatcher for a Popper virtual element that uses native/synthetic mouse events
 */
export const usePopperMouseTarget = (initialState?: PopperJs.VirtualElement | (() => PopperJs.VirtualElement)) => {
  const [virtualElement, setVirtualElement] = React.useState<PopperJs.VirtualElement | undefined>(initialState);

  const setVirtualMouseTarget = (event: React.MouseEvent | MouseEvent | undefined | null) => {
    if (event === undefined || event === null) {
      setVirtualElement(undefined);
      return;
    }

    let mouseevent: MouseEvent;
    if (!(event instanceof MouseEvent)) {
      mouseevent = event.nativeEvent;
    } else {
      mouseevent = event;
    }

    if (!(mouseevent instanceof MouseEvent) && process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.error('usePopperMouseTarget should only be used with MouseEvent');
    }

    const contextTarget = createVirtualElementFromClick(mouseevent);
    setVirtualElement(contextTarget);
  };

  return [virtualElement, setVirtualMouseTarget] as const;
};
