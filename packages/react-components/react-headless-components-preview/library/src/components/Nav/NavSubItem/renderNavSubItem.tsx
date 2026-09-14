import { renderNavSubItem_unstable } from '@fluentui/react-nav';
import type { JSXElement } from '@fluentui/react-utilities';

import type { NavSubItemState } from './NavSubItem.types';

export const renderNavSubItem = renderNavSubItem_unstable as (state: NavSubItemState) => JSXElement;
