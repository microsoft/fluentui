import * as React from 'react';

import {
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogBody,
  DialogActions,
  DialogContent,
  DialogOpenChangeEvent,
  DialogOpenChangeData,
  Button,
  Label,
  Input,
  Divider,
} from '@fluentui/react-components';

import { Scenario } from './utils';

const ModalDialog = () => {
  return (
    <Dialog>
      <DialogTrigger disableButtonEnhancement>
        <Button>Open cookies dialog</Button>
      </DialogTrigger>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>Please accept or deny cookies</DialogTitle>
          <DialogContent>
            <p>
              We use cookies to better target advertisement on this site. In order to continue using this site, you must
              accept or deny the use of cookies.
            </p>
          </DialogContent>
          <DialogActions>
            <DialogTrigger disableButtonEnhancement>
              <Button appearance="secondary">Deny cookies</Button>
            </DialogTrigger>
          </DialogActions>
          <DialogTrigger disableButtonEnhancement>
            <Button appearance="primary">Accept cookies</Button>
          </DialogTrigger>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};

const NoModalDialog = () => {
  const [open, setOpen] = React.useState(false);
  const [isSignedIn, setIsSignedIn] = React.useState(false);

  const emailRef = React.useRef<HTMLInputElement>(null);

  const handleOpenChange = (event: DialogOpenChangeEvent, data: DialogOpenChangeData) => {
    setOpen(data.open);
  };

  React.useEffect(() => {
    if (open) {
      emailRef.current?.focus();
    }
  }, [open]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setOpen(false);
    setTimeout(() => {
      setIsSignedIn(true);
    }, 200);
  };

  const handleSignOutClick = () => {
    setIsSignedIn(false);
    setTimeout(() => {
      document.getElementById('openSignInDialogButton')?.focus();
    }, 200);
  };

  React.useEffect(() => {
    if (isSignedIn) {
      document.getElementById('signOutButton')?.focus();
    }
  }, [isSignedIn]);

  return (
    <>
      {!isSignedIn ? (
        <Dialog modalType="non-modal" open={open} onOpenChange={handleOpenChange}>
          <DialogTrigger disableButtonEnhancement>
            <Button id="openSignInDialogButton">Open sign-in dialog</Button>
          </DialogTrigger>
          <DialogSurface aria-describedby={undefined}>
            <form onSubmit={handleSubmit}>
              <DialogBody>
                <DialogTitle>Please sign-in</DialogTitle>
                <DialogContent>
                  <p>Please sign-in to enjoy advanced features of this site.</p>

                  <Label htmlFor="email" required>
                    Email
                  </Label>
                  <Input type="email" id="email" required ref={emailRef} />
                  <Label htmlFor="password" required>
                    Password
                  </Label>
                  <Input type="password" id="password" required />
                </DialogContent>
                <DialogActions>
                  <Button type="submit" appearance="primary">
                    Sign-in
                  </Button>
                </DialogActions>
              </DialogBody>
            </form>
          </DialogSurface>
        </Dialog>
      ) : (
        <>
          <Button id="signOutButton" onClick={handleSignOutClick}>
            Sign-out
          </Button>
        </>
      )}
      <div role="status">{isSignedIn && <p>You have been signed-in.</p>}</div>
    </>
  );
};

const NoFocusableElementDialog = () => {
  return (
    <Dialog>
      <DialogTrigger disableButtonEnhancement>
        <Button>Open shopping cart update dialog</Button>
      </DialogTrigger>
      <DialogSurface aria-describedby="focusableBody">
        <DialogBody id="focusableBody">
          <DialogTitle>Item added</DialogTitle>
          <DialogContent>
            <p>The item has been added to the shopping cart.</p>
          </DialogContent>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};

const AlertDialog = () => {
  return (
    <Dialog modalType="alert">
      <DialogTrigger disableButtonEnhancement>
        <Button>Open auto sign-out dialog</Button>
      </DialogTrigger>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>You've been signed-out</DialogTitle>
          <DialogContent>
            <p>Due to 3 minutes of inactivity, you have been automatically signed-out.</p>
          </DialogContent>
          <DialogActions>
            <DialogTrigger disableButtonEnhancement>
              <Button appearance="primary">OK</Button>
            </DialogTrigger>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};

export const UserPromptingDialogs = () => {
  return (
    <Scenario pageTitle="User prompting dialogs">
      <h1>User prompting dialogs</h1>
      <p>Simple modal dialog example:</p>
      <ModalDialog />
      <Divider />

      <p>Non-modal dialog example with focus placement on the first edit field upon dialog open:</p>
      <NoModalDialog />
      <Divider />

      <p>Alert dialog example:</p>
      <AlertDialog />
      <Divider />

      <p>
        Dialog example with no focusable element. Such dialog is not recommended. It can be closed only by clicking on
        the backdrop or by pressing Escape.
      </p>
      <p>
        It is also recommended to set aria-describedby on the dialoag to reference the dialog content. This ensures the
        content of the dialog will be read upon open.
      </p>
      <NoFocusableElementDialog />
    </Scenario>
  );
};
