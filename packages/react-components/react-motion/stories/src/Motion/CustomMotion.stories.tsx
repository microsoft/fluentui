import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  Button,
  createPresenceComponent,
  Dialog,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  DialogTrigger,
  DrawerBody,
  DrawerHeader,
  DrawerHeaderTitle,
  InlineDrawer,
  makeStyles,
  motionTokens,
  tokens,
} from '@fluentui/react-components';
import { Dismiss24Regular } from '@fluentui/react-icons';

import description from './CustomMotion.stories.md';

// --- Custom motions for Dialog ---

const SlideDialogMotion = createPresenceComponent(() => {
  const keyframes = [
    { opacity: 1, transform: 'translateX(-150%)', boxShadow: '0px 0px 0px 0px rgba(0, 0, 0, 0.1)' },
    { opacity: 1, transform: 'translateX(0)', boxShadow: tokens.shadow64 },
  ];

  return {
    enter: {
      keyframes,
      // easing: curveLinearToSoftClose,
      easing: curveSwimSpring2,
      duration: motionTokens.durationUltraSlow * 5,
    },
    exit: {
      keyframes: [...keyframes].reverse(),
      easing: motionTokens.curveAccelerateMid,
      duration: motionTokens.durationGentle,
    },
  };
});

const RadialBackdropMotion = createPresenceComponent(() => {
  const keyframes = [
    {
      opacity: 0,
      background: 'radial-gradient(circle at center, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.8) 100%)',
      transform: 'scale(0)',
    },
    {
      opacity: 1,
      background: 'radial-gradient(circle at center, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.8) 100%)',
      transform: 'scale(1)',
    },
  ];

  return {
    enter: {
      keyframes,
      easing: motionTokens.curveDecelerateMax,
      duration: motionTokens.durationGentle,
    },
    exit: {
      keyframes: [...keyframes].reverse(),
      easing: motionTokens.curveAccelerateMax,
      duration: motionTokens.durationGentle,
    },
  };
});

// ENTER EASINGS

const curveGlideEvenMoreRelaxedBack5pct = `linear(0, .04695 2%, .1207 5%, .2464 10%, .3998 16%, .5288 21%, .5777 23%, .6234 25%, .6659 27%, .7055 29%, .7421 31%, .7759 33%, .807 35%, .8355 37%, .8615 39%, .8852 41%, .9065 43%, .9257 45%, .9428 47%, .9579 49%, .9712 51%, .9827 53%, .9926 55%, 1.001 57%, 1.008 59%, 1.016 62%, 1.021 65%, 1.024 68%, 1.025 71%, 1.023 75%, 1.019 80%, 1.007 90%, 1.002 95%, 1 99%, 1)`;

// EXIT EASINGS

const curvePower1p4ToSoftClose = `linear(0, .006908 1%, .01823 2%, .03216 3%, .04811 4%, .06575 5%, .08487 6%, .1053 7%, .127 8%, .1497 9%, .1983 11%, .2505 13%, .3061 15%, .3647 17%, .4262 19%, .4903 21%, .5569 23%, .6259 25%, .6614 26%, .6937 27%, .7168 28%, .7321 29%, .7428 30%, .7511 31%, .7637 33%, .7737 35%, .7862 38%, .8078 44%, .8877 68%, .9393 83%, .9964 99%, 1)`;

// --- Custom motion for Drawer ---

const CustomSlideMotion = createPresenceComponent(() => {
  return {
    enter: {
      // Slide in from the left
      keyframes: [{ translate: '-100% 0' }, { translate: '0 0' }],
      duration: motionTokens.durationUltraSlow * 2,
      easing: curveGlideEvenMoreRelaxedBack5pct,
    },
    exit: {
      // Slide out to the left
      keyframes: [{ translate: '0 0' }, { translate: '-100% 0' }],
      duration: motionTokens.durationUltraSlow * 5,
      easing: curvePower1p4ToSoftClose,
    },
  };
});

// --- Styles ---

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
    flexDirection: 'column-reverse',
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

