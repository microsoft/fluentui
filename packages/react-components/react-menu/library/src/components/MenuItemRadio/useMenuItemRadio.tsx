'use client';

import * as React from 'react';
import { slot } from '@fluentui/react-utilities';
import { Checkmark16Filled } from '@fluentui/react-icons';
import { useMenuListContext_unstable } from '../../contexts/menuListContext';
import { useMenuItemBase_unstable } from '../MenuItem/useMenuItem';
import type {
  MenuItemRadioBaseProps,
  MenuItemRadioBaseState,
  MenuItemRadioProps,
  MenuItemRadioState,
} from './MenuItemRadio.types';
import type { ARIAButtonElement, ARIAButtonElementIntersection } from '@fluentui/react-aria';

/**
 * Given user props, returns state and render function for a MenuItemRadio.
 */
export const useMenuItemRadio_unstable = (
  props: MenuItemRadioProps,
  ref: React.Ref<ARIAButtonElement<'div'>>,
): MenuItemRadioState => {
  const state = useMenuItemRadioBase_unstable(props, ref);

  // Set default checkmark icon
  if (state.checkmark) {
    state.checkmark.children ??= <Checkmark16Filled />;
  }

  return state;
};

/**
 * Base hook for MenuItemRadio component, produces state required to render the component.
 * It doesn't set any design-related props specific to MenuItemRadio.
 *
 * @internal
 */
export const useMenuItemRadioBase_unstable = (
  props: MenuItemRadioBaseProps,
  ref: React.Ref<ARIAButtonElement<'div'>>,
): MenuItemRadioBaseState => {
  const { name, value } = props;

  const checked = useMenuListContext_unstable(context => {
    const checkedItems = context.checkedValues?.[name] || [];
    return checkedItems.indexOf(value) !== -1;
  });

  const selectRadio = useMenuListContext_unstable(context => context.selectRadio);

  return {
    ...useMenuItemBase_unstable(
      {
        ...props,
        role: 'menuitemradio',
        'aria-checked': checked,
        checkmark: slot.optional(props.checkmark, {
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
