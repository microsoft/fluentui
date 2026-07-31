import {
  createMotionComponent,
  Field,
  type MotionImperativeRef,
  motionTokens,
  Slider,
  ToggleButton,
} from '@fluentui/react-components';
import { PlayFilled, PauseFilled } from '@fluentui/react-icons';
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';

import description from './CreateMotionComponentArrays.stories.md';

import styles from './CreateMotionComponentArrays.module.css';

const useClasses = () => styles;

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
          className={`${classes.field} ${classes.sliderField}`}
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
            className={`${classes.field} ${classes.sliderField}`}
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

CreateMotionComponentArrays.parameters = {
  docs: {
    description: {
      story: description,
    },
  },
};
