# Utilities/Focus Management/useModalAttributes

This hook is a helper to create modal dialog like experiences. The hook creates accessible focus traps that set
[aria-hidden](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-hidden).
The focus trap can only be activated with explicit [HTMLElement.focus()](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus)
call in javscript code.

The hook returns two sets of attributes to spread to elements. This represents the two concepts of a modal dialog

- trigger - button that opens a dialog
- modal - the modal dialog surface itself

The hook will also handle reverting focus back to the trigger once the modal dialog is unmounted from DOM.

> ⚠️ Do not use this hook without appropriate guidance from your accessibility champ. Focus trap is only
> one of many requirements to consider when creating a modal dialog. Consider the `Dialog` and `Popover` components
> if you need modal dialog like components.

## Examples

### Default

```tsx
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
  const { triggerAttributes, modalAttributes } = useModalAttributes({
    legacyTrapFocus: true,
    trapFocus: true,
  });
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
```

### Inert Focus Trap

When the `legacyTrapFocus` flag is not set, the focus trap will behave as if all other elements outside
of the dialog is [inert](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/inert).
This is the behaviour of the native [<dialog>](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog).

> NOTE: An inert focus trap means that users can tab out of the the current document. However no other element
> in the document apart from the contents of the modal can be focused.
> This can be a better experience for screen reader users since a focus trap is not a focus 'jail'.
> However, this means that insert focus traps inside iframes will leak focus to a parent document.

```tsx
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

export const InertFocusTrap = () => {
  const styles = useStyles();
  const [open, setOpen] = React.useState(false);
  const { triggerAttributes, modalAttributes } = useModalAttributes({
    trapFocus: true,
  });
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
```
