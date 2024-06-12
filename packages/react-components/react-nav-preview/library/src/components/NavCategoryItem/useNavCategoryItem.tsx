import * as React from 'react';
import { getIntrinsicElementProps, mergeCallbacks, slot, useEventCallback } from '@fluentui/react-utilities';
import { ChevronRight20Regular } from '@fluentui/react-icons';
import { NavCategoryItemProps, NavCategoryItemState } from './NavCategoryItem.types';
import { useNavCategoryContext_unstable } from '../NavCategoryContext';
import { useNavContext_unstable } from '../NavContext';

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
  ref: React.Ref<HTMLButtonElement>,
): NavCategoryItemState => {
  const { onClick, expandIcon, icon } = props;

  const { open, value } = useNavCategoryContext_unstable();

  const { onRequestNavCategoryItemToggle, selectedCategoryValue, size = 'medium' } = useNavContext_unstable();

  const onNavCategoryItemClick = useEventCallback(
    mergeCallbacks(onClick, event => onRequestNavCategoryItemToggle(event, { type: 'click', event, value })),
  );

  const selected = selectedCategoryValue === value;
  // there's more than 2 possible values for aria-current, but this is the only one that's used in this component
  const validAriaCurrent: 'page' | 'false' = selected && !open ? 'page' : 'false';

  return {
    open,
    value,
    selected,
    components: {
      root: 'button',
      icon: 'span',
      expandIcon: 'span',
    },
    root: slot.always(
      getIntrinsicElementProps('button', {
        ref,
        'aria-current': validAriaCurrent,
        ...props,
        onClick: onNavCategoryItemClick,
      }),
      { elementType: 'button' },
    ),
    expandIcon: slot.always(expandIcon, {
      defaultProps: {
        children: <ChevronRight20Regular />,
        'aria-hidden': true,
      },
      elementType: 'span',
    }),
    icon: slot.optional(icon, {
      elementType: 'span',
    }),
    size,
  };
};
