'use client';

import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { TabListProps } from './TabList.types';
import { useTabList } from './useTabList';
import { useTabListContextValues } from './useTabListContextValues';
import { renderTabList } from './renderTabList';
import { composeComponent } from '../../utils/composeComponent';

/**
 * A tab list component for organizing content.
 */
export const TabList: ForwardRefComponent<TabListProps> = /*#__PURE__*/ composeComponent(
  'TabList',
  useTabList,
  renderTabList,
  useTabListContextValues,
);
