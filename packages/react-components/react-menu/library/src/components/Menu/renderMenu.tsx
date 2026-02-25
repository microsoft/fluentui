/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import * as React from 'react';
import { MotionRefForwarder } from '@fluentui/react-motion';
import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import { MenuProvider } from '../../contexts/menuContext';
import type { MenuContextValues, MenuSlots, MenuState } from './Menu.types';

/**
 * Render the final JSX of Menu
 */
export const renderMenu_unstable = (state: MenuState, contextValues: MenuContextValues): JSXElement => {
  // assertSlots is a no-op here (MenuSlots is empty), but is required to satisfy the
  // @nx/workspace-no-missing-jsx-pragma lint rule that checks for assertSlots when the JSX pragma is present.
  // The @fluentui/react-jsx-runtime pragma is needed because <state.surfaceMotion> is a SlotComponentType
  // created by presenceMotionSlot() which requires the custom JSX runtime to resolve SLOT_ELEMENT_TYPE_SYMBOL.
  assertSlots<MenuSlots>(state);

  return (
    <MenuProvider value={contextValues.menu}>
      {state.menuTrigger}
      {state.menuPopover && (
        <state.surfaceMotion>
          <MotionRefForwarder>{state.menuPopover as React.ReactElement}</MotionRefForwarder>
        </state.surfaceMotion>
      )}
    </MenuProvider>
  );
};
