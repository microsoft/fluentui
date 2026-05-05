/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import type { MenuPopoverSlots, MenuPopoverState } from './MenuPopover.types';

/**
 * Renders MenuPopover inline. The native HTML popover attribute (set via DOM
 * in `useMenuPopover`) lifts the surface to the browser top layer, so no
 * Portal is needed.
 */
export const renderMenuPopover = (state: MenuPopoverState): JSXElement => {
  assertSlots<MenuPopoverSlots>(state);

  return (
    <>
      <state.root />
      {state.safeZone}
    </>
  );
};
