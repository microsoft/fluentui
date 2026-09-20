/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import * as React from 'react';
import { renderDialog as renderDialogBase } from '@fluentui/react-headless-components-preview/dialog';
import { MotionRefForwarder } from '@fluentui/react-motion';
import { assertSlots } from '@fluentui/react-utilities';
import type { DialogContextValues, DialogInternalSlots, DialogState } from './Dialog.types';

export const renderDialog = (state: DialogState, contextValues: DialogContextValues): React.ReactElement => {
  assertSlots<DialogInternalSlots>(state);

  const content = state.content ? (
    <state.surfaceMotion>
      <MotionRefForwarder>{state.content as React.ReactElement}</MotionRefForwarder>
    </state.surfaceMotion>
  ) : null;

  return renderDialogBase({ ...state, content }, contextValues);
};
