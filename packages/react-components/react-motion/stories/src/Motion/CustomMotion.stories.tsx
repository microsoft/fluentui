import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  Dialog,
  tokens,
  DialogTrigger,
  DialogSurface,
  makeStyles,
  DialogTitle,
  DialogBody,
  DialogActions,
  DialogContent,
  Button,
  Link,
  createPresenceComponent,
  motionTokens,
} from '@fluentui/react-components';

const useStyles = makeStyles({
  wrapper: {
    display: 'flex',
    gap: '20px',
  },
});

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

export const CustomMotion = (): JSXElement => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <Dialog
        surfaceMotion={{
          children: (_, props) => <SlideDialogMotion {...props}>{props.children}</SlideDialogMotion>,
        }}
      >
        <DialogTrigger disableButtonEnhancement>
          <Button>Custom surface motion</Button>
        </DialogTrigger>
        <DialogSurface>
          <DialogBody>
            <DialogTitle>Custom surface motion</DialogTitle>
            <DialogContent>
              If you need to use a custom animation, you can use a render function inside <b>surfaceMotion</b> slot and
              apply your custom animation built with{' '}
              <Link href="https://react.fluentui.dev/?path=/docs/motion-apis-createpresencecomponent--docs">
                createPresenceComponent
              </Link>
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
          <Button>Custom backdrop</Button>
        </DialogTrigger>
        <DialogSurface
          backdropMotion={{
            children: (_, props) => <RadialBackdropMotion {...props}>{props.children}</RadialBackdropMotion>,
          }}
        >
          <DialogBody>
            <DialogTitle>Custom backdrop</DialogTitle>
            <DialogContent>Customized dimmed background motion</DialogContent>
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

CustomMotion.parameters = {
  docs: {
    description: {
      story: `If you need to use a custom animation, you can use a render function inside a slot and
apply your custom animation built with [createPresenceComponent](https://react.fluentui.dev/?path=/docs/motion-apis-createpresencecomponent--docs").`,
    },
  },
};
