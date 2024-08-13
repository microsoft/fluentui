import * as React from 'react';
import { slot } from '@fluentui/react-utilities';
import { Checkmark16Filled } from '@fluentui/react-icons';
import { useMenuListContext_unstable } from '../../contexts/menuListContext';
import { useMenuItem_unstable } from '../MenuItem/useMenuItem';
import type { MenuItemRadioProps, MenuItemRadioState } from './MenuItemRadio.types';
import type { ARIAButtonElement, ARIAButtonElementIntersection } from '@fluentui/react-aria';

/**
 * Given user props, returns state and render function for a MenuItemRadio.
 */
export const useMenuItemRadio_unstable = (
  props: MenuItemRadioProps,
  ref: React.Ref<ARIAButtonElement<'div'>>,
): MenuItemRadioState => {
  const { name, value } = props;

  const checked = useMenuListContext_unstable(context => {
    const checkedItems = context.checkedValues?.[name] || [];
    return checkedItems.indexOf(value) !== -1;
  });

  const selectRadio = useMenuListContext_unstable(context => context.selectRadio);

  return {
    ...useMenuItem_unstable(
      {
        ...props,
        role: 'menuitemradio',
        'aria-checked': checked,
        checkmark: slot.optional(props.checkmark, {
          defaultProps: { children: <Checkmark16Filled /> },
          renderByDefault: true,
          elementType: 'span',
        }),
        onClick: (e: React.MouseEvent<ARIAButtonElementIntersection<'div'>>) => {
          selectRadio?.(e, name, value, checked);
          props.onClick?.(e);
        },
      },
      ref,
    ),
    checked,
    name,
    value,
  };
};
