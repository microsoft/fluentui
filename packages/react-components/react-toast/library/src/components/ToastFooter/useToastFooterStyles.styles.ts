import { makeResetStyles, mergeClasses } from '@griffel/react';
import type { ToastFooterSlots, ToastFooterState } from './ToastFooter.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const toastFooterClassNames: SlotClassNames<ToastFooterSlots> = {
  root: 'fui-ToastFooter',
};

/**
 * Styles for the root slot
 */
const useRootBaseClassName = makeResetStyles({
  paddingTop: '16px',
  gridColumnStart: 2,
  gridColumnEnd: 3,
  display: 'flex',
  alignItems: 'center',
  gap: '14px',
});

/**
 * Apply styling to the ToastFooter slots based on the state
 */
export const useToastFooterStyles_unstable = (state: ToastFooterState): ToastFooterState => {
  'use no memo';

  const rootBaseClassName = useRootBaseClassName();
  state.root.className = mergeClasses(toastFooterClassNames.root, rootBaseClassName, state.root.className);

  return state;
};
