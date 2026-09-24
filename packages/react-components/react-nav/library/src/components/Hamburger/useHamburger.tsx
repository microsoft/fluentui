'use client';

import * as React from 'react';
import { useButton_unstable } from '@fluentui/react-button';
import { NavigationFilled } from '@fluentui/react-icons';
import type { HamburgerProps, HamburgerState } from './Hamburger.types';

/**
 * Given user props, defines default props for the Button, calls useButtonState and useChecked, and returns
 * processed state.
 * @param props - User provided props to the Button component.
 * @param ref - User provided ref to be passed to the Button component.
 */
export const useHamburger_unstable = (
  props: HamburgerProps,
  ref: React.Ref<HTMLButtonElement | HTMLAnchorElement>,
): HamburgerState => {
  return useButton_unstable({ icon: <NavigationFilled />, appearance: 'transparent', ...props }, ref);
};
