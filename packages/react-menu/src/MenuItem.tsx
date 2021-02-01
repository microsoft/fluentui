import * as React from 'react';
import { useMenuListContext } from './menuListContext';

export const MenuItem = (props: { children: React.ReactNode; index: number }) => {
  const { children, index } = props;
  const itemRef = React.useRef<HTMLDivElement>(null);
  const { currentIndex, setIndex } = useMenuListContext();

  React.useEffect(() => {
    if (index === currentIndex) {
      itemRef.current?.focus();
    }
  }, [index, currentIndex]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        setIndex(currentIndex + 1);
        break;
      case 'ArrowUp':
        setIndex(currentIndex - 1);
        break;
    }
  };

  return (
    <div
      onKeyDown={onKeyDown}
      ref={itemRef}
      role="menuitem"
      data-is-focusable="true"
      tabIndex={0}
      style={{
        cursor: 'pointer',
        width: 80,
        ...(currentIndex === index && {
          background: 'grey',
        }),
      }}
    >
      {children}
    </div>
  );
};
