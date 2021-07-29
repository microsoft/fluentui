import * as React from 'react';
import { MenuGroupHeaderProps, MenuGroupHeaderState } from './MenuGroupHeader.types';
import { useMenuGroupContext } from '../../contexts/menuGroupContext';

/**
 * Given user props, returns state and render function for a MenuGroupHeader.
 */
export function useMenuGroupHeader(props: MenuGroupHeaderProps, ref: React.Ref<HTMLElement>): MenuGroupHeaderState {
  const { headerId: id } = useMenuGroupContext();

  return {
    ref,
    id,
    ...props,
  };
}
