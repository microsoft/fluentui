import * as React from 'react';
import { useButton_unstable } from '@fluentui/react-button';
import { Navigation20Filled } from '@fluentui/react-icons';
import { HamburgerInNavProps, HamburgerInNavState } from './HamburgerInNav.types';

/**
 * Given user props, defines default props for the Button, calls useButtonState and useChecked, and returns
 * processed state.
 * @param props - User provided props to the Button component.
 * @param ref - User provided ref to be passed to the Button component.
 */
export const useHamburgerInNav_unstable = (
  props: HamburgerInNavProps,
  ref: React.Ref<HTMLButtonElement | HTMLAnchorElement>,
): HamburgerInNavState => {
  return useButton_unstable({ icon: <Navigation20Filled />, appearance: 'transparent', ...props }, ref);
};
