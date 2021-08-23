import * as React from 'react';
import { useMenuGroupContext } from '../../contexts/menuGroupContext';
import type { MenuGroupHeaderProps, MenuGroupHeaderState } from './MenuGroupHeader.types';

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
