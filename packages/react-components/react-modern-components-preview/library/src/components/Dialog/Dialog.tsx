'use client';

import * as React from 'react';
import type { JSXElement } from '@fluentui/react-utilities';
import type { DialogProps } from './Dialog.types';
import { renderDialog } from './renderDialog';
import { useDialog } from './useDialog';
import { useDialogContextValues } from './useDialogContextValues';

/**
 * The root component that coordinates a Dialog's open state and compound components.
 */
export const Dialog = React.memo((props: DialogProps): JSXElement => {
  const state = useDialog(props);
  const contextValues = useDialogContextValues(state);

  return renderDialog(state, contextValues);
});

Dialog.displayName = 'Dialog';
