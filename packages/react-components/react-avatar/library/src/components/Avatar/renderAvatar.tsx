/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';

import type { AvatarSlots, AvatarBaseState } from './Avatar.types';

export const renderAvatar_unstable = (state: AvatarBaseState): JSXElement => {
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
