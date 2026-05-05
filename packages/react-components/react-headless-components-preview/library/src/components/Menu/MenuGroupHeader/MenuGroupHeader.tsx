'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useMenuGroupHeader } from './useMenuGroupHeader';
import { renderMenuGroupHeader } from './renderMenuGroupHeader';
import type { MenuGroupHeaderProps } from './MenuGroupHeader.types';

/**
 * Headless MenuGroupHeader component.
 *
 * Renders the labelled header for a `MenuGroup` and stamps the group's
 * `headerId` on its root.
 */
export const MenuGroupHeader: ForwardRefComponent<MenuGroupHeaderProps> = React.forwardRef((props, ref) => {
  const state = useMenuGroupHeader(props, ref);
  return renderMenuGroupHeader(state);
});

MenuGroupHeader.displayName = 'MenuGroupHeader';
