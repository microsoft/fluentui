import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { MenuGridItemSlots, MenuGridItemState } from './MenuGridItem.types';
import styles from './MenuGridItem.module.css';

export const menuGridItemClassNames: SlotClassNames<MenuGridItemSlots> = {
  root: 'fui-MenuGridItem',
  icon: 'fui-MenuGridItem__icon',
  content: 'fui-MenuGridItem__content',
  subText: 'fui-MenuGridItem__subText',
  firstSubAction: 'fui-MenuGridItem__firstSubAction',
  secondSubAction: 'fui-MenuGridItem__secondSubAction',
};

export const useMenuGridItemStyles_unstable = (state: MenuGridItemState): MenuGridItemState => {
  state.root.className = clsx(menuGridItemClassNames.root, state.root.className);

  if (state.icon) {
    state.icon.className = clsx(menuGridItemClassNames.icon, styles.icon, state.icon.className);
  }

  if (state.content) {
    state.content.className = clsx(menuGridItemClassNames.content, styles.content, state.content.className);
  }

  if (state.subText) {
    state.subText.className = clsx(menuGridItemClassNames.subText, state.subText.className);
  }

  if (state.firstSubAction) {
    state.firstSubAction.className = clsx(
      menuGridItemClassNames.firstSubAction,
      styles.firstSubAction,
      state.firstSubAction.className,
    );
  }
  if (state.secondSubAction) {
    state.secondSubAction.className = clsx(
      menuGridItemClassNames.secondSubAction,
      styles.secondSubAction,
      state.secondSubAction.className,
    );
  }

  return state;
};
