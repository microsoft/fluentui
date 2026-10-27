import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { MenuGridGroupSlots, MenuGridGroupState } from './MenuGridGroup.types';
import './MenuGridGroup.module.css';

export const menuGridGroupClassNames: SlotClassNames<MenuGridGroupSlots> = {
  root: 'fui-MenuGridGroup',
};

export const useMenuGridGroupStyles_unstable = (state: MenuGridGroupState): MenuGridGroupState => {
  state.root.className = clsx(menuGridGroupClassNames.root, state.root.className);

  return state;
};
