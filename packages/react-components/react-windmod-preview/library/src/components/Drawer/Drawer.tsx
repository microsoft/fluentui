'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { renderDrawer, useDrawer } from '@fluentui/react-headless-components-preview/drawer';

import { InlineDrawer } from '../InlineDrawer/InlineDrawer';
import { OverlayDrawer } from '../OverlayDrawer/OverlayDrawer';
import type { DrawerProps, DrawerState } from './Drawer.types';
import { useDrawerStyles } from './useDrawerStyles';

/**
 * A Drawer holds supplementary content for a complex creation, edit or management experience, as
 * either an overlay surface or an inline panel. Windmod Drawer: the headless type switch pointed at
 * the styled drawers, since the headless one selects its unstyled pair.
 */
export const Drawer: ForwardRefComponent<DrawerProps> = React.forwardRef((props, ref) => {
  const state = useDrawer(props, ref);
  const styled = useDrawerStyles({
    ...state,
    components: {
      root: (props.type === 'inline' ? InlineDrawer : OverlayDrawer) as DrawerState['components']['root'],
    },
  });

  return renderDrawer(styled);
});

Drawer.displayName = 'Drawer';
