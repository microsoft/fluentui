# Motion/APIs/createPresenceComponent

`createPresenceComponent()` is a factory function that creates a React component based on the provided presence definition. This component can be used to animate any element and intended to have a state via the `visible` prop.

## Examples

### Default

```tsx
import {
  createPresenceComponent,
  Field,
  makeStyles,
  motionTokens,
  tokens,
  Switch,
  PresenceComponentProps,
} from '@fluentui/react-components';
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';

const useClasses = makeStyles({
  container: {
    display: 'grid',
    gridTemplate: `"card card" "controls ." / 1fr 1fr`,
    gap: '20px 10px',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'end',
    gridArea: 'card',

    border: `${tokens.strokeWidthThicker} solid ${tokens.colorNeutralForeground3}`,
    borderRadius: tokens.borderRadiusMedium,
    boxShadow: tokens.shadow16,
    padding: '10px',
    paddingTop: '100px',
  },
  controls: {
    display: 'flex',
    flexDirection: 'column',
    gridArea: 'controls',

    border: `${tokens.strokeWidthThicker} solid ${tokens.colorNeutralForeground3}`,
    borderRadius: tokens.borderRadiusMedium,
    boxShadow: tokens.shadow16,
    padding: '10px',
  },
  field: {
    flex: 1,
  },

  item: {
    backgroundColor: tokens.colorBrandBackground,
    border: `${tokens.strokeWidthThicker} solid ${tokens.colorTransparentStroke}`,
    borderRadius: '50%',

    width: '100px',
    height: '100px',
  },
});

const Fade = createPresenceComponent({
  enter: {
    keyframes: [{ opacity: 0 }, { opacity: 1 }],
    duration: motionTokens.durationSlow,
  },
  exit: {
    keyframes: [{ opacity: 1 }, { opacity: 0 }],
    duration: motionTokens.durationSlow,
  },
});

export const CreatePresenceComponentDefault = (props: PresenceComponentProps): JSXElement => {
  const classes = useClasses();
  const [visible, setVisible] = React.useState<boolean>(false);

  return (
    <div className={classes.container}>
      <div className={classes.card}>
        <Fade visible={visible}>
          <div className={classes.item} />
        </Fade>
      </div>

      <div className={classes.controls}>
        <Field className={classes.field}>
          <Switch label="Visible" checked={visible} onChange={() => setVisible(v => !v)} />
        </Field>
      </div>
    </div>
  );
};
```

### In And Out

Every presence component has two halves, the `enter` and `exit` motions, which can be played in isolation using the static `.In` and `.Out` methods.

For example, a presence called `MyFade` will contain `<MyFade.In>` and `<MyFade.Out>` motion components, which play the `enter` and `exit` as one-off motions:

```tsx
// Create the presence component

const MyFade = createPresenceComponent({
  enter: {
    keyframes: [{ opacity: 0 }, { opacity: 1 }],
    duration: 4000,
  },

  exit: {
    keyframes: [{ opacity: 1 }, { opacity: 0 }],
    duration: 2000,
  },
});
```

In the render, each of the 2 motions can be played separately:

```tsx
// plays the enter animation (4000 ms fade-in)
<MyFade.In>
  {/* Content */}
</MyFade.In>

// plays the exit animation (2000 ms fade-out)
<MyFade.Out>
  {/* Content */}
</MyFade.Out>
```

This can be useful when choreographing a series of motions, or mixing and matching the enter and exit animations from different presence components.

```tsx
import { createPresenceComponent, makeStyles, tokens } from '@fluentui/react-components';
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';

const useClasses = makeStyles({
  container: {
    display: 'grid',
    gridTemplate: `"card card" "controls ." / 1fr 1fr`,
    gap: '20px 10px',
  },

  card: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    gridArea: 'card',

    border: `${tokens.strokeWidthThicker} solid ${tokens.colorNeutralForeground3}`,
    borderRadius: tokens.borderRadiusMedium,
    boxShadow: tokens.shadow16,
    padding: '10px',
  },

  item: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: tokens.colorBrandBackground,
    border: `${tokens.strokeWidthThicker} solid ${tokens.colorTransparentStroke}`,
    borderRadius: '50%',

    width: '100px',
    height: '100px',
    color: 'white',
  },
});

const MyFade = createPresenceComponent({
  enter: {
    keyframes: [{ opacity: 0 }, { opacity: 1 }],
    duration: 4000,
    iterations: Infinity,
    reducedMotion: {
      duration: 8000,
    },
  },

  exit: {
    keyframes: [{ opacity: 1 }, { opacity: 0 }],
    duration: 2000,
    iterations: Infinity,
    reducedMotion: {
      duration: 8000,
    },
  },
});

export const CreatePresenceComponentInAndOut = (): JSXElement => {
  const classes = useClasses();

  return (
    <div className={classes.container}>
      <div className={classes.card}>
        <MyFade.In>
          <div className={classes.item}>MyFade.In</div>
        </MyFade.In>
        <MyFade.Out>
          <div className={classes.item}>MyFade.Out</div>
        </MyFade.Out>
      </div>
    </div>
  );
};
```

