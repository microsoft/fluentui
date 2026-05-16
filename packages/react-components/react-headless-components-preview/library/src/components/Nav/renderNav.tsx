import { renderNav_unstable } from '@fluentui/react-nav';
import type { NavState } from './Nav.types';
import type { NavContextValues } from './navContext';

export const renderNav = (state: NavState, contextValues: NavContextValues) =>
  renderNav_unstable(state as unknown as Parameters<typeof renderNav_unstable>[0], contextValues);
