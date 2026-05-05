# Motion/Motion Slot

Fluent components leverages the `@fluentui/react-motion` to handle animations. All components that expose a motion slot, can be configured in a similar way. For detailed guidance on creating animations using `@fluentui/react-motion`, refer to the [motion API](https://react.fluentui.dev/?path=/docs/motion-apis-createpresencecomponent--docs) documentation.

### Components using motion API

- Dialog
- Drawer
- Toast (_internally uses the motion API but does not expose a slot_)

For components that provide a slot to control animation, you can disable or customize the motion by configuring these slots.

## Examples

### Custom Motion

If you need to use a custom animation, you can use a render function inside a slot and
apply your custom animation built with [createPresenceComponent](https://react.fluentui.dev/?path=/docs/motion-apis-createpresencecomponent--docs").

```tsx
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
    {
      opacity: 0,
      transform: 'translateX(-100%)',
      boxShadow: '0px 0px 0px 0px rgba(0, 0, 0, 0.1)',
    },
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
```

### Disable Motion

In order to disable motion you can pass `null` to appropriate slot.

```tsx
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
```
