import {
  createMotionComponent,
  createMotionComponentVariant,
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

import description from './CreateMotionComponentVariant.stories.md';

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
    marginBottom: '10px',
    fontWeight: tokens.fontWeightSemibold,
  },
});

// Base motion component with configurable parameters
const FadeMotion = createMotionComponent<{ opacity?: number; duration?: number; easing?: string }>(
  ({ opacity = 0, duration = 1000, easing = 'ease' }) => ({
    keyframes: [{ opacity }, { opacity: 1 }, { opacity }],
    duration,
    easing,
    iterations: Infinity,
  }),
);

// Fast variant with different defaults
const FastFadeMotion = createMotionComponentVariant(FadeMotion, {
  duration: 500,
  easing: 'ease-in-out',
});

// Slow variant with different defaults
const SlowFadeMotion = createMotionComponentVariant(FadeMotion, {
  opacity: 0.2,
  duration: 2000,
  easing: 'ease-out',
});

export const CreateMotionComponentVariant = (): JSXElement => {
  const classes = useClasses();

  const fastMotionRef = React.useRef<MotionImperativeRef>(null);
  const slowMotionRef = React.useRef<MotionImperativeRef>(null);
  const [playbackRate, setPlaybackRate] = React.useState<number>(20);

  // Heads up!
  // This is optional and is intended solely to slow down the animations, making motions more visible in the examples.
  React.useEffect(() => {
    fastMotionRef.current?.setPlaybackRate(playbackRate / 100);
    slowMotionRef.current?.setPlaybackRate(playbackRate / 100);
  }, [playbackRate]);

  return (
    <div className={classes.container}>
      <div className={classes.cards}>
        <div className={classes.card}>
          <div className={classes.cardTitle}>Fast Variant (500ms, ease-in-out)</div>
          <FastFadeMotion imperativeRef={fastMotionRef}>
            <div className={classes.item} />
          </FastFadeMotion>
        </div>

        <div className={classes.card}>
          <div className={classes.cardTitle}>Slow Variant (2000ms, ease-out, opacity: 0.2)</div>
          <SlowFadeMotion imperativeRef={slowMotionRef}>
            <div className={classes.item} />
          </SlowFadeMotion>
        </div>
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

CreateMotionComponentVariant.parameters = {
  docs: {
    description: {
      story: description,
    },
  },
};