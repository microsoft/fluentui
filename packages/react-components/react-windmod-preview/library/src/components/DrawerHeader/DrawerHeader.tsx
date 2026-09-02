'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { renderDrawerHeader, useDrawerHeader } from '@fluentui/react-headless-components-preview/drawer';

import type { DrawerHeaderProps } from './DrawerHeader.types';
import { useDrawerHeaderStyles } from './useDrawerHeaderStyles';

/**
 * A DrawerHeader holds a drawer's title and navigation. Windmod DrawerHeader: the headless part decorated with the Fluent visual contract
 * (Tailwind v4 + CSS Modules).
 */
export const DrawerHeader: ForwardRefComponent<DrawerHeaderProps> = React.forwardRef(
  (props: DrawerHeaderProps, ref: React.Ref<HTMLElement>) =>
    renderDrawerHeader(useDrawerHeaderStyles(useDrawerHeader(props, ref))),
);

DrawerHeader.displayName = 'DrawerHeader';
