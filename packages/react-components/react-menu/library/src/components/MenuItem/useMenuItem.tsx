'use client';

import * as React from 'react';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import {
  ChevronRightFilled,
  ChevronRightRegular,
  ChevronLeftFilled,
  ChevronLeftRegular,
  bundleIcon,
} from '@fluentui/react-icons';
import { useMenuItemBase_unstable } from './useMenuItemBase';
import type { MenuItemProps, MenuItemState } from './MenuItem.types';
import type { ARIAButtonElement } from '@fluentui/react-aria';

const ChevronRightIcon = bundleIcon(ChevronRightFilled, ChevronRightRegular);
const ChevronLeftIcon = bundleIcon(ChevronLeftFilled, ChevronLeftRegular);

/**
 * Returns the props and state required to render the component
 */
export const useMenuItem_unstable = (props: MenuItemProps, ref: React.Ref<ARIAButtonElement<'div'>>): MenuItemState => {
  const { dir } = useFluent();
  const state = useMenuItemBase_unstable(props, ref);

  // Set default chevron icon
  if (state.submenuIndicator) {
    state.submenuIndicator.children ??= dir === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />;
  }

  return state;
};
