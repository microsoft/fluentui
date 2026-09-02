'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { renderDrawerFooter, useDrawerFooter } from '@fluentui/react-headless-components-preview/drawer';

import type { DrawerFooterProps } from './DrawerFooter.types';
import { useDrawerFooterStyles } from './useDrawerFooterStyles';

/**
 * A DrawerFooter holds a drawer's actions. Windmod DrawerFooter: the headless part decorated with the Fluent visual contract
 * (Tailwind v4 + CSS Modules).
 */
export const DrawerFooter: ForwardRefComponent<DrawerFooterProps> = React.forwardRef(
  (props: DrawerFooterProps, ref: React.Ref<HTMLElement>) =>
    renderDrawerFooter(useDrawerFooterStyles(useDrawerFooter(props, ref))),
);

DrawerFooter.displayName = 'DrawerFooter';
