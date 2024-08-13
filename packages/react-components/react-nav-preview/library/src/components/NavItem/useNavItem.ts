import * as React from 'react';
import { getIntrinsicElementProps, slot, useEventCallback, isHTMLElement } from '@fluentui/react-utilities';
import { useARIAButtonProps } from '@fluentui/react-aria';
import { useNavContext_unstable } from '../NavContext';

import type { ARIAButtonSlotProps } from '@fluentui/react-aria';
import type { NavItemProps, NavItemState } from './NavItem.types';

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
  const { onClick, value, icon, as, href } = props;

  const { selectedValue, onRegister, onUnregister, onSelect, size = 'medium' } = useNavContext_unstable();

  const rootElementType = as || (href ? 'a' : 'button');

  const selected = selectedValue === value;

  const innerRef = React.useRef<HTMLElement>(null);

  const onNavItemClick: ARIAButtonSlotProps<'a'>['onClick'] = useEventCallback(event => {
    onClick?.(event);

    if (!event.defaultPrevented && isHTMLElement(event.target)) {
      onSelect(event, { type: 'click', event, value });
    }
  });

  const root = slot.always<ARIAButtonSlotProps<'a'>>(
    getIntrinsicElementProps(
      rootElementType,
      useARIAButtonProps(rootElementType, {
        'aria-current': selected ? 'page' : 'false',
        role: rootElementType,
        ...props,
      }),
    ),
    {
      elementType: rootElementType,
      defaultProps: {
        ref: ref as React.Ref<HTMLButtonElement & HTMLAnchorElement>,
        type: rootElementType,
      },
    },
  );

  root.onClick = onNavItemClick;

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
    components: { root: rootElementType, icon: 'span' },
    root,
    icon: slot.optional(icon, {
      elementType: 'span',
    }),
    selected,
    value,
    size,
  };
};