### Lifecycle Callbacks

A React component created with `createPresenceComponent` has the following lifecycle callbacks:

- `onMotionStart` \- This is called when any motion has started
- `onMotionFinish` \- This is called when all motions have finished
- `onMotionCancel` \- This is called when the motino is cancelled and is called instead of `onMotionFinish`

These callbacks can be useful when orchestrating motions or running side effects resulting from a motion.
The lifecycle callbacks apply to both `enter` and `exit` motion definitions.

```tsx
import {
  createPresenceComponent,
  Field,
  makeStyles,
  mergeClasses,
  type MotionImperativeRef,
  motionTokens,
  Slider,
  Switch,
  Text,
  tokens,
  useId,
} from '@fluentui/react-components';
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';

const useClasses = makeStyles({
  container: {
    display: 'grid',
    gridTemplate: `"card logs" "controls ." / 1fr 1fr`,
    gap: '20px 10px',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'end',
    gridArea: 'card',

    border: `${tokens.strokeWidthThicker} solid ${tokens.colorNeutralForeground3}`,
    borderRadius: tokens.borderRadiusMedium,
    boxShadow: tokens.shadow16,
    padding: '10px',
  },
  controls: {
    display: 'flex',
    flexDirection: 'column',
    gridArea: 'controls',

    border: `${tokens.strokeWidthThicker} solid ${tokens.colorNeutralForeground3}`,
    borderRadius: tokens.borderRadiusMedium,
    boxShadow: tokens.shadow16,
    padding: '10px',
  },
  field: {
    flex: 1,
  },
  sliderField: {
    gridTemplateColumns: 'min-content 1fr',
  },
  sliderLabel: {
    textWrap: 'nowrap',
  },

  item: {
    backgroundColor: tokens.colorBrandBackground,
    border: `${tokens.strokeWidthThicker} solid ${tokens.colorTransparentStroke}`,
    borderRadius: '50%',

    width: '100px',
    height: '100px',
  },

  logContainer: {
    display: 'flex',
    flexDirection: 'column',
    gridArea: 'logs',
  },
  logLabel: {
    color: tokens.colorNeutralForegroundOnBrand,
    backgroundColor: tokens.colorNeutralForeground3,
    width: 'fit-content',
    alignSelf: 'end',
    fontWeight: tokens.fontWeightBold,
    padding: '2px 12px',
    borderRadius: `${tokens.borderRadiusMedium} ${tokens.borderRadiusMedium} 0 0`,
  },
  log: {
    overflowY: 'auto',
    position: 'relative',
    height: '200px',
    border: `${tokens.strokeWidthThicker} solid ${tokens.colorNeutralForeground3}`,
    borderRadius: tokens.borderRadiusMedium,
    borderTopRightRadius: 0,
    padding: '10px',
  },
});

const Fade = createPresenceComponent({
  enter: {
    keyframes: [{ opacity: 0 }, { opacity: 1 }],
    duration: motionTokens.durationSlow,
  },
  exit: {
    keyframes: [{ opacity: 1 }, { opacity: 0 }],
    duration: motionTokens.durationSlow,
  },
});

export const CreatePresenceComponentLifecycleCallbacks = (): JSXElement => {
  const classes = useClasses();
  const logLabelId = useId();

  const motionRef = React.useRef<MotionImperativeRef>(null);
  const [statusLog, setStatusLog] = React.useState<[number, string, string][]>([]);

  const [playbackRate, setPlaybackRate] = React.useState<number>(30);
  const [visible, setVisible] = React.useState<boolean>(true);

  // Heads up!
  // This is optional and is intended solely to slow down the animations, making motions more visible in the examples.
  React.useEffect(() => {
    motionRef.current?.setPlaybackRate(playbackRate / 100);
  }, [playbackRate, visible]);

  return (
    <div className={classes.container}>
      <div className={classes.card}>
        <Fade
          imperativeRef={motionRef}
          onMotionStart={(ev, data) => {
            setStatusLog(entries => [[Date.now(), 'onMotionStart', data.direction], ...entries]);
          }}
          onMotionFinish={(ev, data) => {
            setStatusLog(entries => [[Date.now(), 'onMotionFinish', data.direction], ...entries]);
          }}
          onMotionCancel={(ev, data) => {
            setStatusLog(entries => [[Date.now(), 'onMotionCancel', data.direction], ...entries]);
          }}
          visible={visible}
        >
          <div className={classes.item} />
        </Fade>
      </div>

      <div className={classes.logContainer}>
        <div className={classes.logLabel} id={logLabelId}>
          Status log
        </div>
        <div role="log" aria-labelledby={logLabelId} className={classes.log}>
          {statusLog.map(([time, callbackName, direction], i) => (
            <div key={i}>
              {new Date(time).toLocaleTimeString()} <Text weight="bold">{callbackName}</Text> (direction: {direction})
            </div>
          ))}
        </div>
      </div>

      <div className={classes.controls}>
        <Field className={classes.field}>
          <Switch label="Visible" checked={visible} onChange={() => setVisible(v => !v)} />
        </Field>
        <Field
          className={mergeClasses(classes.field, classes.sliderField)}
          label={{
            children: (
              <>
                <code>playbackRate</code>: {playbackRate}%
              </>
            ),

            className: classes.sliderLabel,
          }}
          orientation="horizontal"
        >
          <Slider
            aria-valuetext={`Value is ${playbackRate}%`}
            value={playbackRate}
            onChange={(ev, data) => setPlaybackRate(data.value)}
            min={0}
            max={100}
            step={5}
          />
        </Field>
      </div>
    </div>
  );
};
```

