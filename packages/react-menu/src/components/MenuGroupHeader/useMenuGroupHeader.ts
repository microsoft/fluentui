import * as React from 'react';
import { useMenuGroupContext_unstable } from '../../contexts/menuGroupContext';
import { getNativeElementProps } from '@fluentui/react-utilities';
import { renderMenuGroupHeader_unstable } from './renderMenuGroupHeader';
import { MenuGroupHeaderProps, MenuGroupHeaderState, MenuGroupHeaderRender } from './MenuGroupHeader.types';

/**
 * Given user props, returns state and render function for a MenuGroupHeader.
 */
export function useMenuGroupHeader_unstable(
  props: MenuGroupHeaderProps,
  ref: React.Ref<HTMLElement>,
): [MenuGroupHeaderState, MenuGroupHeaderRender] {
  const { headerId: id } = useMenuGroupContext_unstable();

  const state: MenuGroupHeaderState = {
    components: {
      root: 'div',
    },
    root: getNativeElementProps('div', {
      ref,
      id,
      ...props,
    }),
  };

  return [state, renderMenuGroupHeader_unstable];
}
