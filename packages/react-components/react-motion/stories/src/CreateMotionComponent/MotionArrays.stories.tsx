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

import description from './MotionArrays.stories.md';

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

export const MotionArrays = () => {
  const classes = useClasses();

  const motionRef = React.useRef<MotionImperativeRef>();
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

MotionArrays.parameters = {
  docs: {
    description: {
      story: description,
    },
  },
};