### Appear

By default, the child component does not perform the enter animation when it first mounts, regardless of the value of `visible`. If you want this behavior, set both `appear` and `visible` props to be true.

```tsx
import {
  createPresenceComponent,
  Field,
  makeStyles,
  mergeClasses,
  type MotionImperativeRef,
  motionTokens,
  Slider,
  Switch,
  tokens,
} from '@fluentui/react-components';
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';

const useClasses = makeStyles({
  container: {
    display: 'grid',
    gridTemplate: `"card card" "controls ." / 1fr 1fr`,
    gap: '20px 10px',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'end',
    gridArea: 'card',

    border: `${tokens.strokeWidthThicker} solid ${tokens.colorNeutralForeground3}`,
    borderRadius: tokens.borderRadiusMedium,
    boxShadow: tokens.shadow16,
    padding: '10px',
  },
  controls: {
    display: 'flex',
    flexDirection: 'column',
    gridArea: 'controls',

    border: `${tokens.strokeWidthThicker} solid ${tokens.colorNeutralForeground3}`,
    borderRadius: tokens.borderRadiusMedium,
    boxShadow: tokens.shadow16,
    padding: '10px',
  },
  field: {
    flex: 1,
  },
  sliderField: {
    gridTemplateColumns: 'min-content 1fr',
  },
  sliderLabel: {
    textWrap: 'nowrap',
  },

  item: {
    backgroundColor: tokens.colorBrandBackground,
    border: `${tokens.strokeWidthThicker} solid ${tokens.colorTransparentStroke}`,
    borderRadius: '50%',

    width: '100px',
    height: '100px',
  },
});

const Fade = createPresenceComponent({
  enter: {
    keyframes: [{ opacity: 0 }, { opacity: 1 }],
    duration: motionTokens.durationSlow,
  },
  exit: {
    keyframes: [{ opacity: 1 }, { opacity: 0 }],
    duration: motionTokens.durationSlow,
  },
});

export const CreatePresenceComponentAppear = (): JSXElement => {
  const classes = useClasses();
  const motionRef = React.useRef<MotionImperativeRef>(null);

  const [playbackRate, setPlaybackRate] = React.useState<number>(30);
  const [isMounted, setIsMounted] = React.useState<boolean>(false);

  // Heads up!
  // This is optional and is intended solely to slow down the animations, making motions more visible in the examples.
  React.useEffect(() => {
    motionRef.current?.setPlaybackRate(playbackRate / 100);
  }, [playbackRate, isMounted]);

  return (
    <div className={classes.container}>
      <div className={classes.card}>
        {isMounted && (
          <Fade appear imperativeRef={motionRef} visible>
            <div className={classes.item} />
          </Fade>
        )}
      </div>
      <div className={classes.controls}>
        <Field className={classes.field}>
          <Switch label="Mount an element?" checked={isMounted} onChange={() => setIsMounted(v => !v)} />
        </Field>
        <Field
          className={mergeClasses(classes.field, classes.sliderField)}
          label={{
            children: (
              <>
                <code>playbackRate</code>: {playbackRate}%
              </>
            ),

            className: classes.sliderLabel,
          }}
          orientation="horizontal"
        >
          <Slider
            aria-valuetext={`Value is ${playbackRate}%`}
            value={playbackRate}
            onChange={(ev, data) => setPlaybackRate(data.value)}
            min={0}
            max={100}
            step={5}
          />
        </Field>
      </div>
    </div>
  );
};
```

### Arrays

`createPresenceComponent()` supports arrays of `AtomMotion` objects. This is useful when you want to animate properties with _different_ durations, easings, etc.

```ts
const FastFadeSlowScale = createPresenceComponent({
  enter: [
    {
      keyframes: [{ opacity: 0 }, { opacity: 1 }],
      duration: 200,
      easing: 'easeIn',
    },
    {
      keyframes: [{ transform: 'scale(0)' }, { transform: 'scale(1)' }],
      duration: 500 /* 💡 note the different duration */,
      easing: 'cubic-bezier(0.42, 0, 0.58, 1)' /* 💡 note the different easing */,
    },
  ],
  exit: {
    /* ... */
  },
});
```

