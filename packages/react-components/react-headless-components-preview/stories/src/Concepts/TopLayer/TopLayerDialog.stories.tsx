import * as React from 'react';
import { useTopLayer, getTopLayerTriggerProps } from '@fluentui/react-headless-components-preview/top-layer';

import styles from './topLayer.module.css';

/**
 * A modal dialog recipe: `useTopLayer` with `mode="modal"` on a `<dialog>`, opened with `showModal()`.
 * The rest of the page is inert and Tab wraps inside the dialog. Escape is reported through `onClose` instead of
 * closing the dialog, so React stays in control of `open`. A backdrop click is a click on the `<dialog>` itself,
 * outside its box.
 */
export const Dialog = (): React.ReactNode => {
  const [open, setOpen] = React.useState(false);
  const dialogId = 'top-layer-dialog';
  const titleId = 'top-layer-dialog-title';
  const dialogRef = React.useRef<HTMLDialogElement>(null);
  const { shouldRender } = useTopLayer(dialogRef, {
    open,
    mode: 'modal',
    role: 'dialog',
    onClose: () => setOpen(false),
  });

  const onClick = (event: React.MouseEvent<HTMLDialogElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const outside =
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom;
    if (event.target === event.currentTarget && outside) {
      setOpen(false);
    }
  };

  return (
    <>
      <button
        className={styles.btn}
        onClick={() => setOpen(true)}
        {...getTopLayerTriggerProps({ open, layerId: dialogId, role: 'dialog' })}
      >
        Open dialog
      </button>
      {shouldRender && (
        <dialog
          ref={dialogRef}
          id={dialogId}
          aria-labelledby={titleId}
          className={`${styles.layer} ${styles.modal}`}
          data-open={open ? '' : undefined}
          onClick={onClick}
        >
          <strong id={titleId}>Top-layer dialog</strong>
          <span>The rest of the page is inert until this closes.</span>
          <input aria-label="Name" />
          <button className={styles.btn} onClick={() => setOpen(false)}>
            Close
          </button>
        </dialog>
      )}
    </>
  );
};
