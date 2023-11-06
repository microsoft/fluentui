/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { Transition } from 'react-transition-group';
import { DialogProvider, DialogSurfaceProvider } from '../../contexts';
import type { DialogState, DialogContextValues } from './Dialog.types';
import { DialogTransitionProvider } from '../../contexts/dialogTransitionContext';

/**
 * Render the final JSX of Dialog
 */
export const renderDialog_unstable = (state: DialogState, contextValues: DialogContextValues) => {
  const { content, trigger } = state;

  return (
    <DialogProvider value={contextValues.dialog}>
      <DialogSurfaceProvider value={contextValues.dialogSurface}>
        {trigger}
        {process.env.NODE_ENV === 'test' ? (
          state.open && <DialogTransitionProvider value={'none'}>{content}</DialogTransitionProvider>
        ) : (
          <Transition
            mountOnEnter
            unmountOnExit
            in={state.open}
            nodeRef={state.dialogRef}
            // FIXME: this should not be hardcoded tokens.durationGentle
            timeout={250}
          >
            {status => <DialogTransitionProvider value={status}>{content}</DialogTransitionProvider>}
          </Transition>
        )}
      </DialogSurfaceProvider>
    </DialogProvider>
  );
};
