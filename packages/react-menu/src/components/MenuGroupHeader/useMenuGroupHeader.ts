import * as React from 'react';
import { useMenuGroupContext } from '../../contexts/menuGroupContext';
import { getNativeElementProps } from '@fluentui/react-utilities';
import { MenuGroupHeaderProps, MenuGroupHeaderState } from './MenuGroupHeader.types';

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
