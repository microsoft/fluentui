/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { AvatarSlots, AvatarState } from './Avatar.types';

export const renderAvatar_unstable = (state: AvatarState) => {
  assertSlots<AvatarSlots>(state);

  return (
    <state.root>
      {state.initials && <state.initials />}
      {state.icon && <state.icon />}
      {state.image && <state.image />}
      {state.badge && <state.badge />}
      {state.activeAriaLabelElement}
    </state.root>
  );
};
