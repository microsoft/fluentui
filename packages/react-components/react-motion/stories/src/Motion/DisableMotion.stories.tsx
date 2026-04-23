import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  Button,
  Dialog,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  DialogTrigger,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerHeaderTitle,
  makeStyles,
  tokens,
  useRestoreFocusSource,
  useRestoreFocusTarget,
} from '@fluentui/react-components';
import { Dismiss24Regular } from '@fluentui/react-icons';

import description from './DisableMotion.stories.md';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: '40px',
  },

  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  sectionTitle: {
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
    margin: '0',
  },
  sectionDescription: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground3,
    margin: '0',
  },
  buttons: {
    display: 'flex',
    gap: '12px',
  },

  drawerContainer: {
    border: `2px solid ${tokens.colorNeutralStroke1}`,
    borderRadius: tokens.borderRadiusMedium,
    overflow: 'hidden',
    display: 'flex',
    height: '300px',
    backgroundColor: tokens.colorNeutralBackground1,
  },
  drawerContent: {
    flex: '1',
    padding: '16px',
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
  },
});

// --- Dialog examples ---

const DialogExample = () => {
  const classes = useStyles();

  return (
    <div className={classes.section}>
      <p className={classes.sectionTitle}>Dialog</p>
      <p className={classes.sectionDescription}>
        Dialog has two motion slots: <code>surfaceMotion</code> on Dialog and <code>backdropMotion</code> on
        DialogSurface. You can disable them independently.
      </p>

      <div className={classes.buttons}>
        <Dialog surfaceMotion={null}>
          <DialogTrigger disableButtonEnhancement>
            <Button>surfaceMotion disabled</Button>
          </DialogTrigger>
          <DialogSurface>
            <DialogBody>
              <DialogTitle>Surface motion disabled</DialogTitle>
              <DialogContent>
                The <code>surfaceMotion</code> slot is set to <code>null</code>, so the dialog surface appears instantly
                without a scale animation. The backdrop still fades in normally.
              </DialogContent>
              <DialogActions>
                <DialogTrigger disableButtonEnhancement>
                  <Button appearance="secondary">Close</Button>
                </DialogTrigger>
              </DialogActions>
            </DialogBody>
          </DialogSurface>
        </Dialog>

        <Dialog surfaceMotion={null}>
          <DialogTrigger disableButtonEnhancement>
            <Button>Both motions disabled</Button>
          </DialogTrigger>
          <DialogSurface backdropMotion={null}>
            <DialogBody>
              <DialogTitle>All motion disabled</DialogTitle>
              <DialogContent>
                Both <code>surfaceMotion</code> and <code>backdropMotion</code> are set to <code>null</code>, so the
                dialog and its backdrop appear instantly.
              </DialogContent>
              <DialogActions>
                <DialogTrigger disableButtonEnhancement>
                  <Button appearance="secondary">Close</Button>
                </DialogTrigger>
              </DialogActions>
            </DialogBody>
          </DialogSurface>
        </Dialog>
      </div>
    </div>
  );
};

// --- Drawer example ---

const DrawerExample = () => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = React.useState(false);
  const restoreFocusTargetAttributes = useRestoreFocusTarget();
  const restoreFocusSourceAttributes = useRestoreFocusSource();

  return (
    <div className={classes.section}>
      <p className={classes.sectionTitle}>Drawer</p>
      <p className={classes.sectionDescription}>
        Drawer has <code>surfaceMotion</code> and <code>backdropMotion</code> slots. Setting both to <code>null</code>{' '}
        disables the slide and backdrop animations.
      </p>

      <div className={classes.drawerContainer}>
        <Drawer
          type="overlay"
          surfaceMotion={null}
          backdropMotion={null}
          separator
          open={isOpen}
          onOpenChange={(_, { open }) => setIsOpen(open)}
          {...restoreFocusSourceAttributes}
        >
          <DrawerHeader>
            <DrawerHeaderTitle
              action={
                <Button
                  appearance="subtle"
                  aria-label="Close"
                  icon={<Dismiss24Regular />}
                  onClick={() => setIsOpen(false)}
                />
              }
            >
              Drawer (no motion)
            </DrawerHeaderTitle>
          </DrawerHeader>
          <DrawerBody>
            <p>
              Both <code>surfaceMotion</code> and <code>backdropMotion</code> are <code>null</code>, so this drawer
              appears instantly without a slide animation.
            </p>
          </DrawerBody>
        </Drawer>

        <div className={classes.drawerContent}>
          <Button {...restoreFocusTargetAttributes} appearance="primary" onClick={() => setIsOpen(!isOpen)}>
            Open drawer
          </Button>
        </div>
      </div>
    </div>
  );
};

// --- Story ---

export const DisableMotion = (): JSXElement => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <DialogExample />
      <DrawerExample />
    </div>
  );
};

DisableMotion.storyName = 'Disable motion';
DisableMotion.parameters = {
  docs: {
    description: {
      story: description,
    },
  },
};
