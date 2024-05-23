import { setVirtualParent } from '@fluentui/react-utilities';
import * as React from 'react';

/**
 * Applies behaviour to infer the virtual parent of the dialog surface when a trigger is
 * not provided. The inferred virtual parent will a sibling of the active element before focus
 * is moved to the dialog surface.
 *
 * @returns - ref to the dialog surface
 */
export function useInferredVirtualParent(options: { trigger: React.ReactNode; enabled: boolean; open: boolean }) {
  const { trigger, enabled, open } = options;
  const dialogRef = React.useRef<HTMLElement | null>(null);
  React.useEffect(() => {
    if (trigger || !open || !enabled) {
      return;
    }

    const dialogSurface = dialogRef.current;
    if (!dialogSurface) {
      return;
    }

    const doc = dialogSurface.ownerDocument;
    const activeElement = dialogSurface.ownerDocument.activeElement;
    const parentElement = activeElement?.parentElement;
    if (!activeElement || !parentElement || activeElement === doc.body) {
      return;
    }

    const virtualParent = doc.createElement('span');
    virtualParent.setAttribute('data-fui-virtual-parent', '');
    parentElement.insertBefore(virtualParent, activeElement);
    setVirtualParent(dialogSurface, virtualParent);

    return () => {
      setVirtualParent(dialogSurface, undefined);
      virtualParent.remove();
    };
  }, [open, trigger, enabled]);

  return dialogRef;
}
