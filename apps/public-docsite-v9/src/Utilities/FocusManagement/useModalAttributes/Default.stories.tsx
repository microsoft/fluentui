import * as React from 'react';
import { useModalAttributes, useFocusFinders, Button, Title2 } from '@fluentui/react-components';

import styles from './Default.module.css';

export const Default = () => {
  const [open, setOpen] = React.useState(false);
  const { triggerAttributes, modalAttributes } = useModalAttributes({ legacyTrapFocus: true, trapFocus: true });
  const { findFirstFocusable } = useFocusFinders();
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const dialogRef = React.useRef<HTMLDivElement>(null);
  const onClickTrigger = () => {
    setOpen(true);
  };

  const onClickClose = () => {
    setOpen(false);
    triggerRef.current?.focus();
  };

  const onDialogKeydown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') {
      setOpen(false);
      triggerRef.current?.focus();
    }
  };

  React.useEffect(() => {
    if (open && dialogRef.current) {
      findFirstFocusable(dialogRef.current)?.focus();
    }
  }, [open, findFirstFocusable]);

  return (
    <>
      <Button ref={triggerRef} {...triggerAttributes} onClick={onClickTrigger}>
        Open dialog
      </Button>
      {open && (
        <div
          onKeyDown={onDialogKeydown}
          ref={dialogRef}
          {...modalAttributes}
          aria-modal="true"
          role="dialog"
          className={styles.dialog}
          aria-label="Example dialog"
        >
          <Title2 as="h2">Example dialog</Title2>
          <div>This is a dialog for example purposes - ⚠️DO NOT USE THIS CODE⚠️ </div>
          <div className={styles.footer}>
            <Button>Action</Button>
            <Button onClick={onClickClose}>Close</Button>
          </div>
        </div>
      )}
    </>
  );
};
