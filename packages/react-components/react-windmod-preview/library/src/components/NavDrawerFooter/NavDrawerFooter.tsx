'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { renderNavDrawerFooter, useNavDrawerFooter } from '@fluentui/react-headless-components-preview/nav';

import type { NavDrawerFooterProps } from './NavDrawerFooter.types';
import { useNavDrawerFooterStyles } from './useNavDrawerFooterStyles';

/**
 * A NavDrawerFooter holds a nav drawer's actions. Windmod NavDrawerFooter: the headless part
 * decorated with the Fluent visual contract (Tailwind v4 + CSS Modules).
 */
export const NavDrawerFooter: ForwardRefComponent<NavDrawerFooterProps> = React.forwardRef(
  (props: NavDrawerFooterProps, ref: React.Ref<HTMLElement>) =>
    renderNavDrawerFooter(useNavDrawerFooterStyles(useNavDrawerFooter(props, ref))),
  // Casting is required due to lack of distributive union to support union on @types/react
) as ForwardRefComponent<NavDrawerFooterProps>;

NavDrawerFooter.displayName = 'NavDrawerFooter';
