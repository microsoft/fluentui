'use client';

import * as React from 'react';
import { useButtonContext } from '@fluentui/react-headless-components-preview/button';
import { useMenuButton as useMenuButtonBase } from '@fluentui/react-headless-components-preview/menu-button';
import { slot } from '@fluentui/react-utilities';
import type { MenuButtonProps, MenuButtonState } from './MenuButton.types';

export const useMenuButton = (
  props: MenuButtonProps,
  ref: React.Ref<HTMLAnchorElement | HTMLButtonElement>,
): MenuButtonState => {
  const context = useButtonContext();
  const { appearance = 'secondary', menuIcon, shape = 'rounded', size = context.size ?? 'medium', ...rest } = props;
  const state = useMenuButtonBase(rest, ref);

  return {
    ...state,
    menuIcon: slot.optional(menuIcon, {
      defaultProps: {
        children: React.createElement('span', { 'aria-hidden': true, 'data-default-icon': '' }),
      },
      renderByDefault: true,
      elementType: 'span',
    }),
    root: {
      ...state.root,
      'data-appearance': appearance,
      'data-shape': shape,
      'data-size': size,
    },
    appearance,
    shape,
    size,
  };
};
