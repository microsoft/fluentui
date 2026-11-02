import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogContent,
  DialogBody,
  DialogActions,
  Button,
  Input,
  Label,
  makeStyles,
} from '@fluentui/react-components';
import story from './DialogWithForm.md';

const useStyles = makeStyles({
  content: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '10px',
  },
});

export const WithForm = (): JSXElement => {
  const styles = useStyles();
  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    alert('form submitted!');
  };
  return (
    <Dialog modalType="non-modal">
      <DialogTrigger disableButtonEnhancement>
        <Button>Open formulary dialog</Button>
      </DialogTrigger>
      <DialogSurface aria-describedby={undefined}>
        <form onSubmit={handleSubmit}>
          <DialogBody>
            <DialogTitle>Dialog title</DialogTitle>
            <DialogContent className={styles.content}>
              <Label required htmlFor={'email-input'}>
                Email input
              </Label>
              <Input required type="email" id={'email-input'} />
              <Label required htmlFor={'password-input'}>
                Password input
              </Label>
              <Input required type="password" id={'password-input'} />
            </DialogContent>
            <DialogActions>
              <Button type="submit" appearance="primary">
                Submit
              </Button>
              <DialogTrigger disableButtonEnhancement>
                <Button appearance="secondary">Close</Button>
              </DialogTrigger>
            </DialogActions>
          </DialogBody>
        </form>
      </DialogSurface>
    </Dialog>
  );
};

WithForm.parameters = {
  docs: {
    description: {
      story,
    },
  },
};
