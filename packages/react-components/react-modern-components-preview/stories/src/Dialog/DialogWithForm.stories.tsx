import * as React from 'react';
import {
  Dialog,
  DialogActions,
  DialogBody,
  DialogHeader,
  DialogSurface,
  DialogTitle,
  DialogTrigger,
} from '@fluentui/react-modern-components-preview/dialog';
import { Button, Input, Label, makeStyles } from '@fluentui/react-components';
import story from './DialogWithForm.md';

const useStyles = makeStyles({
  form: { display: 'contents' },
  content: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '10px',
  },
});

export const WithForm = (): React.ReactNode => {
  const styles = useStyles();
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    alert('form submitted!');
  };

  return (
    <Dialog modalType="non-modal">
      <DialogTrigger>
        <Button>Open formulary dialog</Button>
      </DialogTrigger>
      <DialogSurface aria-describedby={undefined}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Dialog title</DialogTitle>
          </DialogHeader>
          <DialogBody className={styles.content}>
            <Label required htmlFor="email-input">
              Email input
            </Label>
            <Input required type="email" id="email-input" />
            <Label required htmlFor="password-input">
              Password input
            </Label>
            <Input required type="password" id="password-input" />
          </DialogBody>
          <DialogActions>
            <Button type="submit" appearance="primary">
              Submit
            </Button>
            <DialogTrigger>
              <Button appearance="secondary">Close</Button>
            </DialogTrigger>
          </DialogActions>
        </form>
      </DialogSurface>
    </Dialog>
  );
};

WithForm.parameters = { docs: { description: { story } } };
