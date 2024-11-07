import * as React from 'react';
import { Drawer, DrawerProps } from '@fluentui/react-drawer';
import { useArrowNavigationGroup } from '@fluentui/react-tabster';
import { slot } from '@fluentui/react-utilities';

import { useNav_unstable } from '../Nav/useNav';
import type { NavDrawerProps, NavDrawerState } from './NavDrawer.types';

/**
 * Create the state required to render NavDrawer.
 *
 * The returned state can be modified with hooks such as useNavDrawerStyles_unstable,
 * before being passed to renderNavDrawer_unstable.
 *
 * @param props - props from this instance of NavDrawer
 * @param ref - reference to root HTMLDivElement of NavDrawer
 */
export const useNavDrawer_unstable = (props: NavDrawerProps, ref: React.Ref<HTMLDivElement>): NavDrawerState => {
  const focusAttributes = useArrowNavigationGroup({
    axis: 'vertical',
    circular: true,
  });

  const navState = useNav_unstable(
    {
      role: 'navigation',
      ...props,
    },
    ref,
  );

  return {
    ...navState,
    components: {
      // TODO: remove once React v18 slot API is modified
      // this is a problem with the lack of support for union types on React v18
      // ComponentState is using React.ComponentType which will try to infer propType
      // propTypes WeakValidator signature will break distributive unions making this type invalid
      root: Drawer as React.FC<DrawerProps>,
    },

    root: slot.always(
      { ref, ...props, ...focusAttributes },
      {
        // TODO: remove once React v18 slot API is modified
        // this is a problem with the lack of support for union types on React v18
        // ComponentState is using React.ComponentType which will try to infer propType
        // propTypes WeakValidator signature will break distributive unions making this type invalid
        elementType: Drawer as React.FC<DrawerProps & React.RefAttributes<HTMLDivElement>>,
      },
    ),
  };
};
