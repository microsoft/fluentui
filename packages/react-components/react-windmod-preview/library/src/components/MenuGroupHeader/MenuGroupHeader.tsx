'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { renderMenuGroupHeader, useMenuGroupHeader } from '@fluentui/react-headless-components-preview/menu';

import type { MenuGroupHeaderProps } from './MenuGroupHeader.types';
import { useMenuGroupHeaderStyles } from './useMenuGroupHeaderStyles';

/**
 * A MenuGroupHeader labels a MenuGroup. Windmod MenuGroupHeader: the headless header decorated
 * with the Fluent visual contract (Tailwind v4 + CSS Modules).
 */
export const MenuGroupHeader: ForwardRefComponent<MenuGroupHeaderProps> = React.forwardRef(
  (props: MenuGroupHeaderProps, ref: React.Ref<HTMLElement>) =>
    renderMenuGroupHeader(useMenuGroupHeaderStyles(useMenuGroupHeader(props, ref))),
);

MenuGroupHeader.displayName = 'MenuGroupHeader';
