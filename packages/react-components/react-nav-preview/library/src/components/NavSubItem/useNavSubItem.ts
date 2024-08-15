import * as React from 'react';
import { getIntrinsicElementProps, slot, useEventCallback, isHTMLElement } from '@fluentui/react-utilities';
import { useARIAButtonProps } from '@fluentui/react-aria';
import { useNavContext_unstable } from '../NavContext';
import { useNavCategoryContext_unstable } from '../NavCategoryContext';

import type { ARIAButtonSlotProps } from '@fluentui/react-aria';
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
export const useNavSubItem_unstable = (
  props: NavSubItemProps,
  ref: React.Ref<HTMLButtonElement | HTMLAnchorElement>,
): NavSubItemState => {
  const { onClick, value: subItemValue, as, href } = props;

  const { selectedValue, onRegister, onUnregister, onSelect, size = 'medium' } = useNavContext_unstable();

  const { value: parentCategoryValue } = useNavCategoryContext_unstable();

  const rootElementType = as || (href ? 'a' : 'button');

  const selected = selectedValue === subItemValue;

  const innerRef = React.useRef<HTMLElement>(null);

  const onNavSubItemClick: ARIAButtonSlotProps<'a'>['onClick'] = useEventCallback(event => {
    onClick?.(event);

    if (!event.defaultPrevented && isHTMLElement(event.target)) {
      onSelect(event, { type: 'click', event, value: subItemValue, categoryValue: parentCategoryValue });
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

  root.onClick = onNavSubItemClick;

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
      root: rootElementType,
    },
    root,
    selected,
    value: subItemValue,
    size,
  };
};
