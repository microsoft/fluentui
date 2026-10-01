'use client';

import type * as React from 'react';
import { useDialogActions as useDialogActionsBase } from '@fluentui/react-headless-components-preview/dialog';
import type { DialogActionsProps, DialogActionsState } from './DialogActions.types';

/**
 * Create the state required to render DialogActions.
 */
export const useDialogActions = (props: DialogActionsProps, ref: React.Ref<HTMLDivElement>): DialogActionsState => {
  const { fluid = false, position = 'end', ...rest } = props;
  const state = useDialogActionsBase(rest, ref);

  return {
    ...state,
    fluid,
    position,
    root: {
      ...state.root,
      'data-fluid': fluid ? '' : undefined,
      'data-position': position,
    },
  };
};
