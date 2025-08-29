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
const SlideMotion = createMotionComponent<{ fromX?: string; fromY?: string; duration?: number }>(
  ({ fromX = '0px', fromY = '0px', duration = 1000 }) => ({
    keyframes: [
      { transform: `translate(${fromX}, ${fromY})` },
      { transform: 'translate(0px, 0px)' },
      { transform: `translate(${fromX}, ${fromY})` },
    ],
    duration,
    iterations: Infinity,
  }),
);

// Fast variant with different defaults
const FastSlideMotion = createMotionComponentVariant(SlideMotion, {
  fromX: '-50px',
  fromY: '-20px',
  duration: 500,
});

// Slow variant with different defaults
const SlowSlideMotion = createMotionComponentVariant(SlideMotion, {
  fromX: '100px',
  fromY: '50px',
  duration: 2000,
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
          <div className={classes.cardTitle}>Fast Variant (fromX: -50px, fromY: -20px, 500ms)</div>
          <FastSlideMotion imperativeRef={fastMotionRef}>
            <div className={classes.item} />
          </FastSlideMotion>
        </div>

        <div className={classes.card}>
          <div className={classes.cardTitle}>Slow Variant (fromX: 100px, fromY: 50px, 2000ms)</div>
          <SlowSlideMotion imperativeRef={slowMotionRef}>
            <div className={classes.item} />
          </SlowSlideMotion>
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