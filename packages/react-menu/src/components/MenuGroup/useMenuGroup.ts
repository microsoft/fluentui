import * as React from 'react';
import { getNativeElementProps, useId } from '@fluentui/react-utilities';
import { MenuGroupProps, MenuGroupState, MenuGroupRender, MenuGroupContextValues } from './MenuGroup.types';
import { renderMenuGroup_unstable } from './renderMenuGroup';
import { useMenuGroupContextValues_unstable } from './useMenuGroupContextValues';

/**
 * Given user props, returns state and render function for a MenuGroup.
 */
export function useMenuGroup_unstable(
  props: MenuGroupProps,
  ref: React.Ref<HTMLElement>,
): [MenuGroupState, MenuGroupRender, MenuGroupContextValues] {
  const headerId = useId('menu-group');

  const state: MenuGroupState = {
    components: {
      root: 'div',
    },
    root: getNativeElementProps('div', {
      ref,
      'aria-labelledby': headerId,
      role: 'group',
      ...props,
    }),
    headerId: headerId,
  };

  const contextValues = useMenuGroupContextValues_unstable(state);

  return [state, renderMenuGroup_unstable, contextValues];
}
