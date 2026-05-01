'use client';

import type * as React from 'react';
import { useDrawerHeaderTitle_unstable } from '@fluentui/react-drawer';

import { useDialogContext } from '../../Dialog';
import type { DrawerHeaderTitleProps, DrawerHeaderTitleState } from './DrawerHeaderTitle.types';

/**
 * Returns the state for a DrawerHeaderTitle component, given its props and ref.
 */
export const useDrawerHeaderTitle = (
  props: DrawerHeaderTitleProps,
  ref: React.Ref<HTMLDivElement>,
): DrawerHeaderTitleState => {
  'use no memo';

  const state = useDrawerHeaderTitle_unstable(props, ref);
  const { dialogTitleId } = useDialogContext();

  if (state.heading && dialogTitleId) {
    state.heading.id = dialogTitleId;
  }

  return state;
};
