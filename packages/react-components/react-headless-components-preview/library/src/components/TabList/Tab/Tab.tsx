'use client';

import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { TabProps } from './Tab.types';
import { useTab } from './useTab';
import { renderTab } from './renderTab';
import { composeComponent } from '../../../utils/composeComponent';

/**
 * A tab  component for organizing content.
 */
export const Tab: ForwardRefComponent<TabProps> = /*#__PURE__*/ composeComponent('Tab', useTab, renderTab);
