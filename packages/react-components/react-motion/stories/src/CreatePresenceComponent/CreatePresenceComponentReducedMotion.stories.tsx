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

import description from './CreatePresenceComponentReducedMotion.stories.md';

import styles from './CreatePresenceComponentReducedMotion.module.css';

const useClasses = () => styles;

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

CreatePresenceComponentReducedMotion.parameters = {
  docs: {
    description: {
      story: description,
    },
  },
};
