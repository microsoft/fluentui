'use client';

import type * as React from 'react';
import type { JSXElement } from '@fluentui/react-utilities';
import { renderDialog, useDialog, useDialogContextValues } from '@fluentui/react-headless-components-preview/dialog';

import type { DialogProps } from './Dialog.types';

/**
 * A Dialog interrupts the page to ask for a decision or communicate a message. It renders no
 * element of its own — it provides the context its trigger and surface consume — so windmod adds
 * no look and no styles hook, only the identity of a windmod component.
 */
export const Dialog: React.FC<DialogProps> = (props: DialogProps): JSXElement => {
  const state = useDialog(props);

  const contextValues = useDialogContextValues(state);

  return renderDialog(state, contextValues);
};

Dialog.displayName = 'Dialog';
