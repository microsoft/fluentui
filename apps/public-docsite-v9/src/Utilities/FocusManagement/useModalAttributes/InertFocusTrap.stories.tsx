import * as React from 'react';
import { useModalAttributes, useFocusFinders, Button, Title2 } from '@fluentui/react-components';

import styles from './InertFocusTrap.module.css';

export const InertFocusTrap = () => {
  const [open, setOpen] = React.useState(false);
  const { triggerAttributes, modalAttributes } = useModalAttributes({ trapFocus: true });
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

InertFocusTrap.parameters = {
  docs: {
    description: {
      story: [
        'When the `legacyTrapFocus` flag is not set, the focus trap will behave as if all other elements outside',
        'of the dialog is [inert](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/inert).',
        'This is the behaviour of the native [<dialog>](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog).',
        '',
        '> NOTE: An inert focus trap means that users can tab out of the the current document. However no other element',
        'in the document apart from the contents of the modal can be focused.',
        "This can be a better experience for screen reader users since a focus trap is not a focus 'jail'.",
        'However, this means that insert focus traps inside iframes will leak focus to a parent document.',
      ].join('\n'),
    },
  },
};
