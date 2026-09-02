'use client';

import * as React from 'react';
import { slot } from '@fluentui/react-utilities';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { renderNavDrawer, useNavContextValues, useNavDrawer } from '@fluentui/react-headless-components-preview/nav';
import type { NavState } from '@fluentui/react-headless-components-preview/nav';

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
  ({ density = 'medium', ...rest }: NavDrawerProps, ref: React.Ref<HTMLElement>) => {
    const headless = useNavDrawer(rest, ref);
    const styled = useNavDrawerStyles({
      ...headless,
      components: { root: Drawer as NavDrawerState['components']['root'] },
      root: slot.always(headless.root, { elementType: Drawer }),
      size: rest.size,
    });
    // The context helper is typed for a Nav root (`Slot<'div'>`); a NavDrawer root is a Drawer slot,
    // so the two states are structurally incompatible even though every field the helper reads is
    // present. Griffel's own NavDrawer casts at the same seam.
    const contextValues = useNavContextValues(styled as unknown as NavState);

    return renderNavDrawer(styled, { ...contextValues, nav: { ...contextValues.nav, density } });
  },
);

NavDrawer.displayName = 'NavDrawer';
