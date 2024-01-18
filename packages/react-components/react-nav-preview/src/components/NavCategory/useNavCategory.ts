import * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import type { NavCategoryProps, NavCategoryState } from './NavCategory.types';

/**
 * Create the state required to render NavCategory.
 *
 * The returned state can be modified with hooks such as useNavCategoryStyles_unstable,
 * before being passed to renderNavCategory_unstable.
 *
 * @param props - props from this instance of NavCategory
 * @param ref - reference to root HTMLDivElement of NavCategory
 */
export const useNavCategory_unstable = (props: NavCategoryProps, ref: React.Ref<HTMLDivElement>): NavCategoryState => {
  return {
    // TODO add appropriate props/defaults
    components: {
      // TODO add each slot's element type or component
      root: 'div',
    },
    // TODO add appropriate slots, for example:
    // mySlot: resolveShorthand(props.mySlot),
    root: slot.always(
      getIntrinsicElementProps('div', {
        ref,
        ...props,
      }),
      { elementType: 'div' },
    ),
  };
};
