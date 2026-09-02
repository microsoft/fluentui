'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { renderDrawerBody, useDrawerBody } from '@fluentui/react-headless-components-preview/drawer';

import type { DrawerBodyProps } from './DrawerBody.types';
import { useDrawerBodyStyles } from './useDrawerBodyStyles';

/**
 * A DrawerBody holds a drawer's scrollable main content. Windmod DrawerBody: the headless part decorated with the Fluent visual contract
 * (Tailwind v4 + CSS Modules).
 */
export const DrawerBody: ForwardRefComponent<DrawerBodyProps> = React.forwardRef((props, ref) =>
  renderDrawerBody(useDrawerBodyStyles(useDrawerBody(props, ref))),
);

DrawerBody.displayName = 'DrawerBody';
