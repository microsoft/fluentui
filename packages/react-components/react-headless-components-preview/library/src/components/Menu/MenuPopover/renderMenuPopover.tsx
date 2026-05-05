/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import type { MenuPopoverSlots, MenuPopoverState } from './MenuPopover.types';

export const renderMenuPopover = (state: MenuPopoverState): JSXElement => {
  assertSlots<MenuPopoverSlots>(state);

  return (
    <>
      <state.root />
      {state.safeZone}
    </>
  );
};
