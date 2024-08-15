import * as React from 'react';
import { useFocusFinders } from '@fluentui/react-tabster';
import { useFluent_unstable } from '@fluentui/react-shared-contexts';
import type { DialogSurfaceElement } from '../DialogSurface';
import type { DialogModalType } from '../Dialog';

/**
 * Focus first element on content when dialog is opened,
 */
export function useFocusFirstElement(open: boolean, modalType: DialogModalType) {
  const { findFirstFocusable } = useFocusFinders();
  const { targetDocument } = useFluent_unstable();
  const dialogRef = React.useRef<DialogSurfaceElement>(null);

  React.useEffect(() => {
    if (!open) {
      return;
    }
    const element = dialogRef.current && findFirstFocusable(dialogRef.current);
    if (element) {
      element.focus();
    } else {
      dialogRef.current?.focus(); // https://github.com/microsoft/fluentui/issues/25150
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.warn(/** #__DE-INDENT__ */ `
          @fluentui/react-dialog [useFocusFirstElement]:
          A Dialog should have at least one focusable element inside DialogSurface.
          Please add at least a close button either on \`DialogTitle\` action slot or inside \`DialogActions\`
        `);
      }
    }
  }, [findFirstFocusable, open, modalType, targetDocument]);

  return dialogRef;
}
