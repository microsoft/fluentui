import * as React from 'react';
import { useDialog_unstable } from './useDialog';
import { renderDialog_unstable } from './renderDialog';
import type { DialogProps } from './Dialog.types';
import { useDialogContextValues_unstable } from './useDialogContextValues';

/**
 * The `Dialog` root level component serves as an interface for interaction with all possible behaviors exposed.
 * It provides context down the hierarchy to `children` compound components to allow functionality.
 * This component expects to receive as children either a `DialogSurface` or a `DialogTrigger`
 * and a `DialogSurface` (or some component that will eventually render one of those compound components)
 * in this specific order
 */
export const Dialog: React.FC<DialogProps> = React.memo(props => {
  const state = useDialog_unstable(props);
  const contextValues = useDialogContextValues_unstable(state);

  return renderDialog_unstable(state, contextValues);
});

Dialog.displayName = 'Dialog';
