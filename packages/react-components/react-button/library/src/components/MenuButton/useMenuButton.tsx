'use client';

import * as React from 'react';
import { ChevronDownRegular } from '@fluentui/react-icons';
import type { MenuButtonProps, MenuButtonState } from './MenuButton.types';
import { useButtonContext } from '../../contexts';
import { useMenuButtonBase_unstable } from './useMenuButtonBase';

/**
 * Given user props, returns the final state for a MenuButton.
 */
export const useMenuButton_unstable = (
  props: MenuButtonProps,
  ref: React.Ref<HTMLButtonElement | HTMLAnchorElement>,
): MenuButtonState => {
  'use no memo';

  const { size: contextSize } = useButtonContext();
  const { appearance = 'secondary', shape = 'rounded', size = contextSize ?? 'medium' } = props;
  const state = useMenuButtonBase_unstable(props, ref);

  return {
    appearance,
    size,
    shape,
    ...state,
    menuIcon: {
      children: <ChevronDownRegular />,
      ...state.menuIcon
    },
  };
};