const curveSwimSpring2 = `linear(0, .003149 1%, .01215 2%, .02643 3%, .04544 4%, .06871 5%, .09533 6%, .1204 7%, .1429 8%, .1632 9%, .1814 10%, .1977 11%, .2124 12%, .2257 13%, .2375 14%, .2482 15%, .2664 17%, .2811 19%, .293 21%, .3078 24%, .3181 25%, .3336 26%, .3536 27%, .3778 28%, .4342 30%, .4598 31%, .4827 32%, .5034 33%, .5219 34%, .5386 35%, .5536 36%, .5671 37%, .5792 38%, .5901 39%, .6086 41%, .6236 43%, .6358 45%, .6456 47%, .6537 48%, .6672 49%, .6855 50%, .7081 51%, .7346 52%, .7638 53%, .7908 54%, .8151 55%, .8369 56%, .8565 57%, .8741 58%, .8899 59%, .9041 60%, .9169 61%, .9284 62%, .9387 63%, .9563 65%, .9706 67%, .9821 69%, .9914 71%, .9987 73%, 1.004 75%, 1.008 77%, 1.011 80%, 1.012 83%, 1.01 87%, 1.002 95%, 1 99%, 1)`;

// --- Dialog examples ---

const DialogExample = () => {
  const classes = useStyles();

  return (
    <div className={classes.section}>
      <p className={classes.sectionTitle}>Dialog</p>
      <p className={classes.sectionDescription}>
        Override Dialog&apos;s <code>surfaceMotion</code> or DialogSurface&apos;s <code>backdropMotion</code> with a
        custom animation via a render function.
      </p>

      <div className={classes.buttons}>
        <Dialog
          surfaceMotion={{
            children: (_, props) => <SlideDialogMotion {...props}>{props.children}</SlideDialogMotion>,
            // children: (_, props) => <CustomDialogMotion {...props}>{props.children}</CustomDialogMotion>,
          }}
        >
          <DialogTrigger disableButtonEnhancement>
            <Button>Custom surface (slide)</Button>
          </DialogTrigger>
          <DialogSurface>
            <DialogBody>
              <DialogTitle>Custom surface motion</DialogTitle>
              <DialogContent>
                The <code>surfaceMotion</code> slot uses a render function to replace the default scale animation with a
                slide-in from the left.
              </DialogContent>
              <DialogActions>
                <DialogTrigger disableButtonEnhancement>
                  <Button appearance="secondary">Close</Button>
                </DialogTrigger>
              </DialogActions>
            </DialogBody>
          </DialogSurface>
        </Dialog>

        <Dialog>
          <DialogTrigger disableButtonEnhancement>
            <Button>Custom backdrop (radial)</Button>
          </DialogTrigger>
          <DialogSurface
            backdropMotion={{
              children: (_, props) => <RadialBackdropMotion {...props}>{props.children}</RadialBackdropMotion>,
            }}
          >
            <DialogBody>
              <DialogTitle>Custom backdrop motion</DialogTitle>
              <DialogContent>
                The <code>backdropMotion</code> slot uses a render function to replace the default fade with a radial
                gradient that scales in.
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

  return (
    <div className={classes.section}>
      <p className={classes.sectionTitle}>Drawer</p>
      <p className={classes.sectionDescription}>
        Override Drawer&apos;s <code>surfaceMotion</code> with a custom animation. This custom motion slides in with an
        overshoot, and exits like a soft-close drawer (hydraulic).
      </p>

      <div className={classes.drawerContainer}>
        <InlineDrawer
          surfaceMotion={{ children: (_, props) => <CustomSlideMotion {...props} /> }}
          // surfaceMotion={{ children: (_, props) => <SoftCloseDrawerMotion {...props} /> }}
          separator
          open={isOpen}
          style={{ backgroundColor: tokens.colorNeutralBackground6, marginLeft: '-5%', paddingLeft: '5%' }}
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
              Custom motion
            </DrawerHeaderTitle>
          </DrawerHeader>
          <DrawerBody>
            <p>
              The <code>surfaceMotion</code> slot uses a render function to apply a bouncy slide-in animation.
            </p>
          </DrawerBody>
        </InlineDrawer>

        <div className={classes.drawerContent}>
          <Button appearance="primary" onClick={() => setIsOpen(!isOpen)}>
            Toggle drawer
          </Button>
        </div>
      </div>
    </div>
  );
};

// --- Story ---

export const CustomMotion = (): JSXElement => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <DialogExample />
      <DrawerExample />
    </div>
  );
};

CustomMotion.storyName = 'Custom motion';
CustomMotion.parameters = {
  docs: {
    description: {
      story: description,
    },
  },
};
