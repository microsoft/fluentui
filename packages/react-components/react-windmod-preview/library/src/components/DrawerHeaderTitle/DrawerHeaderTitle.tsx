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
export const DrawerHeaderTitle: ForwardRefComponent<DrawerHeaderTitleProps> = React.forwardRef((props, ref) => {
  const state = useDrawerHeaderTitle(props, ref);
  const styled = useDrawerHeaderTitleStyles(state);

  return renderDrawerHeaderTitle(styled);
});

DrawerHeaderTitle.displayName = 'DrawerHeaderTitle';
