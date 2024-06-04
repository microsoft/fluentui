import * as React from 'react';
import {
  type DialogContextValues,
  type DialogProps,
  DialogProvider,
  type DialogState,
  DialogSurfaceProvider,
  useDialog_unstable,
  useDialogContextValues_unstable,
} from '@fluentui/react-dialog';

// eslint-disable-next-line @typescript-eslint/naming-convention
const renderOverlayDrawerDialog_unstable = (state: DialogState, contextValues: DialogContextValues) => {
  const { content, trigger } = state;

  return (
    <DialogProvider value={contextValues.dialog}>
      <DialogSurfaceProvider value={contextValues.dialogSurface}>
        {trigger}
        {content}
      </DialogSurfaceProvider>
    </DialogProvider>
  );
};

/**
 * Temporary component to render Dialog without built-in motion as Drawer has own motion implementation.
 *
 * @todo Remove after https://github.com/microsoft/fluentui/issues/30700.
 * @internal
 */
export const OverlayDrawerDialog: React.FC<DialogProps> = React.memo(props => {
  const state = useDialog_unstable(props);
  const contextValues = useDialogContextValues_unstable(state);

  return renderOverlayDrawerDialog_unstable(state, contextValues);
});

OverlayDrawerDialog.displayName = 'OverlayDrawerDialog';
