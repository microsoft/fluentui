import * as React from 'react';
import { MenuDividerProps, MenuDividerState } from './MenuDivider.types';

/**
 * Given user props, returns state and render function for a MenuDivider.
 */
export const useMenuDivider = (props: MenuDividerProps, ref: React.Ref<HTMLElement>): MenuDividerState => {
  return {
    ref,
    role: 'presentation',
    'aria-hidden': true,
    ...props,
  };
};