```tsx
import {
  createPresenceComponent,
  Field,
  makeStyles,
  mergeClasses,
  type MotionImperativeRef,
  motionTokens,
  Slider,
  Switch,
  tokens,
} from '@fluentui/react-components';
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';

const useClasses = makeStyles({
  container: {
    display: 'grid',
    gridTemplate: `"card card" "controls ." / 1fr 1fr`,
    gap: '20px 10px',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'end',
    gridArea: 'card',

    border: `${tokens.strokeWidthThicker} solid ${tokens.colorNeutralForeground3}`,
    borderRadius: tokens.borderRadiusMedium,
    boxShadow: tokens.shadow16,
    padding: '10px',
  },
  controls: {
    display: 'flex',
    flexDirection: 'column',
    gridArea: 'controls',

    border: `${tokens.strokeWidthThicker} solid ${tokens.colorNeutralForeground3}`,
    borderRadius: tokens.borderRadiusMedium,
    boxShadow: tokens.shadow16,
    padding: '10px',
  },
  field: {
    flex: 1,
  },
  sliderField: {
    gridTemplateColumns: 'min-content 1fr',
  },
  sliderLabel: {
    textWrap: 'nowrap',
  },

  balloon: {
    display: 'inline-block',
    width: '80px',
    height: '100px',
    backgroundColor: tokens.colorBrandBackground,
    borderRadius: '80%',
    position: 'relative',
    boxShadow: 'inset -10px -10px 0 rgba(0,0,0,0.07)',
    margin: '20px 30px',
    zIndex: 1,

    '::before': {
      content: "'▲'",
      fontSize: '20px',
      color: tokens.colorCompoundBrandBackgroundPressed,
      display: 'block',
      textAlign: 'center',
      width: '100%',
      position: 'absolute',
      bottom: '-12px',
      zIndex: -1,
    },
  },
});

const FastFadeSlowScale = createPresenceComponent({
  enter: [
    {
      keyframes: [{ opacity: 0 }, { opacity: 1 }],
      duration: motionTokens.durationFast,
      easing: motionTokens.curveLinear,
    },
    {
      keyframes: [{ transform: 'scale(0)' }, { transform: 'scale(1)' }],
      duration: motionTokens.durationSlow,
      easing: motionTokens.curveEasyEase,
    },
  ],

  exit: {
    keyframes: [{ opacity: 1 }, { opacity: 0 }],
    duration: motionTokens.durationSlow,
  },
});

export const CreatePresenceComponentArrays = (): JSXElement => {
  const classes = useClasses();

  const motionRef = React.useRef<MotionImperativeRef>(null);
  const ref = React.useRef<HTMLDivElement>(null);

  const [visible, setVisible] = React.useState<boolean>(true);
  const [playbackRate, setPlaybackRate] = React.useState<number>(30);

  // Heads up!
  // This is optional and is intended solely to slow down the animations, making motions more visible in the examples.
  React.useEffect(() => {
    motionRef.current?.setPlaybackRate(playbackRate / 100);
  }, [playbackRate, visible]);

  return (
    <div className={classes.container}>
      <div className={classes.card}>
        <FastFadeSlowScale imperativeRef={motionRef} visible={visible}>
          <div ref={ref} className={classes.balloon} />
        </FastFadeSlowScale>
      </div>

      <div className={classes.controls}>
        <Field className={classes.field}>
          <Switch label="Visible" checked={visible} onChange={() => setVisible(v => !v)} />
        </Field>
        <Field
          className={mergeClasses(classes.field, classes.sliderField)}
          label={{
            children: (
              <>
                <code>playbackRate</code>: {playbackRate}%
              </>
            ),

            className: classes.sliderLabel,
          }}
          orientation="horizontal"
        >
          <Slider
            aria-valuetext={`Value is ${playbackRate}%`}
            value={playbackRate}
            onChange={(ev, data) => setPlaybackRate(data.value)}
            min={0}
            max={100}
            step={5}
          />
        </Field>
      </div>
    </div>
  );
};
```

### Create Presence Component

You can create completely custom motions with `createPresenceComponent()` factory. `PresenceMotion` contains definitions for `enter` and `exit` atoms defined by `AtomMotion` interface:

```tsx
import { type AtomMotion, createPresenceComponent, type PresenceMotion } from '@fluentui/react-components';

const enterAtom: AtomMotion = {
  // opacity will be animated from 0 to 1
  keyframes: { opacity: [0, 1] },
  // duration of the animation will be "1000ms"
  duration: 1000,
};

const exitAtom: AtomMotion = {
  // opacity will be animated from 1 to 0
  keyframes: { opacity: [1, 0] },
  // duration of the animation will be "500ms"
  duration: 500,
};

const presense: PresenceMotion = {
  enter: enterAtom,
  exit: exitAtom,
};

const Fade = createPresenceComponent(presense);
```

