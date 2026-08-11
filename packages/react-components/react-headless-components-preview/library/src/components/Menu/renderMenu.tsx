import * as React from 'react';
import type { JSXElement } from '@fluentui/react-utilities';
import { MenuProvider } from './menuContext';
import type { MenuState, MenuContextValues } from './Menu.types';
import { OverlaySurfaceHost } from '../../overlayRuntime';
import type { MenuStateInternal } from './Menu.internal-types';

export const renderMenu = (state: MenuState, contextValues: MenuContextValues): JSXElement => {
  const { fallbackBehavior } = state as MenuStateInternal;

  return (
    <MenuProvider value={contextValues.menu}>
      {state.menuTrigger}
      {state.menuPopover ? (
        <OverlaySurfaceHost active={state.open} inline={state.inline} mountNode={state.mountNode}>
          {state.menuPopover as React.ReactElement}
        </OverlaySurfaceHost>
      ) : null}
      {fallbackBehavior}
    </MenuProvider>
  );
};
