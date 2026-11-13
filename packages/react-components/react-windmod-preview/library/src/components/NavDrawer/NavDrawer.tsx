'use client';

import * as React from 'react';
import { slot } from '@fluentui/react-utilities';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { renderNavDrawer, useNavContextValues, useNavDrawer } from '@fluentui/react-headless-components-preview/nav';

import { Drawer } from '../Drawer/Drawer';
import type { NavDrawerProps, NavDrawerState } from './NavDrawer.types';
import { useNavDrawerStyles } from './useNavDrawerStyles';

/**
 * A NavDrawer is a Nav rendered on a Drawer surface. Windmod NavDrawer: the headless nav drawer
 * decorated with the Fluent visual contract (Tailwind v4 + CSS Modules).
 *
 * The root slot is re-bound to the styled Drawer. The renderer draws `state.root` directly and the
 * JSX runtime resolves its element type from the slot object; `components.root` is read only by the
 * development-time slot assertion, so both have to be moved for a production build to be styled.
 */
export const NavDrawer: ForwardRefComponent<NavDrawerProps> = React.forwardRef(
  ({ density = 'medium', ...rest }, ref) => {
    const headless = useNavDrawer(rest, ref);
    const styled = useNavDrawerStyles({
      ...headless,
      components: { root: Drawer as NavDrawerState['components']['root'] },
      root: slot.always(headless.root, { elementType: Drawer }),
      size: rest.size,
    });
    const contextValues = useNavContextValues(styled);

    return renderNavDrawer(styled, { ...contextValues, nav: { ...contextValues.nav, density } });
  },
);

NavDrawer.displayName = 'NavDrawer';
