import { Label, makeStyles, Slider, tokens, useId } from '@fluentui/react-components';
import { createMotionComponent, motionTokens } from '@fluentui/react-motions-preview';
import type { MotionImperativeRef } from '@fluentui/react-motions-preview';
import * as React from 'react';

import description from './MotionFunctions.stories.md';

const useClasses = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    border: `${tokens.strokeWidthThicker} solid ${tokens.colorNeutralForeground3}`,
    borderRadius: tokens.borderRadiusMedium,
    padding: '10px',

    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '200px',
  },
  item: {
    border: `${tokens.strokeWidthThicker} solid ${tokens.colorBrandBackground}`,
    padding: '8px',
    width: '300px',
    overflow: 'hidden',
  },
  controls: {
    display: 'flex',
    flexDirection: 'column',
    gridArea: '2 1 2 3',

    marginTop: '20px',
    border: `${tokens.strokeWidthThicker} solid ${tokens.colorNeutralForeground3}`,
    borderRadius: tokens.borderRadiusMedium,
    padding: '10px',
  },
  description: { margin: '5px' },
});

const Grow = createMotionComponent(element => ({
  duration: motionTokens.durationUltraSlow,
  keyframes: [
    { opacity: 0, maxHeight: `${element.scrollHeight / 2}px` },
    { opacity: 1, maxHeight: `${element.scrollHeight}px` },
    { opacity: 0, maxHeight: `${element.scrollHeight / 2}px` },
  ],
  iterations: Infinity,
}));

export const MotionFunctions = () => {
  const classes = useClasses();
  const sliderId = useId();

  const motionRef = React.useRef<MotionImperativeRef>();
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
    </div>
  );
};

MotionFunctions.parameters = {
  docs: {
    description: {
      story: description,
    },
  },
};
