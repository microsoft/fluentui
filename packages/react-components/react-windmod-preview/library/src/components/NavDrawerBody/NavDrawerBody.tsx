'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { renderNavDrawerBody, useNavDrawerBody } from '@fluentui/react-headless-components-preview/nav';

import type { NavDrawerBodyProps } from './NavDrawerBody.types';
import { useNavDrawerBodyStyles } from './useNavDrawerBodyStyles';

/**
 * A NavDrawerBody holds a nav drawer's scrollable list of destinations. Windmod NavDrawerBody: the
 * headless part decorated with the Fluent visual contract (Tailwind v4 + CSS Modules).
 */
export const NavDrawerBody: ForwardRefComponent<NavDrawerBodyProps> = React.forwardRef(
  (props: NavDrawerBodyProps, ref: React.Ref<HTMLDivElement>) =>
    renderNavDrawerBody(useNavDrawerBodyStyles(useNavDrawerBody(props, ref))),
);

NavDrawerBody.displayName = 'NavDrawerBody';