```tsx
import {
  createPresenceComponent,
  Field,
  makeStyles,
  type MotionImperativeRef,
  tokens,
  Switch,
} from '@fluentui/react-components';
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';

const useClasses = makeStyles({
  container: {
    display: 'grid',
    gridTemplate: `"card card" "controls ." / 1fr 1fr`,
    gap: '20px 10px',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'end',
    gridArea: 'card',

    border: `${tokens.strokeWidthThicker} solid ${tokens.colorNeutralForeground3}`,
    borderRadius: tokens.borderRadiusMedium,
    boxShadow: tokens.shadow16,
    padding: '10px',
    paddingTop: '100px',
  },
  controls: {
    display: 'flex',
    flexDirection: 'column',
    gridArea: 'controls',

    border: `${tokens.strokeWidthThicker} solid ${tokens.colorNeutralForeground3}`,
    borderRadius: tokens.borderRadiusMedium,
    boxShadow: tokens.shadow16,
    padding: '10px',
  },
  field: {
    flex: 1,
  },

  item: {
    backgroundColor: tokens.colorBrandBackground,
    border: `${tokens.strokeWidthThicker} solid ${tokens.colorTransparentStroke}`,
    borderRadius: '50%',

    width: '100px',
    height: '100px',
  },
});

const DropIn = createPresenceComponent({
  enter: {
    keyframes: [
      { transform: 'rotate(-30deg) translateY(-100%)', opacity: 0 },
      { transform: 'rotate(0deg) translateY(0%)', opacity: 1 },
    ],

    duration: 2000,
  },
  exit: {
    keyframes: [{ opacity: 1 }, { opacity: 0 }],
    duration: 1000,
  },
});

export const CreatePresenceComponentFactory = (): JSXElement => {
  const classes = useClasses();

  const motionRef = React.useRef<MotionImperativeRef>(null);
  const [visible, setVisible] = React.useState<boolean>(false);

  return (
    <div className={classes.container}>
      <div className={classes.card}>
        <DropIn imperativeRef={motionRef} visible={visible}>
          <div className={classes.item} />
        </DropIn>
      </div>

      <div className={classes.controls}>
        <Field className={classes.field}>
          <Switch label="Visible" checked={visible} onChange={() => setVisible(v => !v)} />
        </Field>
      </div>
    </div>
  );
};
```

### Function Params

Functions in presence definitions also can be used to define motion parameters, this is useful when motion has different variations.

```tsx
const Scale = createPresenceComponent<{ startFrom?: number }>(({ startFrom = 0.5 }) => {
  const keyframes = [
    { opacity: 0, transform: `scale(${startFrom})` },
    { opacity: 1, transform: 'scale(1)' },
  ];

  return {
    enter: {
      keyframes,
      duration: motionTokens.durationUltraSlow,
    },
    exit: {
      keyframes: [...keyframes].reverse(),
      duration: motionTokens.durationSlow,
    },
  };
});
```

```tsx
import {
  createPresenceComponent,
  Field,
  makeStyles,
  mergeClasses,
  type MotionImperativeRef,
  motionTokens,
  Slider,
  Switch,
  tokens,
} from '@fluentui/react-components';
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';

const useClasses = makeStyles({
  container: {
    display: 'grid',
    gridTemplate: `"cardA cardB" "controls ." / 1fr 1fr`,
    gap: '20px 10px',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'end',

    border: `${tokens.strokeWidthThicker} solid ${tokens.colorNeutralForeground3}`,
    borderRadius: tokens.borderRadiusMedium,
    boxShadow: tokens.shadow16,
    padding: '10px',
  },
  controls: {
    display: 'flex',
    flexDirection: 'column',
    gridArea: 'controls',

    border: `${tokens.strokeWidthThicker} solid ${tokens.colorNeutralForeground3}`,
    borderRadius: tokens.borderRadiusMedium,
    boxShadow: tokens.shadow16,
    padding: '10px',
  },
  field: {
    flex: 1,
  },
  sliderField: {
    gridTemplateColumns: 'min-content 1fr',
  },
  sliderLabel: {
    textWrap: 'nowrap',
  },

  cardA: {
    gridArea: 'cardA',
  },
  cardB: {
    gridArea: 'cardB',
  },
  item: {
    backgroundColor: tokens.colorBrandBackground,
    border: `${tokens.strokeWidthThicker} solid ${tokens.colorTransparentStroke}`,
    borderRadius: '50%',

    width: '100px',
    height: '100px',
  },
  description: {
    fontFamily: tokens.fontFamilyMonospace,
    borderRadius: tokens.borderRadiusMedium,
    marginTop: '10px',
    padding: '5px 10px',
    backgroundColor: tokens.colorNeutralBackground1Pressed,
  },
});

const Scale = createPresenceComponent<{ startFrom?: number }>(({ startFrom = 0.5 }) => {
  const keyframes = [
    { opacity: 0, transform: `scale(${startFrom})` },
    { opacity: 1, transform: 'scale(1)' },
  ];

  return {
    enter: {
      keyframes,
      duration: motionTokens.durationUltraSlow,
    },
    exit: {
      keyframes: [...keyframes].reverse(),
      duration: motionTokens.durationSlow,
    },
  };
});

export const CreatePresenceComponentFunctionParams = (): JSXElement => {
  const classes = useClasses();

  const motionBRef = React.useRef<MotionImperativeRef>(null);
  const motionARef = React.useRef<MotionImperativeRef>(null);

  const [playbackRate, setPlaybackRate] = React.useState<number>(30);
  const [visible, setVisible] = React.useState<boolean>(true);

  // Heads up!
  // This is optional and is intended solely to slow down the animations, making motions more visible in the examples.
  React.useEffect(() => {
    motionARef.current?.setPlaybackRate(playbackRate / 100);
    motionBRef.current?.setPlaybackRate(playbackRate / 100);
  }, [playbackRate, visible]);

  return (
    <div className={classes.container}>
      <div className={mergeClasses(classes.card, classes.cardA)}>
        <Scale imperativeRef={motionARef} startFrom={0.1} visible={visible}>
          <div className={classes.item} />
        </Scale>
        <div className={classes.description}>startFrom=0.1</div>
      </div>
      <div className={mergeClasses(classes.card, classes.cardB)}>
        <Scale imperativeRef={motionBRef} startFrom={0.8} visible={visible}>
          <div className={classes.item} />
        </Scale>
        <div className={classes.description}>startFrom=0.8</div>
      </div>

      <div className={classes.controls}>
        <Field className={classes.field}>
          <Switch label="Visible" checked={visible} onChange={() => setVisible(v => !v)} />
        </Field>
        <Field
          className={mergeClasses(classes.field, classes.sliderField)}
          label={{
            children: (
              <>
                <code>playbackRate</code>: {playbackRate}%
              </>
            ),

            className: classes.sliderLabel,
          }}
          orientation="horizontal"
        >
          <Slider
            aria-valuetext={`Value is ${playbackRate}%`}
            value={playbackRate}
            onChange={(ev, data) => setPlaybackRate(data.value)}
            min={0}
            max={100}
            step={5}
          />
        </Field>
      </div>
    </div>
  );
};
```

