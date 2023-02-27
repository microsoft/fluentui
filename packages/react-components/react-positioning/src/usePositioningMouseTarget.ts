import * as React from 'react';
import { createVirtualElementFromClick } from './createVirtualElementFromClick';
import { PositioningVirtualElement, SetVirtualMouseTarget } from './types';

/**
 * @internal
 * A state hook that manages a popper virtual element from mouseevents.
 * Useful for scenarios where a component needs to be positioned by mouse click (e.g. contextmenu)
 * React synthetic events are not persisted by this hook
 *
 * @param initialState - initializes a user provided state similare to useState
 * @returns state and dispatcher for a Popper virtual element that uses native/synthetic mouse events
 */
export const usePositioningMouseTarget = (
  initialState?: PositioningVirtualElement | (() => PositioningVirtualElement),
) => {
  const [virtualElement, setVirtualElement] = React.useState<PositioningVirtualElement | undefined>(initialState);

  const setVirtualMouseTarget: SetVirtualMouseTarget = event => {
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
      console.error('usePositioningMouseTarget should only be used with MouseEvent');
    }

    const contextTarget = createVirtualElementFromClick(mouseevent);
    setVirtualElement(contextTarget);
  };

  return [virtualElement, setVirtualMouseTarget] as const;
};
