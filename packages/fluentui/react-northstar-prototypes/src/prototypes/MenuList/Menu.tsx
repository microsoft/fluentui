import * as React from 'react';
import { MenuContextProvider } from './menuContext';
import { useEventListener } from '@fluentui/react-component-event-listener';

export const Menu = props => {
  const { children, trigger = null, open = false } = props;
  const triggerRef = React.useRef<HTMLDivElement>();
  const menuRef = React.useRef<HTMLDivElement>();

  // Close on ESC
  useEventListener({
    type: 'keydown',
    target: document,
    listener: e => {
      if (e.key === 'Escape') {
        setOpen(false);
      }
    },
  });

  // Close on scroll
  useEventListener({
    type: 'wheel',
    target: document,
    listener: e => {
      setOpen(false);
    },
  });
  useEventListener({
    type: 'touchmove',
    target: document,
    listener: e => {
      setOpen(false);
    },
  });

  const [isOpen, setOpen] = React.useState(open);
  const [currentIndex, setIndex] = React.useState(1);

  return (
    <MenuContextProvider
      value={{
        currentIndex,
        triggerRef: trigger?.current ? trigger : triggerRef,
        setIndex,
        open: isOpen,
        setOpen,
        menuRef,
      }}
    >
      <div
        onBlur={({ relatedTarget }) => {
          if (
            !menuRef.current?.contains(relatedTarget as Node) &&
            !triggerRef.current?.contains(relatedTarget as Node)
          ) {
            setOpen(false);
          }
        }}
      >
        {children}
      </div>
    </MenuContextProvider>
  );
};
