# Motion/APIs/createMotionComponent

`createMotionComponent()` is a factory function that creates a custom motion component powered by Web Animations API.

## Examples

### Default

```tsx
import {
  createMotionComponent,
  makeStyles,
  type MotionComponentProps,
  type MotionImperativeRef,
  motionTokens,
  tokens,
} from '@fluentui/react-components';
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';

const useClasses = makeStyles({
  container: {
    display: 'grid',
    gridTemplate: `"card" / 1fr`,
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

  item: {
    backgroundColor: tokens.colorBrandBackground,
    border: `${tokens.strokeWidthThicker} solid ${tokens.colorTransparentStroke}`,
    borderRadius: '50%',

    width: '100px',
    height: '100px',
  },
});

const FadeEnter = createMotionComponent({
  keyframes: [{ opacity: 0 }, { opacity: 1 }],
  duration: motionTokens.durationSlow,
  iterations: Infinity,

  reducedMotion: {
    iterations: 1,
  },
});

export const CreateMotionComponentDefault = (props: MotionComponentProps): JSXElement => {
  const classes = useClasses();
  const motionRef = React.useRef<MotionImperativeRef>(null);

  // Heads up!
  // This is optional and is intended solely to slow down the animations, making motions more visible in the examples.
  React.useEffect(() => {
    motionRef.current?.setPlaybackRate(0.2);
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.card}>
        <FadeEnter imperativeRef={motionRef}>
          <div className={classes.item} />
        </FadeEnter>
      </div>
    </div>
  );
};
```

### Lifecycle Callbacks

A React component created with `createMotionComponent()` has the following lifecycle callbacks:

- `onMotionStart` \- This is called when any motion has started
- `onMotionFinish` \- This is called when all motions have finished
- `onMotionCancel` \- This is called when the motion is cancelled, this called instead of `onMotionFinish`. This can happen when the motion component is unmounted before the full motion is finished.

These callbacks can be useful when orchestrating motions or running side effects resulting from a motion.

```tsx
import {
  createMotionComponent,
  Field,
  makeStyles,
  mergeClasses,
  type MotionImperativeRef,
  motionTokens,
  Slider,
  Text,
  tokens,
  useId,
  Button,
} from '@fluentui/react-components';
import { ReplayFilled } from '@fluentui/react-icons';
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
    justifyContent: 'center',
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

const FadeEnter = createMotionComponent({
  keyframes: [{ opacity: 0 }, { opacity: 1 }],
  duration: motionTokens.durationSlow,
});

export const CreateMotionComponentLifecycleCallbacks = (): JSXElement => {
  const classes = useClasses();
  const logLabelId = useId();

  const motionRef = React.useRef<MotionImperativeRef>(null);
  const [statusLog, setStatusLog] = React.useState<[number, string][]>([]);

  const [playbackRate, setPlaybackRate] = React.useState<number>(30);
  const [count, setCount] = React.useState(0);

  // Heads up!
  // This is optional and is intended solely to slow down the animations, making motions more visible in the examples.
  React.useEffect(() => {
    motionRef.current?.setPlaybackRate(playbackRate / 100);
  }, [playbackRate, count]);

  return (
    <div className={classes.container}>
      <div className={classes.card}>
        <FadeEnter
          key={count}
          imperativeRef={motionRef}
          onMotionStart={() => {
            setStatusLog(entries => [[Date.now(), 'onMotionStart'], ...entries]);
          }}
          onMotionFinish={() => {
            setStatusLog(entries => [[Date.now(), 'onMotionFinish'], ...entries]);
          }}
          onMotionCancel={() => {
            setStatusLog(entries => [[Date.now(), 'onMotionCancel'], ...entries]);
          }}
        >
          <div className={classes.item} />
        </FadeEnter>
      </div>

      <div className={classes.logContainer}>
        <div className={classes.logLabel} id={logLabelId}>
          Status log
        </div>
        <div role="log" aria-labelledby={logLabelId} className={classes.log}>
          {statusLog.map(([time, callbackName], i) => (
            <div key={i}>
              {new Date(time).toLocaleTimeString()} <Text weight="bold">{callbackName}</Text>
            </div>
          ))}
        </div>
      </div>

      <div className={classes.controls}>
        <div>
          <Button appearance="subtle" icon={<ReplayFilled />} onClick={() => setCount(s => s + 1)}>
            Restart
          </Button>
        </div>
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

`createMotionComponent()` supports arrays of `AtomMotion` objects. This is useful when you want to animate properties with _different_ durations, easings, etc.

```ts
const FadeFastGrowSlow = createMotionComponent([
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
]);
```

```tsx
import {
  createMotionComponent,
  Field,
  makeStyles,
  mergeClasses,
  type MotionImperativeRef,
  motionTokens,
  tokens,
  Slider,
  ToggleButton,
} from '@fluentui/react-components';
import { PlayFilled, PauseFilled } from '@fluentui/react-icons';
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

