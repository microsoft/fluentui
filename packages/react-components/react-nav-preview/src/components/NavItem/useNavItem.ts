import * as React from 'react';
import { getIntrinsicElementProps, slot, useEventCallback, mergeCallbacks } from '@fluentui/react-utilities';
import type { NavItemProps, NavItemState } from './NavItem.types';
import { useNavContext_unstable } from '../NavContext';

/**
 * Create the state required to render NavItem.
 *
 * The returned state can be modified with hooks such as useNavItemStyles_unstable,
 * before being passed to renderNavItem_unstable.
 *
 * @param props - props from this instance of NavItem
 * @param ref - reference to root HTMLDivElement of NavItem
 */
export const useNavItem_unstable = (props: NavItemProps, ref: React.Ref<HTMLButtonElement>): NavItemState => {
  const { content, onClick, value } = props;

  const { selectedValue, onRegister, onUnregister, onSelect } = useNavContext_unstable();

  const selected = selectedValue === value;

  const innerRef = React.useRef<HTMLElement>(null);
  const onNavItemClick = useEventCallback(
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
        onClick: onNavItemClick,
      }),
      { elementType: 'button' },
    ),
    content: contentSlot,
    selected,
    value,
  };
};
