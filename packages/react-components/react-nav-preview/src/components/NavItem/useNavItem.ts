import * as React from 'react';
import { getIntrinsicElementProps, slot, useEventCallback, mergeCallbacks } from '@fluentui/react-utilities';
import { useNavContext_unstable } from '../NavContext';

import type { NavItemProps, NavItemState } from './NavItem.types';
import { ARIAButtonSlotProps, useARIAButtonProps } from '@fluentui/react-aria';

/**
 * Create the state required to render NavItem.
 *
 * The returned state can be modified with hooks such as useNavItemStyles_unstable,
 * before being passed to renderNavItem_unstable.
 *
 * @param props - props from this instance of NavItem
 * @param ref - reference to root HTMLAnchorElement of NavItem
 */
export const useNavItem_unstable = (
  props: NavItemProps,
  ref: React.Ref<HTMLButtonElement | HTMLAnchorElement>,
): NavItemState => {
  const { onClick, value, icon, as = 'button' } = props;

  const { selectedValue, onRegister, onUnregister, onSelect } = useNavContext_unstable();

  const selected = selectedValue === value;

  const innerRef = React.useRef<HTMLElement>(null);
  const onNavItemClick = useEventCallback(
    mergeCallbacks(onClick as React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>, event =>
      onSelect(event, { type: 'click', event, value }),
    ),
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

  return {
    components: { root: 'button', icon: 'span' },
    root: slot.always<ARIAButtonSlotProps<'a'>>(
      getIntrinsicElementProps(
        as,
        useARIAButtonProps(props.as, {
          ...props,
          onClick: onNavItemClick,
        }),
      ),
      {
        elementType: 'button',
        defaultProps: {
          ref: ref as React.Ref<HTMLButtonElement & HTMLAnchorElement>,
          type: 'button',
        },
      },
    ),
    icon: slot.optional(icon, {
      elementType: 'span',
    }),
    selected,
    value,
  };
};
