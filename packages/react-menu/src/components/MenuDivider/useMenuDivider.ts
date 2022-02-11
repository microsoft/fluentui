import { getNativeElementProps } from '@fluentui/react-utilities';
import * as React from 'react';
import type { MenuDividerProps, MenuDividerState, MenuDividerRender } from './MenuDivider.types';
import { renderMenuDivider_unstable } from './renderMenuDivider';

/**
 * Given user props, returns state and render function for a MenuDivider.
 */
export const useMenuDivider_unstable = (
  props: MenuDividerProps,
  ref: React.Ref<HTMLElement>,
): [MenuDividerState, MenuDividerRender] => {
  const state: MenuDividerState = {
    components: {
      root: 'div',
    },
    root: getNativeElementProps('div', {
      role: 'presentation',
      'aria-hidden': true,
      ...props,
      ref,
    }),
  };

  return [state, renderMenuDivider_unstable];
};
