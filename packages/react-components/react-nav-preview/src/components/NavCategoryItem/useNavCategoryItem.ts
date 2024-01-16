import * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import { NavCategoryItemProps, NavCategoryItemState } from './NavCategoryItem.types';

/**
 * Create the state required to render NavCategoryItem.
 *
 * The returned state can be modified with hooks such as useNavCategoryItemStyles,
 * before being passed to renderNavCategoryItem.
 *
 * @param props - props from this instance of NavCategoryItem
 * @param ref - reference to root HTMLButtonElement of NavCategoryItem
 */
export const useNavCategoryItem_unstable = (
  props: NavCategoryItemProps,
  ref: React.Ref<HTMLDivElement>,
): NavCategoryItemState => {
  const { content } = props;
  return {
    // TODO add appropriate props/defaults
    components: {
      // TODO add each slot's element type or component
      root: 'div',
      content: 'span',
    },
    root: slot.always(
      getIntrinsicElementProps('div', {
        ref,
        ...props,
      }),
      { elementType: 'div' },
    ),
    content: slot.always(content, {
      defaultProps: { children: props.children },
      elementType: 'span',
    }),
  };
};
