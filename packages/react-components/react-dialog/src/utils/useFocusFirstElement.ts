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
  const triggerRef = React.useRef<HTMLElement>();

  React.useEffect(() => {
    if (!open) {
      return triggerRef.current?.focus();
    }
    triggerRef.current = targetDocument?.activeElement as HTMLElement | undefined;
    const element = dialogRef.current && findFirstFocusable(dialogRef.current);
    if (element) {
      // this is only required for non native dialogs
      element.focus();
    } else if (process.env.NODE_ENV !== 'production') {
      triggerRef.current?.blur();
      // eslint-disable-next-line no-console
      console.warn('A Dialog should have at least one focusable element inside DialogSurface');
    }
  }, [findFirstFocusable, open, modalType, targetDocument]);

  return dialogRef;
}
