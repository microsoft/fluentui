import {
  Checkbox,
  createMotionComponent,
  Label,
  makeStyles,
  type MotionImperativeRef,
  motionTokens,
  tokens,
  Slider,
  useId,
} from '@fluentui/react-components';
import * as React from 'react';

import description from './ImperativeRefPlayState.stories.md';

const useClasses = makeStyles({
  container: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '10px',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    border: `${tokens.strokeWidthThicker} solid ${tokens.colorNeutralForeground3}`,
    borderRadius: tokens.borderRadiusMedium,
    padding: '10px',

    alignItems: 'center',
  },
  item: {
    backgroundColor: tokens.colorBrandBackground,
    border: `${tokens.strokeWidthThicker} solid ${tokens.colorTransparentStroke}`,
    borderRadius: '50%',

    width: '100px',
    height: '100px',
  },
  description: { margin: '5px' },
  controls: {
    display: 'flex',
    flexDirection: 'column',

    marginTop: '20px',
    border: `${tokens.strokeWidthThicker} solid ${tokens.colorNeutralForeground3}`,
    borderRadius: tokens.borderRadiusMedium,
    padding: '10px',
  },
});

const FadeEnter = createMotionComponent({
  keyframes: [{ opacity: 0 }, { opacity: 1 }],
  duration: motionTokens.durationSlow,
  iterations: Infinity,
});

export const ImperativeRefPlayState = () => {
  const classes = useClasses();
  const sliderId = useId();

  const motionRef = React.useRef<MotionImperativeRef>();

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
    <>
      <div className={classes.container}>
        <div className={classes.card}>
          <FadeEnter imperativeRef={motionRef}>
            <div className={classes.item} />
          </FadeEnter>

          <code className={classes.description}>fadeEnterSlow</code>
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

ImperativeRefPlayState.parameters = {
  docs: {
    description: {
      story: description,
    },
  },
};
