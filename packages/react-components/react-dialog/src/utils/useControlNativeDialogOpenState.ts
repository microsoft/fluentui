import * as React from 'react';
import { isHTMLDialogElement } from './isHTMLDialogElement';
import type { DialogModalType } from '../Dialog';
import type { DialogSurfaceElement } from '../DialogSurface';

export function useControlNativeDialogOpenState(open: boolean, modalType: DialogModalType) {
  const dialogSurfaceRef = React.useRef<DialogSurfaceElement>(null);

  React.useEffect(() => {
    if (isHTMLDialogElement(dialogSurfaceRef.current) && dialogSurfaceRef.current.open !== open) {
      if (open) {
        if (modalType === 'non-modal') {
          dialogSurfaceRef.current.show();
        } else {
          dialogSurfaceRef.current.showModal();
        }
      } else {
        dialogSurfaceRef.current.close();
      }
    }
  }, [open, modalType]);

  return dialogSurfaceRef;
}
