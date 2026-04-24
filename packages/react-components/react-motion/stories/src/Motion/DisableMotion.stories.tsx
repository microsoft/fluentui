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
          <Button>All motion disabled</Button>
        </DialogTrigger>
        <DialogSurface backdropMotion={null}>
          <DialogBody>
            <DialogTitle>All motion disabled</DialogTitle>
            <DialogContent>
              Dialog has no surface scale animation and no backdrop fade animation (backdrop is still rendered).
            </DialogContent>
            <DialogActions>
              <DialogTrigger disableButtonEnhancement>
                <Button appearance="secondary">Close</Button>
              </DialogTrigger>
              <Button appearance="primary">Do Something</Button>
            </DialogActions>
          </DialogBody>
        </DialogSurface>
      </Dialog>
      <Dialog>
        <DialogTrigger disableButtonEnhancement>
          <Button>Backdrop motion disabled</Button>
        </DialogTrigger>
        <DialogSurface backdropMotion={null}>
          <DialogBody>
            <DialogTitle>Backdrop motion disabled</DialogTitle>
            <DialogContent>Dialog has no backdrop fade animation (surface scale animation still works).</DialogContent>
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
    description: {
      story:
        'In order to disable motion you can pass `null` to the appropriate slot. ' +
        'Use `surfaceMotion` prop on `Dialog` to disable the surface scale animation. ' +
        'Use `backdropMotion` prop on `DialogSurface` to disable the backdrop fade animation.',
    },
  },
};
