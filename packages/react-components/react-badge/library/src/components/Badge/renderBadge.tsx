/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';

import type { BadgeBaseState, BadgeSlots } from './Badge.types';

export const renderBadge_unstable = (state: BadgeBaseState): JSXElement => {
  assertSlots<BadgeSlots>(state);

  return (
    <state.root>
      {state.iconPosition === 'before' && state.icon && <state.icon />}
      {state.root.children}
      {state.iconPosition === 'after' && state.icon && <state.icon />}
    </state.root>
  );
};
