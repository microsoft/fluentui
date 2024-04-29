import * as React from 'react';
import { useMenuContext } from './menuContext';
import { useEventListener } from '@fluentui/react-component-event-listener';

export function MenuTrigger({ children }) {
  const { triggerRef, setOpen } = useMenuContext();

  const listener = React.useCallback(
    e => {
      if (e.key !== 'ArrowLeft') {
        setOpen(true);
      }
    },
    [setOpen],
  );

  useEventListener({
    type: 'mouseenter',
    targetRef: triggerRef,
    listener,
  });

  useEventListener({
    type: 'keyup',
    targetRef: triggerRef,
    listener,
  });

  return <div ref={triggerRef}>{children}</div>;
}
