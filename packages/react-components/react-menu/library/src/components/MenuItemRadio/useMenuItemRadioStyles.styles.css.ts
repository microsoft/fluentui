'use client';

import { clsx } from 'clsx';
import { useCheckmarkStyles_unstable } from '../../selectable/useCheckmarkStyles.styles.css';
import { useMenuItemStyles_unstable } from '../MenuItem/useMenuItemStyles.styles.css';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { MenuItemSlots } from '../index';
import type { MenuItemRadioState } from './MenuItemRadio.types';
import './MenuItemRadio.module.css';

export const menuItemRadioClassNames: SlotClassNames<Omit<MenuItemSlots, 'submenuIndicator'>> = {
  root: 'fui-MenuItemRadio',
  icon: 'fui-MenuItemRadio__icon',
  checkmark: 'fui-MenuItemRadio__checkmark',
  content: 'fui-MenuItemRadio__content',
  secondaryContent: 'fui-MenuItemRadio__secondaryContent',
  subText: 'fui-MenuItemRadio__subText',
};

export const useMenuItemRadioStyles_unstable = (state: MenuItemRadioState): void => {
  // eslint-disable-next-line react-hooks/immutability
  state.root.className = clsx(menuItemRadioClassNames.root, state.root.className);

  if (state.content) {
    // eslint-disable-next-line react-hooks/immutability
    state.content.className = clsx(menuItemRadioClassNames.content, state.content.className);
  }

  if (state.secondaryContent) {
    // eslint-disable-next-line react-hooks/immutability
    state.secondaryContent.className = clsx(menuItemRadioClassNames.secondaryContent, state.secondaryContent.className);
  }

  if (state.icon) {
    // eslint-disable-next-line react-hooks/immutability
    state.icon.className = clsx(menuItemRadioClassNames.icon, state.icon.className);
  }

  if (state.checkmark) {
    // eslint-disable-next-line react-hooks/immutability
    state.checkmark.className = clsx(menuItemRadioClassNames.checkmark, state.checkmark.className);
  }

  if (state.subText) {
    // eslint-disable-next-line react-hooks/immutability
    state.subText.className = clsx(menuItemRadioClassNames.subText, state.subText.className);
  }

  useMenuItemStyles_unstable(state);
  useCheckmarkStyles_unstable(state);
};
