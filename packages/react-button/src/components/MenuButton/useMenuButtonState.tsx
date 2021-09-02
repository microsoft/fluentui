import * as React from 'react';
import { ChevronDown20Regular, ChevronDown24Regular } from '@fluentui/react-icons';
import { useButtonState } from '../Button/useButtonState';
import type { MenuButtonState } from './MenuButton.types';

export const useMenuButtonState = (state: MenuButtonState): MenuButtonState => {
  // It behaves like a button.
  useButtonState(state);

  const { menuIcon, size } = state;
  if (!menuIcon.children) {
    if (size === 'large') {
      menuIcon.children = <ChevronDown24Regular />;
    } else {
      menuIcon.children = <ChevronDown20Regular />;
    }
  }

  return state;
};
