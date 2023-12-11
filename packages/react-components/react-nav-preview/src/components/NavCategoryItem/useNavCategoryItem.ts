import * as React from 'react';
import { getIntrinsicElementProps, mergeCallbacks, useEventCallback, slot } from '@fluentui/react-utilities';
import { useNavContext_unstable } from '../NavContext';
import { NavCategoryItemProps, NavCategoryItemState } from './NavCategoryItem.types';

/**
 * Create the state required to render NavGroup.
 *
 * The returned state can be modified with hooks such as useNavGroupStyles,
 * before being passed to renderNavGroup.
 *
 * @param props - props from this instance of NavGroup
 * @param ref - reference to root HTMLButtonElement of NavGroup
 */
export const useNavCategoryItem_unstable = (
  props: NavCategoryItemProps,
  ref: React.Ref<HTMLButtonElement>,
): NavCategoryItemState => {
  const { content, onClick, value } = props;

  const { selectedValue, onRegister, onUnregister, onSelect } = useNavContext_unstable();

  const selected = selectedValue === value;

  const innerRef = React.useRef<HTMLElement>(null);
  const onNavCategoryItemClick = useEventCallback(
    mergeCallbacks(onClick, event => onSelect(event, { type: 'click', event, value })),
  );

  React.useEffect(() => {
    onRegister({
      value,
      ref: innerRef,
    });

    return () => {
      onUnregister({ value, ref: innerRef });
    };
  }, [onRegister, onUnregister, innerRef, value]);

  const contentSlot = slot.always(content, {
    defaultProps: { children: props.children },
    elementType: 'span',
  });

  return {
    components: { root: 'button', content: 'span' },
    root: slot.always(
      getIntrinsicElementProps('button', {
        ref,
        role: 'nav',
        type: 'navigation',
        ...props,
        onClick: onNavCategoryItemClick,
      }),
      { elementType: 'button' },
    ),
    content: contentSlot,
    selected,
    value,
  };
};
