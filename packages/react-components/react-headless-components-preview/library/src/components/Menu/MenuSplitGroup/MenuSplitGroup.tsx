'use client';

import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useMenuSplitGroup } from './useMenuSplitGroup';
import { useMenuSplitGroupContextValues } from './useMenuSplitGroupContextValues';
import { renderMenuSplitGroup } from './renderMenuSplitGroup';
import type { MenuSplitGroupProps } from '@fluentui/react-menu';
import { composeComponent } from '../../../utils/composeComponent';

export const MenuSplitGroup: ForwardRefComponent<MenuSplitGroupProps> = /*#__PURE__*/ composeComponent(
  'MenuSplitGroup',
  useMenuSplitGroup,
  renderMenuSplitGroup,
  useMenuSplitGroupContextValues,
);