### Functions

Presence definitions can be also defined as functions that accept an animated element as an argument. This allows to define more complex animations that depend on the animated element's properties, for example:

```ts
const Collapse = createPresenceComponent(({ element }) => {
  const duration = 500;
  const keyframes = [
    { opacity: 0, maxHeight: '0px', overflow: 'hidden' },
    { opacity: 1, maxHeight: `${element.scrollHeight}px`, overflow: 'hidden' },
  ];

  return {
    enter: { duration, keyframes },
    exit: { duration, keyframes: [...keyframes].reverse() },
  };
});
```

```tsx
import {
  createPresenceComponent,
  Field,
  makeStyles,
  mergeClasses,
  type MotionImperativeRef,
  type PresenceMotionFn,
  Slider,
  Switch,
  tokens,
} from '@fluentui/react-components';
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';

const useClasses = makeStyles({
  container: {
    display: 'grid',
    gridTemplate: `"cardA cardB" "controls ." / 1fr 1fr`,
    gap: '20px 10px',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'end',

    border: `${tokens.strokeWidthThicker} solid ${tokens.colorNeutralForeground3}`,
    borderRadius: tokens.borderRadiusMedium,
    boxShadow: tokens.shadow16,
    padding: '10px',

    minHeight: '230px',
  },
  controls: {
    display: 'flex',
    flexDirection: 'column',
    gridArea: 'controls',

    border: `${tokens.strokeWidthThicker} solid ${tokens.colorNeutralForeground3}`,
    borderRadius: tokens.borderRadiusMedium,
    boxShadow: tokens.shadow16,
    padding: '10px',
  },
  field: {
    flex: 1,
  },
  sliderField: {
    gridTemplateColumns: 'min-content 1fr',
  },
  sliderLabel: {
    textWrap: 'nowrap',
  },

  cardA: {
    gridArea: 'cardA',
  },
  cardB: {
    gridArea: 'cardB',
  },
  item: {
    border: `${tokens.strokeWidthThicker} solid ${tokens.colorBrandBackground}`,
    padding: '8px',

    width: '300px',
  },
  description: {
    fontFamily: tokens.fontFamilyMonospace,
    borderRadius: tokens.borderRadiusMedium,
    marginTop: '10px',
    padding: '5px 10px',
    backgroundColor: tokens.colorNeutralBackground1Pressed,
  },
});

const collapseMotion: PresenceMotionFn = ({ element }) => {
  const duration = 500;
  const keyframes = [
    { opacity: 0, maxHeight: '0px', overflow: 'hidden' },
    { opacity: 1, maxHeight: `${element.scrollHeight}px`, overflow: 'hidden' },
  ];

  return {
    enter: { duration, keyframes },
    exit: { duration, keyframes: [...keyframes].reverse() },
  };
};
const Collapse = createPresenceComponent(collapseMotion);

export const CreatePresenceComponentFunctions = (): JSXElement => {
  const classes = useClasses();

  const motionInRef = React.useRef<MotionImperativeRef>(null);
  const motionOutRef = React.useRef<MotionImperativeRef>(null);

  const [playbackRate, setPlaybackRate] = React.useState<number>(30);
  const [visible, setVisible] = React.useState<boolean>(true);

  // Heads up!
  // This is optional and is intended solely to slow down the animations, making motions more visible in the examples.
  React.useEffect(() => {
    motionInRef.current?.setPlaybackRate(playbackRate / 100);
    motionOutRef.current?.setPlaybackRate(playbackRate / 100);
  }, [playbackRate, visible]);

  return (
    <div className={classes.container}>
      <div className={mergeClasses(classes.card, classes.cardA)}>
        <Collapse imperativeRef={motionInRef} visible={visible}>
          <div className={classes.item}>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Sed vel lectus. Donec odio tempus molestie,
            porttitor ut, iaculis quis, sem. Integer vulputate sem a nibh rutrum consequat. Etiam quis quam. Curabitur
            sagittis hendrerit ante. Duis ante orci, molestie vitae vehicula venenatis, tincidunt ac pede.
          </div>
        </Collapse>
        <div className={classes.description}>normal state</div>
      </div>
      <div className={mergeClasses(classes.card, classes.cardB)}>
        <Collapse imperativeRef={motionOutRef} visible={!visible}>
          <div className={classes.item}>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Sed vel lectus. Donec odio tempus molestie,
            porttitor ut, iaculis quis, sem. Integer vulputate sem a nibh rutrum consequat. Etiam quis quam. Curabitur
            sagittis hendrerit ante. Duis ante orci, molestie vitae vehicula venenatis, tincidunt ac pede.
          </div>
        </Collapse>
        <div className={classes.description}>reversed state</div>
      </div>

      <div className={classes.controls}>
        <Field className={classes.field}>
          <Switch label="Visible" checked={visible} onChange={() => setVisible(v => !v)} />
        </Field>
        <Field
          className={mergeClasses(classes.field, classes.sliderField)}
          label={{
            children: (
              <>
                <code>playbackRate</code>: {playbackRate}%
              </>
            ),

            className: classes.sliderLabel,
          }}
          orientation="horizontal"
        >
          <Slider
            aria-valuetext={`Value is ${playbackRate}%`}
            value={playbackRate}
            onChange={(ev, data) => setPlaybackRate(data.value)}
            min={0}
            max={100}
            step={5}
          />
        </Field>
      </div>
    </div>
  );
};
```

