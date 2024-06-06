import {
  Checkbox,
  createMotionComponent,
  makeStyles,
  type MotionImperativeRef,
  motionTokens,
  tokens,
  Label,
  Slider,
  useId,
} from '@fluentui/react-components';
import * as React from 'react';

import description from './MotionArrays.stories.md';

const useClasses = makeStyles({
  container: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '10px',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'end',

    border: `${tokens.strokeWidthThicker} solid ${tokens.colorNeutralForeground3}`,
    borderRadius: tokens.borderRadiusMedium,
    padding: '10px',
  },
  controls: {
    display: 'flex',
    flexDirection: 'column',

    marginTop: '20px',
    border: `${tokens.strokeWidthThicker} solid ${tokens.colorNeutralForeground3}`,
    borderRadius: tokens.borderRadiusMedium,
    padding: '10px',
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
  const sliderId = useId();

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
    <>
      <div className={classes.container}>
        <div className={classes.card}>
          <FadeFastGrowSlow imperativeRef={motionRef}>
            <div ref={ref} className={classes.balloon} />
          </FadeFastGrowSlow>
        </div>
      </div>

      <div className={classes.controls}>
        <div>
          <Checkbox
            label={isRunning ? '⏸️ Pause' : '▶️ Play'}
            checked={isRunning}
            onChange={() => setIsRunning(v => !v)}
          />
        </div>
        <div>
          <Label htmlFor={sliderId}>
            <code>playbackRate</code>: {playbackRate}%
          </Label>
          <Slider
            aria-valuetext={`Value is ${playbackRate}%`}
            value={playbackRate}
            onChange={(ev, data) => setPlaybackRate(data.value)}
            min={0}
            id={sliderId}
            max={100}
            step={10}
          />
        </div>
      </div>
    </>
  );
};

MotionArrays.parameters = {
  docs: {
    description: {
      story: description,
    },
  },
};
