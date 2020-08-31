import * as React from 'react';
import { useMenuContext } from './useMenu';
import { useEventListener } from '../../../../react-component-event-listener';

export function MenuItem({ children, index, submenu = null }) {
  const { currentIndex, dispatch } = useMenuContext();
  const itemRef = React.useRef<HTMLDivElement>();

  useEventListener({
    type: 'mouseenter',
    targetRef: itemRef,
    listener: e => {
      itemRef.current.focus();
      dispatch({ type: 'SET_INDEX', index });
    },
  });

  return (
    <div
      ref={itemRef}
      role="menuitem"
      data-is-focusable="true"
      tabIndex={0}
      style={{
        cursor: 'pointer',
        ...(currentIndex === index && {
          background: 'grey',
        }),
      }}
    >
      {children}
    </div>
  );
}
