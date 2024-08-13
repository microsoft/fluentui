/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { BadgeState, BadgeSlots } from './Badge.types';

export const renderBadge_unstable = (state: BadgeState) => {
  assertSlots<BadgeSlots>(state);

  return (
    <state.root>
      {state.iconPosition === 'before' && state.icon && <state.icon />}
      {state.root.children}
      {state.iconPosition === 'after' && state.icon && <state.icon />}
    </state.root>
  );
};
