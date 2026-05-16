import { renderNavSubItem_unstable } from '@fluentui/react-nav';
import type { NavSubItemState } from './NavSubItem.types';

export const renderNavSubItem = (state: NavSubItemState) =>
  renderNavSubItem_unstable(state as unknown as Parameters<typeof renderNavSubItem_unstable>[0]);
