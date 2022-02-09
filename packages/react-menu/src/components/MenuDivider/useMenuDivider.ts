import { getNativeElementProps } from '@fluentui/react-utilities';
import * as React from 'react';
import type { MenuDividerProps, MenuDividerState } from './MenuDivider.types';

/**
 * Given user props, returns state and render function for a MenuDivider.
 */
export const useMenuDivider_unstable = (props: MenuDividerProps, ref: React.Ref<HTMLElement>): MenuDividerState => {
  return {
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
};
