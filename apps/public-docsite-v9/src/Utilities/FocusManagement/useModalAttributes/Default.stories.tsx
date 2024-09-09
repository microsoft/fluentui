import * as React from 'react';
import { useModalAttributes, useFocusFinders, makeStyles, Button, tokens, Title2 } from '@fluentui/react-components';

const useStyles = makeStyles({
  dialog: {
    position: 'fixed',
    backgroundColor: tokens.colorNeutralBackground1,
    inset: '0',
    padding: '10px',
    margin: 'auto',
    border: 'none',
    overflow: 'unset',
    boxShadow: tokens.shadow16,
    width: '450px',
    height: '200px',
    display: 'flex',
    flexDirection: 'column',
  },

  footer: {
    display: 'flex',
    marginTop: 'auto',
    justifyContent: 'end',
    gap: '5px',
  },
});

export const Default = () => {
  const styles = useStyles();
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
