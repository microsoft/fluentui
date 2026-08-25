'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { renderDrawerHeaderTitle, useDrawerHeaderTitle } from '@fluentui/react-headless-components-preview/drawer';

import type { DrawerHeaderTitleProps } from './DrawerHeaderTitle.types';
import { useDrawerHeaderTitleStyles } from './useDrawerHeaderTitleStyles';

/**
 * A DrawerHeaderTitle holds a drawer's accessible heading and an optional action. Windmod DrawerHeaderTitle: the headless part decorated with the Fluent visual contract
 * (Tailwind v4 + CSS Modules).
 */
export const DrawerHeaderTitle: ForwardRefComponent<DrawerHeaderTitleProps> = React.forwardRef(
  (props: DrawerHeaderTitleProps, ref: React.Ref<HTMLDivElement>) =>
    renderDrawerHeaderTitle(useDrawerHeaderTitleStyles(useDrawerHeaderTitle(props, ref))),
  // Casting is required due to lack of distributive union to support union on @types/react
) as ForwardRefComponent<DrawerHeaderTitleProps>;

DrawerHeaderTitle.displayName = 'DrawerHeaderTitle';
