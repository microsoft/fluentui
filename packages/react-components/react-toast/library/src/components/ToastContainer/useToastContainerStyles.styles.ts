import { makeResetStyles, mergeClasses } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { createCustomFocusIndicatorStyle } from '@fluentui/react-tabster';
import type { ToastContainerSlots, ToastContainerState } from './ToastContainer.types';

export const toastContainerClassNames: SlotClassNames<ToastContainerSlots> = {
  root: 'fui-ToastContainer',
  timer: 'fui-ToastContainer__timer',
};

const useRootBaseClassName = makeResetStyles({
  boxSizing: 'border-box',
  marginTop: '16px',
  pointerEvents: 'all',
  borderRadius: tokens.borderRadiusMedium,
  ...createCustomFocusIndicatorStyle({
    outline: `${tokens.strokeWidthThick} solid ${tokens.colorStrokeFocus2}`,
  }),
});

/**
 * Apply styling to the ToastContainer slots based on the state
 */
export const useToastContainerStyles_unstable = (state: ToastContainerState): ToastContainerState => {
  'use no memo';

  const rootBaseClassName = useRootBaseClassName();
  state.root.className = mergeClasses(toastContainerClassNames.root, rootBaseClassName, state.root.className);

  return state;
};
