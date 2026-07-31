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

import description from './CreatePresenceComponentArrays.stories.md';

import styles from './CreatePresenceComponentArrays.module.css';

const useClasses = () => styles;

const FastFadeSlowScale = createPresenceComponent({
  enter: [
    {
      keyframes: [{ opacity: 0 }, { opacity: 1 }],
      duration: motionTokens.durationFast,
      easing: motionTokens.curveLinear,
    },
    {
      keyframes: [{ transform: 'scale(0)' }, { transform: 'scale(1)' }],
      duration: motionTokens.durationSlow,
      easing: motionTokens.curveEasyEase,
    },
  ],
  exit: {
    keyframes: [{ opacity: 1 }, { opacity: 0 }],
    duration: motionTokens.durationSlow,
  },
});

export const CreatePresenceComponentArrays = (): JSXElement => {
  const classes = useClasses();

  const motionRef = React.useRef<MotionImperativeRef>(null);
  const ref = React.useRef<HTMLDivElement>(null);

  const [visible, setVisible] = React.useState<boolean>(true);
  const [playbackRate, setPlaybackRate] = React.useState<number>(30);

  // Heads up!
  // This is optional and is intended solely to slow down the animations, making motions more visible in the examples.
  React.useEffect(() => {
    motionRef.current?.setPlaybackRate(playbackRate / 100);
  }, [playbackRate, visible]);

  return (
    <div className={classes.container}>
      <div className={classes.card}>
        <FastFadeSlowScale imperativeRef={motionRef} visible={visible}>
          <div ref={ref} className={classes.balloon} />
        </FastFadeSlowScale>
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

CreatePresenceComponentArrays.parameters = {
  docs: {
    description: {
      story: description,
    },
  },
};
