'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import {
  renderMenuGroup,
  useMenuGroup,
  useMenuGroupContextValues,
} from '@fluentui/react-headless-components-preview/menu';

import type { MenuGroupProps } from './MenuGroup.types';
import { useMenuGroupStyles } from './useMenuGroupStyles';

/**
 * A MenuGroup clusters related menu items under an optional header. Windmod MenuGroup: the
 * headless group decorated with the Fluent visual contract (Tailwind v4 + CSS Modules).
 */
export const MenuGroup: ForwardRefComponent<MenuGroupProps> = React.forwardRef(
  (props: MenuGroupProps, ref: React.Ref<HTMLElement>) => {
    const state = useMenuGroupStyles(useMenuGroup(props, ref));

    return renderMenuGroup(state, useMenuGroupContextValues(state));
  },
);

MenuGroup.displayName = 'MenuGroup';