const FadeFastGrowSlow = createMotionComponent([
  {
    keyframes: [{ opacity: 0 }, { opacity: 1 }],
    duration: motionTokens.durationNormal,
    easing: motionTokens.curveLinear,
  },
  {
    keyframes: [{ transform: 'scale(0)' }, { transform: 'scale(1)' }],
    duration: motionTokens.durationUltraSlow,
    easing: motionTokens.curveEasyEase,
  },
]);

export const CreateMotionComponentArrays = (): JSXElement => {
  const classes = useClasses();

  const motionRef = React.useRef<MotionImperativeRef>(null);
  const ref = React.useRef<HTMLDivElement>(null);

  const [playbackRate, setPlaybackRate] = React.useState<number>(10);
  const [isRunning, setIsRunning] = React.useState<boolean>(false);

  // Heads up!
  // This is optional and is intended solely to slow down the animations, making motions more visible in the examples.
  React.useEffect(() => {
    motionRef.current?.setPlaybackRate(playbackRate / 100);
  }, [playbackRate]);
  React.useEffect(() => {
    motionRef.current?.setPlayState(isRunning ? 'running' : 'paused');
  }, [isRunning]);

  return (
    <div className={classes.container}>
      <div className={classes.card}>
        <FadeFastGrowSlow imperativeRef={motionRef}>
          <div ref={ref} className={classes.balloon} />
        </FadeFastGrowSlow>
      </div>

      <div className={classes.controls}>
        <div>
          <ToggleButton
            icon={isRunning ? <PauseFilled /> : <PlayFilled />}
            appearance="subtle"
            checked={isRunning}
            onClick={() => setIsRunning(v => !v)}
          >
            {isRunning ? 'Pause' : 'Play'}
          </ToggleButton>
        </div>
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

### Create Motion Component

You can create completely custom motion that are defined by `AtomMotion` interface. `AtomMotion` contains definitions for `keyframes` and its options that are used internally to create [`KeyframeEffect`](https://developer.mozilla.org/en-US/docs/Web/API/KeyframeEffect) for an animation.

```tsx
import { type AtomMotion, createMotionComponent } from '@fluentui/react-components';

const customAtom: AtomMotion = {
  // opacity will be animated from 0 to 1
  keyframes: [{ opacity: 0 }, { opacity: 1 }],
  // duration of the animation will be "1000ms"
  duration: 1000,
};
const CustomMotion = createMotionComponent(customAtom);
```

```tsx
import { createMotionComponent, makeStyles, tokens } from '@fluentui/react-components';
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';

const useClasses = makeStyles({
  container: {
    display: 'grid',
    gridTemplate: `"card" / 1fr`,
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
    paddingTop: '120px',
  },

  item: {
    backgroundColor: tokens.colorBrandBackground,
    border: `${tokens.strokeWidthThicker} solid ${tokens.colorTransparentStroke}`,
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

const DropIn = createMotionComponent({
  keyframes: [
    { transform: 'rotate(-30deg) translateY(-100%)', opacity: 0 },
    { transform: 'rotate(0deg) translateY(0%)', opacity: 1 },
  ],

  duration: 4000,
  iterations: Infinity,

  reducedMotion: {
    iterations: 1,
  },
});

export const CreateMotionComponentFactory = (): JSXElement => {
  const classes = useClasses();

  return (
    <div className={classes.container}>
      <div className={classes.card}>
        <DropIn>
          <div className={classes.item} />
        </DropIn>

        <code className={classes.description}>Custom drop in motion</code>
      </div>
    </div>
  );
};
```

### Create Motion Component Variant

```tsx
import { createMotionComponent, createMotionComponentVariant, makeStyles, tokens } from '@fluentui/react-components';
import * as React from 'react';
import type { JSXElement, MotionComponentProps } from '@fluentui/react-components';

const useClasses = makeStyles({
  container: {
    display: 'grid',
    gridTemplate: `"cards cards" "controls ." / 1fr 1fr`,
    gap: '20px 10px',
  },
  cards: {
    display: 'flex',
    flexDirection: 'row',
    gap: '20px',
    gridArea: 'cards',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,

    border: `${tokens.strokeWidthThicker} solid ${tokens.colorNeutralForeground3}`,
    borderRadius: tokens.borderRadiusMedium,
    boxShadow: tokens.shadow16,
    padding: '20px',
    minHeight: '200px',
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
  cardTitle: {
    marginBottom: '50px',
    fontWeight: tokens.fontWeightSemibold,
  },
});

const springPulse = `linear(0 0.000%, 1.086 8.000%, 1.397 11.000%, 1.565 14.000%, 1.6 17.000%, 1.489 21.000%, 1.023 30.000%, 0.8785 34.000%, 0.81 39.000%, 0.8732 46.000%, 1.028 56.000%, 1.057 65.000%, 0.9827 83.000%, 1 100.000%)
`;

// Base motion component with configurable parameters
const PulseMotion = createMotionComponent<{
  duration?: number;
  fromScale?: number;
}>(({ duration = 1000, fromScale = 0.8 }) => ({
  keyframes: [{ scale: fromScale }, { scale: 1 }],
  duration,
  easing: springPulse,
  iterations: Infinity,
  direction: 'alternate',
}));

// Slow variant with different defaults
const PulseMotionVariant = createMotionComponentVariant(PulseMotion, {
  duration: 2000,
});

export const CreateMotionComponentVariantDefault = (props: MotionComponentProps): JSXElement => {
  const classes = useClasses();

  return (
    <div className={classes.container}>
      <div className={classes.cards}>
        <div className={classes.card}>
          <div className={classes.cardTitle}>
            <span>PulseMotion</span>
            <br />
            <span>{`duration: 1000`}</span>
          </div>
          <PulseMotion>
            <div className={classes.item} />
          </PulseMotion>
        </div>

        <div className={classes.card}>
          <div className={classes.cardTitle}>{`createMotionComponentVariant(PulseMotion, { duration: 2000 })`}</div>
          <PulseMotionVariant>
            <div className={classes.item} />
          </PulseMotionVariant>
        </div>
      </div>
    </div>
  );
};
```

### Function Params

Atoms definitions can be also defined as functions that accept an animated element as an argument. This allows to define more complex animations that depend on the animated element's properties, for example:

```ts
const Grow = createMotionComponent(({ element }) => ({
  duration: 300,
  keyframes: [
    { opacity: 0, maxHeight: `${element.scrollHeight / 2}px` },
    { opacity: 1, maxHeight: `${element.scrollHeight}px` },
    { opacity: 0, maxHeight: `${element.scrollHeight / 2}px` },
  ],
  iterations: Infinity,
}));
```

```tsx
import {
  createMotionComponent,
  Field,
  makeStyles,
  mergeClasses,
  type MotionImperativeRef,
  motionTokens,
  Slider,
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

const Scale = createMotionComponent<{ startFrom?: number }>(({ startFrom = 0.5 }) => {
  return {
    keyframes: [
      { opacity: 0, transform: `scale(${startFrom})` },
      { opacity: 1, transform: 'scale(1)' },
      { opacity: 0, transform: `scale(${startFrom})` },
    ],

    duration: motionTokens.durationUltraSlow,
    iterations: Infinity,

    reducedMotion: {
      iterations: 1,
    },
  };
});

export const CreateMotionComponentFunctionParams = (): JSXElement => {
  const classes = useClasses();

  const motionBRef = React.useRef<MotionImperativeRef>(null);
  const motionARef = React.useRef<MotionImperativeRef>(null);

  const [playbackRate, setPlaybackRate] = React.useState<number>(20);

  // Heads up!
  // This is optional and is intended solely to slow down the animations, making motions more visible in the examples.
  React.useEffect(() => {
    motionARef.current?.setPlaybackRate(playbackRate / 100);
    motionBRef.current?.setPlaybackRate(playbackRate / 100);
  }, [playbackRate]);

  return (
    <div className={classes.container}>
      <div className={mergeClasses(classes.card, classes.cardA)}>
        <Scale imperativeRef={motionARef} startFrom={0.1}>
          <div className={classes.item} />
        </Scale>
        <div className={classes.description}>startFrom=0.1</div>
      </div>
      <div className={mergeClasses(classes.card, classes.cardB)}>
        <Scale imperativeRef={motionBRef} startFrom={0.8}>
          <div className={classes.item} />
        </Scale>
        <div className={classes.description}>startFrom=0.8</div>
      </div>

      <div className={classes.controls}>
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

### Functions

Atoms definitions can be also defined as functions that accept an animated element as an argument. This allows to define more complex animations that depend on the animated element's properties, for example:

```ts
const Grow = createMotionComponent(({ element }) => ({
  duration: 300,
  keyframes: [
    { opacity: 0, maxHeight: `${element.scrollHeight / 2}px` },
    { opacity: 1, maxHeight: `${element.scrollHeight}px` },
    { opacity: 0, maxHeight: `${element.scrollHeight / 2}px` },
  ],
  iterations: Infinity,
}));
```

```tsx
import {
  createMotionComponent,
  Field,
  makeStyles,
  mergeClasses,
  type MotionImperativeRef,
  motionTokens,
  Slider,
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
    minHeight: '180px',
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
    border: `${tokens.strokeWidthThicker} solid ${tokens.colorBrandBackground}`,
    padding: '8px',
    width: '300px',
    overflow: 'hidden',
  },
  description: { margin: '5px' },
});

const Grow = createMotionComponent(({ element }) => ({
  duration: motionTokens.durationUltraSlow,
  keyframes: [
    { opacity: 0, maxHeight: `${element.scrollHeight / 2}px` },
    { opacity: 1, maxHeight: `${element.scrollHeight}px` },
    { opacity: 0, maxHeight: `${element.scrollHeight / 2}px` },
  ],

  iterations: Infinity,

  reducedMotion: {
    iterations: 1,
  },
}));

export const CreateMotionComponentFunctions = (): JSXElement => {
  const classes = useClasses();

  const motionRef = React.useRef<MotionImperativeRef>(null);
  const [playbackRate, setPlaybackRate] = React.useState<number>(20);

  // Heads up!
  // This is optional and is intended solely to slow down the animations, making motions more visible in the examples.
  React.useEffect(() => {
    motionRef.current?.setPlaybackRate(playbackRate / 100);
  }, [playbackRate]);

  return (
    <div className={classes.container}>
      <div className={classes.card}>
        <Grow imperativeRef={motionRef}>
          <div className={classes.item}>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Sed vel lectus. Donec odio tempus molestie,
            porttitor ut, iaculis quis, sem. Integer vulputate sem a nibh rutrum consequat. Etiam quis quam. Curabitur
            sagittis hendrerit ante. Duis ante orci, molestie vitae vehicula venenatis, tincidunt ac pede.
          </div>
        </Grow>
      </div>

      <div className={classes.controls}>
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

### Imperative Ref

By default, the child component will be animated when it first mounts. The state of a motion can be controlled using `setPlayState()` via `imperativeRef` prop.

`imperativeRef` works with both `createMotionComponent()` and `createPresenceComponent()` factories.

```tsx
import {
  createMotionComponent,
  Field,
  makeStyles,
  mergeClasses,
  type MotionImperativeRef,
  motionTokens,
  tokens,
  Slider,
  ToggleButton,
} from '@fluentui/react-components';
import { PlayFilled, PauseFilled } from '@fluentui/react-icons';
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

const FadeEnter = createMotionComponent({
  keyframes: [{ opacity: 0 }, { opacity: 1 }],
  duration: motionTokens.durationSlow,
  iterations: Infinity,

  reducedMotion: {
    iterations: 1,
  },
});

export const CreateMotionComponentImperativeRefPlayState = (): JSXElement => {
  const classes = useClasses();
  const motionRef = React.useRef<MotionImperativeRef>(null);

  const [playbackRate, setPlaybackRate] = React.useState<number>(30);
  const [isRunning, setIsRunning] = React.useState<boolean>(false);

  // Heads up!
  // This is optional and is intended solely to slow down the animations, making motions more visible in the examples.
  React.useEffect(() => {
    motionRef.current?.setPlaybackRate(playbackRate / 100);
  }, [playbackRate]);
  React.useEffect(() => {
    motionRef.current?.setPlayState(isRunning ? 'running' : 'paused');
  }, [isRunning]);

  return (
    <div className={classes.container}>
      <div className={classes.card}>
        <FadeEnter imperativeRef={motionRef}>
          <div className={classes.item} />
        </FadeEnter>
      </div>

      <div className={classes.controls}>
        <div>
          <ToggleButton
            icon={isRunning ? <PauseFilled /> : <PlayFilled />}
            appearance="subtle"
            checked={isRunning}
            onClick={() => setIsRunning(v => !v)}
          >
            {isRunning ? 'Pause' : 'Play'}
          </ToggleButton>
        </div>
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

### Tokens

Fluent UI provides a set of design tokens, via `tokens` object, for example `tokens.colorNeutralForeground1`. You can use them to create your own motions.

```tsx
import { createMotionComponent, makeStyles, tokens } from '@fluentui/react-components';
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';

const useClasses = makeStyles({
  container: {
    display: 'grid',
    gridTemplate: `"card" / 1fr`,
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

  item: {
    backgroundColor: tokens.colorBrandBackground,
    borderRadius: tokens.borderRadiusCircular,
    width: '100px',
    height: '100px',
    forcedColorAdjust: 'none',
  },
  description: {
    fontFamily: tokens.fontFamilyMonospace,
    borderRadius: tokens.borderRadiusMedium,
    marginTop: '10px',
    padding: '5px 10px',
    backgroundColor: tokens.colorNeutralBackground1Pressed,
  },
});

const BackgroundChange = createMotionComponent({
  keyframes: [
    { backgroundColor: tokens.colorStatusDangerBackground3 },
    { backgroundColor: tokens.colorStatusSuccessBackground3 },
  ],

  duration: 3000,
  iterations: Infinity,

  reducedMotion: {
    iterations: 1,
  },
});

export const CreateMotionComponentTokensUsage = (): JSXElement => {
  const classes = useClasses();

  return (
    <div className={classes.container}>
      <div className={classes.card}>
        <BackgroundChange>
          <div className={classes.item} />
        </BackgroundChange>

        <div className={classes.description}>Custom background color motion</div>
      </div>
    </div>
  );
};
```
