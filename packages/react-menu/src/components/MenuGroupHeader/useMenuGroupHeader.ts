import * as React from 'react';
import { useMenuGroupContext } from '../../contexts/menuGroupContext';
<<<<<<< HEAD
import type { MenuGroupHeaderProps, MenuGroupHeaderState } from './MenuGroupHeader.types';
=======
import { getNativeElementProps } from '@fluentui/react-utilities';
>>>>>>> Updates react-menu to use root as slot

/**
 * Given user props, returns state and render function for a MenuGroupHeader.
 */
export function useMenuGroupHeader(props: MenuGroupHeaderProps, ref: React.Ref<HTMLElement>): MenuGroupHeaderState {
  const { headerId: id } = useMenuGroupContext();

  return {
    root: getNativeElementProps('div', {
      ref,
      id,
      ...props,
    }),
    id,
    ...props,
  };
}
