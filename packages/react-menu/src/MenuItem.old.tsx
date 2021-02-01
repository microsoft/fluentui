import * as React from 'react';
import { getAbilityHelpersAttribute, Types } from 'ability-helpers';

export const MenuItem = (props: { children: React.ReactNode }) => {
  const { children } = props;
  const itemRef = React.useRef<HTMLDivElement>(null);

  return (
    <div
      ref={itemRef}
      tabIndex={0}
      role="menuitem"
      {...getAbilityHelpersAttribute({ groupper: { isLimited: Types.GroupperFocusLimits.Limited } })}
    >
      {children}
    </div>
  );
};
