import {
  createPresenceComponent,
  Field,
  type MotionImperativeRef,
  motionTokens,
  Slider,
  Switch,
} from '@fluentui/react-components';
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';

import description from './CreatePresenceComponentFunctionParams.stories.md';

import styles from './CreatePresenceComponentFunctionParams.module.css';

const useClasses = () => styles;

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
      <div className={`${classes.card} ${classes.cardA}`}>
        <Scale imperativeRef={motionARef} startFrom={0.1} visible={visible}>
          <div className={classes.item} />
        </Scale>
        <div className={classes.description}>startFrom=0.1</div>
      </div>
      <div className={`${classes.card} ${classes.cardB}`}>
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

CreatePresenceComponentFunctionParams.parameters = {
  docs: {
    description: {
      story: description,
    },
  },
};