### Reduced Motion

By default, when [reduced motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion) is enabled the duration of the animation is set to `1ms`. `reducedMotion` allows to customize a reduced motion version of the animation:

```ts
const Motion = createPresenceComponent({
  enter: {
    keyframes: [
      { opacity: 0, transform: 'scale(0)' },
      { opacity: 1, transform: 'scale(1)' },
    ],
    duration: 300,

    /* 💡reduced motion will not have scale animation */
    reducedMotion: {
      keyframes: [{ opacity: 0 }, { opacity: 1 }],
      duration: 1000,
    },
  },
  exit: {
    /* ... */
  },
});
```

> 💡Note, if `keyframes` are provided, they will be used instead of the regular keyframes.

```tsx
import {
  createPresenceComponent,
  Field,
  makeStyles,
  mergeClasses,
  type MotionImperativeRef,
  motionTokens,
  Slider,
  Switch,
  tokens,
} from '@fluentui/react-components';
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';

const useClasses = makeStyles({
  container: {
    display: 'grid',
    gridTemplate: `"card card" "controls ." / 1fr 1fr`,
    gap: '20px 10px',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'end',
    gridArea: 'card',

    border: `${tokens.strokeWidthThicker} solid ${tokens.colorNeutralForeground3}`,
    borderRadius: tokens.borderRadiusMedium,
    boxShadow: tokens.shadow16,
    padding: '10px',
  },
  controls: {
    display: 'flex',
    flexDirection: 'column',
    gridArea: 'controls',

    border: `${tokens.strokeWidthThicker} solid ${tokens.colorNeutralForeground3}`,
    borderRadius: tokens.borderRadiusMedium,
    boxShadow: tokens.shadow16,
    padding: '10px',
  },
  field: {
    flex: 1,
  },
  sliderField: {
    gridTemplateColumns: 'min-content 1fr',
  },
  sliderLabel: {
    textWrap: 'nowrap',
  },

  item: {
    backgroundColor: tokens.colorBrandBackground,
    border: `${tokens.strokeWidthThicker} solid ${tokens.colorTransparentStroke}`,

    width: '100px',
    height: '100px',
  },
});

const FadeAndScale = createPresenceComponent({
  enter: {
    keyframes: [
      { opacity: 0, transform: 'rotate(0)' },
      { transform: 'rotate(90deg) scale(1.5)' },
      { opacity: 1, transform: 'rotate(0)' },
    ],

    duration: motionTokens.durationGentle,

    reducedMotion: {
      keyframes: [{ opacity: 0 }, { opacity: 1 }],
      duration: motionTokens.durationUltraSlow,
    },
  },
  exit: {
    keyframes: [
      { opacity: 1, transform: 'rotate(0)' },
      { transform: 'rotate(-90deg) scale(1.5)' },
      { opacity: 0, transform: 'rotate(0)' },
    ],

    duration: motionTokens.durationGentle,

    reducedMotion: {
      keyframes: [{ opacity: 1 }, { opacity: 0 }],
      duration: motionTokens.durationUltraSlow,
    },
  },
});

export const CreatePresenceComponentReducedMotion = (): JSXElement => {
  const classes = useClasses();
  const motionRef = React.useRef<MotionImperativeRef>(null);

  const [playbackRate, setPlaybackRate] = React.useState<number>(30);
  const [visible, setVisible] = React.useState<boolean>(true);

  // Heads up!
  // This is optional and is intended solely to slow down the animations, making motions more visible in the examples.
  React.useEffect(() => {
    motionRef.current?.setPlaybackRate(playbackRate / 100);
  }, [playbackRate, visible]);

  return (
    <div className={classes.container}>
      <div className={classes.card}>
        <FadeAndScale imperativeRef={motionRef} visible={visible}>
          <div className={classes.item} />
        </FadeAndScale>
      </div>

      <div className={classes.controls}>
        <Field className={classes.field}>
          <Switch label="Visible" checked={visible} onChange={() => setVisible(v => !v)} />
        </Field>
        <Field
          className={mergeClasses(classes.field, classes.sliderField)}
          label={{
            children: (
              <>
                <code>playbackRate</code>: {playbackRate}%
              </>
            ),

            className: classes.sliderLabel,
          }}
          orientation="horizontal"
        >
          <Slider
            aria-valuetext={`Value is ${playbackRate}%`}
            className={mergeClasses(classes.field, classes.sliderField)}
            value={playbackRate}
            onChange={(ev, data) => setPlaybackRate(data.value)}
            min={0}
            max={100}
            step={5}
          />
        </Field>
      </div>
    </div>
  );
};
```

