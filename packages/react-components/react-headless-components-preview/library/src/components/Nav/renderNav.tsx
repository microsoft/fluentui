import { renderNav_unstable } from '@fluentui/react-nav';
import type { JSXElement } from '@fluentui/react-utilities';

import type { NavState } from './Nav.types';
import type { NavContextValues } from './navContext';

export const renderNav = renderNav_unstable as (state: NavState, contextValues: NavContextValues) => JSXElement;
