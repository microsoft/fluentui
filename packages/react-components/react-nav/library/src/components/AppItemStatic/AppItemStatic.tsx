'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';

import { useAppItemStatic_unstable } from './useAppItemStatic';
import { renderAppItemStatic_unstable } from './renderAppItemStatic';
import { useAppItemStaticStyles_unstable } from './useAppItemStaticStyles.styles';
import type { AppItemStaticProps } from './AppItemStatic.types';

/**
 * AppItemStatic component - Static application item in the navigation menu.
 */
export const AppItemStatic: ForwardRefComponent<AppItemStaticProps> = React.forwardRef((props, ref) => {
  let state = useAppItemStatic_unstable(props, ref);

  state = useAppItemStaticStyles_unstable(state);
  state = useCustomStyleHook_unstable('useAppItemStaticStyles_unstable')(state);

  return renderAppItemStatic_unstable(state);
});

AppItemStatic.displayName = 'AppItemStatic';