### Unmount On Exit

By default, the child component stays mounted after the animation reaches the `"finished"` state. Set `unmountOnExit` if you'd prefer to unmount the component after it finishes the animation.

```tsx
import {
  createPresenceComponent,
  Field,
  makeStyles,
  mergeClasses,
  type MotionImperativeRef,
  motionTokens,
  Slider,
  Switch,
  tokens,
} from '@fluentui/react-components';
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';

const useClasses = makeStyles({
  container: {
    display: 'grid',
    gridTemplate: `"card card" "controls ." / 1fr 1fr`,
    gap: '20px 10px',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'end',
    gridArea: 'card',

    border: `${tokens.strokeWidthThicker} solid ${tokens.colorNeutralForeground3}`,
    borderRadius: tokens.borderRadiusMedium,
    boxShadow: tokens.shadow16,
    padding: '10px',
  },
  controls: {
    display: 'flex',
    flexDirection: 'column',
    gridArea: 'controls',

    border: `${tokens.strokeWidthThicker} solid ${tokens.colorNeutralForeground3}`,
    borderRadius: tokens.borderRadiusMedium,
    boxShadow: tokens.shadow16,
    padding: '10px',
  },
  field: {
    flex: 1,
  },
  sliderField: {
    gridTemplateColumns: 'min-content 1fr',
  },
  sliderLabel: {
    textWrap: 'nowrap',
  },

  item: {
    backgroundColor: tokens.colorBrandBackground,
    border: `${tokens.strokeWidthThicker} solid ${tokens.colorTransparentStroke}`,
    borderRadius: '50%',

    width: '100px',
    height: '100px',
  },
});

const Fade = createPresenceComponent({
  enter: {
    keyframes: [{ opacity: 0 }, { opacity: 1 }],
    duration: motionTokens.durationSlow,
  },
  exit: {
    keyframes: [{ opacity: 1 }, { opacity: 0 }],
    duration: motionTokens.durationSlow,
  },
});

export const CreatePresenceComponentUnmountOnExit = (): JSXElement => {
  const classes = useClasses();
  const motionRef = React.useRef<MotionImperativeRef>(null);

  const [playbackRate, setPlaybackRate] = React.useState<number>(30);
  const [visible, setVisible] = React.useState<boolean>(true);
  const [unmountOnExit, setUnmountOnExit] = React.useState<boolean>(true);

  // Heads up!
  // This is optional and is intended solely to slow down the animations, making motions more visible in the examples.
  React.useEffect(() => {
    motionRef.current?.setPlaybackRate(playbackRate / 100);
  }, [playbackRate, visible]);

  return (
    <div className={classes.container}>
      <div className={classes.card}>
        <Fade imperativeRef={motionRef} visible={visible} unmountOnExit={unmountOnExit}>
          <div className={classes.item} />
        </Fade>
      </div>

      <div className={classes.controls}>
        <Field className={classes.field}>
          <Switch
            label={<code>unmountOnExit</code>}
            checked={unmountOnExit}
            onChange={() => setUnmountOnExit(v => !v)}
          />
        </Field>
        <Field className={classes.field}>
          <Switch label="Visible" checked={visible} onChange={() => setVisible(v => !v)} />
        </Field>
        <Field
          className={mergeClasses(classes.field, classes.sliderField)}
          label={{
            children: (
              <>
                <code>playbackRate</code>: {playbackRate}%
              </>
            ),

            className: classes.sliderLabel,
          }}
          orientation="horizontal"
        >
          <Slider
            aria-valuetext={`Value is ${playbackRate}%`}
            className={mergeClasses(classes.field, classes.sliderField)}
            value={playbackRate}
            onChange={(ev, data) => setPlaybackRate(data.value)}
            min={0}
            max={100}
            step={5}
          />
        </Field>
      </div>
    </div>
  );
};
```
