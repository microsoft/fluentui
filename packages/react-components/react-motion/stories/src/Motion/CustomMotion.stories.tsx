import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  Button,
  createPresenceComponent,
  createPresenceComponentVariant,
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
  OverlayDrawer,
  tokens,
} from '@fluentui/react-components';
import { Dismiss24Regular } from '@fluentui/react-icons';

import description from './CustomMotion.stories.md';
import { Slide, slideAtom } from '@fluentui/react-motion-components-preview';

// --- Custom motions for Dialog ---

const SlideDialogMotion = createPresenceComponent(() => {
  const keyframes = [
    { opacity: 0, transform: 'translateX(-100%)', boxShadow: '0px 0px 0px 0px rgba(0, 0, 0, 0.1)' },
    { opacity: 1, transform: 'translateX(0)', boxShadow: tokens.shadow64 },
  ];

  return {
    enter: {
      keyframes,
      easing: motionTokens.curveDecelerateMax,
      duration: motionTokens.durationGentle,
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

// https://robertpenner.com/fuse/#head_type=bezier&tail_type=spring&join=.5&head_bezier_x1=.15&head_bezier_y1=.57&head_bezier_x2=.85&head_bezier_y2=.18&bounces=4&decay=95&show_heatmap=true&show_grid=false
const curveResistanceSpring = `linear(0, .05458 1%, .09434 2%, .1256 3%, .1514 4%, .1731 5%, .1918 6%, .2081 7%, .2225 8%, .2353 9%, .2468 10%, .2669 12%, .2839 14%, .2988 16%, .3185 19%, .3551 25%, .3749 28%, .3896 30%, .4061 32%, .425 34%, .447 36%, .4593 37%, .4728 38%, .4876 39%, .5039 40%, .5218 41%, .5418 42%, .5641 43%, .5893 44%, .6179 45%, .651 46%, .6898 47%, .7364 48%, .795 49%, .8741 50%, .9676 51%, 1.058 52%, 1.131 53%, 1.184 54%, 1.217 55%, 1.23 56%, 1.226 57%, 1.207 58%, 1.177 59%, 1.14 60%, 1.057 62%, 1.018 63%, .9838 64%, .9557 65%, .9348 66%, .9215 67%, .9155 68%, .9161 69%, .9222 70%, .9326 71%, .946 72%, .9764 74%, .991 75%, 1.004 76%, 1.015 77%, 1.023 78%, 1.028 79%, 1.031 80%, 1.031 81%, 1.029 82%, 1.026 83%, 1.015 85%, 1.004 87%, .9951 89%, .992 90%, .9898 91%, .9885 93%, .9903 95%, 1)`;

// https://robertpenner.com/fuse/#head_type=bezier&tail_type=bounce&join=.793&head_bezier_x1=.15&head_bezier_y1=.57&head_bezier_x2=.85&head_bezier_y2=.18&bounces=2&decay=95&show_heatmap=true&show_grid=false
// const curveResistanceBounce = `linear(0, .04199 1%, .07554 2%, .1035 3%, .1276 4%, .1486 5%, .1672 6%, .1839 7%, .199 8%, .2128 9%, .2253 10%, .2476 12%, .2668 14%, .2835 16%, .2983 18%, .3178 21%, .3347 24%, .3546 28%, .4079 40%, .4269 44%, .4426 47%, .46 50%, .4797 53%, .4944 55%, .5106 57%, .5286 59%, .5487 61%, .5712 63%, .5968 65%, .6109 66%, .626 67%, .6422 68%, .6597 69%, .6786 70%, .6991 71%, .7216 72%, .7462 73%, .7734 74%, .8039 75%, .8383 76%, .8778 77%, .9243 78%, .9811 79%, .9897 80%, .9768 81%, .9656 82%, .9563 83%, .9487 84%, .9429 85%, .9389 86%, .9367 87%, .9362 88%, .9376 89%, .9407 90%, .9456 91%, .9523 92%, .9607 93%, .971 94%, .983 95%, .9968 96%, .9979 97%, .9968 98%, .9975 99%, 1)`;

//https:robertpenner.com/fuse/#head_type=power-back&tail_type=bounce&join=.361&head_overshoot=0&head_exponent=1.03&bounces=1&decay=76&duration=700&show_heatmap=true&show_grid=false
const curveGlideRelaxedBounce = `linear(0, .02484 1%, .1036 4%, .2116 8%, .3488 13%, .5156 19%, .7405 27%, .9959 36%, .9942 37%, .9752 40%, .9581 43%, .943 46%, .9298 49%, .9185 52%, .9091 55%, .9017 58%, .8962 61%, .8926 64%, .8909 67%, .8912 70%, .8934 73%, .8975 76%, .9036 79%, .9116 82%, .9215 85%, .9333 88%, .9471 91%, .9628 94%, .9804 97%, 1)`;

// https://robertpenner.com/fuse/#head_type=power-back&tail_type=power-back&join=.361&head_overshoot=0&head_exponent=1.03&tail_overshoot=30&tail_exponent=3.03&duration=700&show_heatmap=true&show_grid=false
const curveGlideRelaxedBack = `linear(0, .0396 2%, .1228 6%, .2292 11%, .3807 18%, .5559 26%, .7773 36%, .7992 37%, .82 38%, .8397 39%, .8762 41%, .9088 43%, .9377 45%, .9632 47%, .9853 49%, 1.004 51%, 1.02 53%, 1.034 55%, 1.044 57%, 1.053 59%, 1.059 61%, 1.063 63%, 1.065 65%, 1.066 67%, 1.064 70%, 1.06 73%, 1.053 76%, 1.04 81%, 1.019 88%, 1.009 92%, 1.004 95%, 1.001 98%, 1)`;

// https://robertpenner.com/fuse/#head_type=power-back&tail_type=power-back&join=.501&head_overshoot=0&head_exponent=1.03&tail_overshoot=30&tail_exponent=3.03&show_heatmap=true
const curveGlideRelaxedBack2 = `linear(0, .04109 3%, .1128 8%, .2304 16%, .3799 26%, .5616 38%, .7758 52%, .899 60%, .9142 61%, .9284 62%, .9414 63%, .9533 64%, .9642 65%, .9829 67%, .9978 69%, 1.009 71%, 1.018 73%, 1.024 75%, 1.027 77%, 1.028 79%, 1.028 81%, 1.025 84%, 1.018 88%, 1.007 93%, 1.003 96%, 1 99%, 1)`;

// EXIT EASINGS

// https://robertpenner.com/fuse/#head_type=power-back&tail_type=bounce&join=.497&head_overshoot=0&head_exponent=.56&bounces=3&decay=90&show_heatmap=true
const curveSqrtBounce = `linear(0, .1122 1%, .1654 2%, .2076 3%, .2439 4%, .2763 5%, .306 6%, .3336 7%, .3595 8%, .384 9%, .4074 10%, .4511 12%, .4918 14%, .53 16%, .5661 18%, .6005 20%, .6494 23%, .6956 26%, .7395 29%, .7814 32%, .8216 35%, .8729 39%, .922 43%, .969 47%, .9919 49%, .9982 50%, .9868 52%, .9772 54%, .9695 56%, .9638 58%, .9599 60%, .9579 62%, .9578 64%, .9596 66%, .9633 68%, .9689 70%, .9764 72%, .9857 74%, .997 76%, .9982 77%, .9925 79%, .9887 81%, .9868 83%, .9868 85%, .9887 87%, .9925 89%, .9982 91%, .9991 92%, .9965 94%, .9958 96%, .9969 98%, 1)`;

// --- Custom motion for Drawer ---

const CustomSlideMotion = createPresenceComponent(() => {
  return {
    enter: {
      // Slide in from the left
      keyframes: [{ translate: '-100% 0' }, { translate: '0 0' }],
      duration: motionTokens.durationUltraSlow * 2,
      easing: curveGlideRelaxedBack2,
    },
    exit: {
      // Slide out to the left
      keyframes: [{ translate: '0 0' }, { translate: '-100% 0' }],
      duration: motionTokens.durationUltraSlow * 2,
      // easing: motionTokens.curveAccelerateMid,
      easing: curveSqrtBounce,
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
        Override Dialog&apos;s <code>surfaceMotion</code> or DialogSurface&apos;s <code>backdropMotion</code> with a
        custom animation via a render function.
      </p>

      <div className={classes.buttons}>
        <Dialog
          surfaceMotion={{
            children: (_, props) => <SlideDialogMotion {...props}>{props.children}</SlideDialogMotion>,
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
        Override Drawer&apos;s <code>surfaceMotion</code> with a custom animation. This example replaces the default
        slide with a slide that overshoots.
      </p>

      <div className={classes.drawerContainer}>
        <InlineDrawer
          surfaceMotion={{ children: (_, props) => <CustomSlideMotion {...props} /> }}
          separator
          open={isOpen}
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

CustomMotion.parameters = {
  docs: {
    description: {
      story: description,
    },
  },
};
