import * as React from 'react';
import { useMenuGroupContext_unstable } from '../../contexts/menuGroupContext';
import { getNativeElementProps } from '@fluentui/react-utilities';
import { MenuGroupHeaderProps, MenuGroupHeaderState } from './MenuGroupHeader.types';

/**
 * Given user props, returns state and render function for a MenuGroupHeader.
 */
export function useMenuGroupHeader_unstable(
  props: MenuGroupHeaderProps,
  ref: React.Ref<HTMLElement>,
): MenuGroupHeaderState {
  const { headerId: id } = useMenuGroupContext_unstable();

  return {
    components: {
      root: 'div',
    },
    root: getNativeElementProps('div', {
      ref,
      id,
      ...props,
    }),
  };
}
