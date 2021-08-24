import { getNativeElementProps } from '@fluentui/react-utilities';
import * as React from 'react';
import type { MenuDividerProps, MenuDividerState } from './MenuDivider.types';

/**
 * Given user props, returns state and render function for a MenuDivider.
 */
export const useMenuDivider = (props: MenuDividerProps, ref: React.Ref<HTMLElement>): MenuDividerState => {
  return {
    root: getNativeElementProps('div', {
      role: 'presentation',
      'aria-hidden': true,
      ...props,
      ref,
    }),
  };
};
