/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import * as React from 'react';
import { MotionRefForwarder } from '@fluentui/react-motion';
import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import { MenuProvider } from '../../contexts/menuContext';
import type { InternalMenuSlots, MenuContextValues, MenuState } from './Menu.types';

/**
 * Render the final JSX of Menu
 */
export const renderMenu_unstable = (state: MenuState, contextValues: MenuContextValues): JSXElement => {
  assertSlots<InternalMenuSlots>(state);

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
