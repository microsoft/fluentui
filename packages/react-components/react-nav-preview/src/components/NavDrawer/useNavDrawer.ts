import * as React from 'react';
import { InlineDrawer, OverlayDrawer } from '@fluentui/react-drawer';
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
  const { type = 'inline' } = props;
  const focusAttributes = useArrowNavigationGroup({ axis: 'vertical', circular: true });

  const navState = useNav_unstable(
    {
      role: 'navigation',
      ...props,
    },
    ref,
  );

  const elementType = type === 'inline' ? InlineDrawer : OverlayDrawer;

  return {
    ...navState,
    components: {
      root: elementType,
    },
    root: slot.always<NavDrawerProps>(
      slot.resolveShorthand({
        ref,
        ...props,
        ...focusAttributes,
      }),
      {
        elementType,
      },
    ),
  };
};
