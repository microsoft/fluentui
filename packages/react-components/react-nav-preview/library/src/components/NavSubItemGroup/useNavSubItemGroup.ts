import * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import type { NavSubItemGroupProps, NavSubItemGroupState } from './NavSubItemGroup.types';
import { useNavCategoryContext_unstable } from '../NavCategoryContext';

/**
 * Create the state required to render NavSubItemGroup.
 *
 * The returned state can be modified with hooks such as useNavSubItemGroupStyles_unstable,
 * before being passed to renderNavSubItemGroup_unstable.
 *
 * @param props - props from this instance of NavSubItemGroup
 * @param ref - reference to root HTMLDivElement of NavSubItemGroup
 */
export const useNavSubItemGroup_unstable = (
  props: NavSubItemGroupProps,
  ref: React.Ref<HTMLDivElement>,
): NavSubItemGroupState => {
  const { open } = useNavCategoryContext_unstable();

  // copied over from accordion. todo - figure out how to handle.
  // const focusableProps = useTabsterAttributes({ focusable: { excludeFromMover: true } });
  // const navigation = useAccordionContext_unstable(ctx => ctx.navigation);

  return {
    open,
    components: {
      root: 'div',
    },
    root: slot.always(
      getIntrinsicElementProps('div', {
        ...props,
        ref,
      }),
      { elementType: 'div' },
    ),
  };
};
