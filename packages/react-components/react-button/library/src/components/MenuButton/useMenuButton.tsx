'use client';

import * as React from 'react';
import { ChevronDownRegular } from '@fluentui/react-icons';
import { slot } from '@fluentui/react-utilities';
import type { MenuButtonProps, MenuButtonState } from './MenuButton.types';
import { useMenuButtonBase_unstable } from './useMenuButtonBase';
import { useButtonContext } from '../../contexts';

/**
 * Given user props, returns the final state for a MenuButton.
 */
export const useMenuButton_unstable = (
  { menuIcon, ...props }: MenuButtonProps,
  ref: React.Ref<HTMLButtonElement | HTMLAnchorElement>,
): MenuButtonState => {
  'use no memo';

  const { size: contextSize } = useButtonContext();
  const { appearance = 'secondary', shape = 'rounded', size = contextSize ?? 'medium' } = props;

  const state = useMenuButtonBase_unstable(props, ref);

  return {
    ...state,
    appearance,
    shape,
    size,
    menuIcon: slot.optional(menuIcon, {
      defaultProps: {
        children: <ChevronDownRegular />,
      },
      renderByDefault: true,
      elementType: 'span',
    }),
  };
};
