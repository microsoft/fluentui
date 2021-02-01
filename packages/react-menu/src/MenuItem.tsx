import * as React from 'react';
import { getAbilityHelpersAttribute, Types } from 'ability-helpers';
import { useMenuListContext } from './menuListContext';

export const MenuItem = (props: { children: React.ReactNode; index: number }) => {
  const { children } = props;
  const itemRef = React.useRef<HTMLDivElement>(null);
  const { currentIndex, setIndex } = useMenuListContext();

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
      {...getAbilityHelpersAttribute({ groupper: { isLimited: Types.GroupperFocusLimits.LimitedTrapFocus } })}
    >
      {children}
    </div>
  );
};
