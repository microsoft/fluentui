import * as React from 'react';
import { getIntrinsicElementProps, slot, useEventCallback, mergeCallbacks } from '@fluentui/react-utilities';
import { useNavContext_unstable } from '../NavContext';
import { useNavCategoryContext_unstable } from '../NavCategoryContext';

import type { NavSubItemProps, NavSubItemState } from './NavSubItem.types';

/**
 * Create the state required to render NavSubItem.
 *
 * The returned state can be modified with hooks such as useNavSubItemStyles_unstable,
 * before being passed to renderNavSubItem_unstable.
 *
 * @param props - props from this instance of NavSubItem
 * @param ref - reference to root HTMLButtonElement of NavSubItem
 */
export const useNavSubItem_unstable = (props: NavSubItemProps, ref: React.Ref<HTMLAnchorElement>): NavSubItemState => {
  const { onClick, value: subItemValue } = props;

  const { selectedValue, onRegister, onUnregister, onSelect } = useNavContext_unstable();

  const { value: parentCategoryValue } = useNavCategoryContext_unstable();

  const selected = selectedValue === subItemValue;

  const innerRef = React.useRef<HTMLElement>(null);

  const onNavSubItemClick = useEventCallback(
    mergeCallbacks(onClick, event =>
      onSelect(event, { type: 'click', event, value: subItemValue, categoryValue: parentCategoryValue }),
    ),
  );

  React.useEffect(() => {
    onRegister({
      value: subItemValue,
      ref: innerRef,
    });

    return () => {
      onUnregister({ value: subItemValue, ref: innerRef });
    };
  }, [onRegister, onUnregister, innerRef, subItemValue]);

  return {
    components: {
      root: 'a',
    },
    root: slot.always(
      getIntrinsicElementProps('a', {
        ref,
        role: 'nav',
        type: 'navigation',
        tabIndex: 0, // makes items focusable
        ...props,
        onClick: onNavSubItemClick,
      }),
      { elementType: 'a' },
    ),
    selected,
    value: subItemValue,
  };
};
