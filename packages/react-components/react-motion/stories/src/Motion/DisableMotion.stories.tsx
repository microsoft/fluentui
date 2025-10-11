import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  Dialog,
  DialogTrigger,
  DialogSurface,
  makeStyles,
  DialogTitle,
  DialogBody,
  DialogActions,
  DialogContent,
  Button,
} from '@fluentui/react-components';

const useStyles = makeStyles({
  wrapper: {
    display: 'flex',
    gap: '20px',
  },
});

export const DisableMotion = (): JSXElement => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <Dialog surfaceMotion={null}>
        <DialogTrigger disableButtonEnhancement>
          <Button>Surface motion disabled</Button>
        </DialogTrigger>
        <DialogSurface>
          <DialogBody>
            <DialogTitle>Surface motion disabled</DialogTitle>
            <DialogContent>Dialog has no surface scale animation.</DialogContent>
            <DialogActions>
              <DialogTrigger disableButtonEnhancement>
                <Button appearance="secondary">Close</Button>
              </DialogTrigger>
              <Button appearance="primary">Do Something</Button>
            </DialogActions>
          </DialogBody>
        </DialogSurface>
      </Dialog>
      <Dialog surfaceMotion={null}>
        <DialogTrigger disableButtonEnhancement>
          <Button>Surface motion and backdrop disabled</Button>
        </DialogTrigger>
        <DialogSurface backdrop={null}>
          <DialogBody>
            <DialogTitle>Dialog has no animation and backdrop</DialogTitle>
            <DialogContent>Backdrop (dimmed background of dialog) can also be disabled.</DialogContent>
            <DialogActions>
              <DialogTrigger disableButtonEnhancement>
                <Button appearance="secondary">Close</Button>
              </DialogTrigger>
              <Button appearance="primary">Do Something</Button>
            </DialogActions>
          </DialogBody>
        </DialogSurface>
      </Dialog>
    </div>
  );
};

DisableMotion.parameters = {
  docs: {
    description: { story: 'In order to disable motion you can pass `null` to appropriate slot.' },
  },
};
