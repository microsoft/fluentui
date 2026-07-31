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

import description from './CreatePresenceComponentUnmountOnExit.stories.md';

import styles from './CreatePresenceComponentUnmountOnExit.module.css';

const useClasses = () => styles;

const Fade = createPresenceComponent({
  enter: {
    keyframes: [{ opacity: 0 }, { opacity: 1 }],
    duration: motionTokens.durationSlow,
  },
  exit: {
    keyframes: [{ opacity: 1 }, { opacity: 0 }],
    duration: motionTokens.durationSlow,
  },
});

export const CreatePresenceComponentUnmountOnExit = (): JSXElement => {
  const classes = useClasses();
  const motionRef = React.useRef<MotionImperativeRef>(null);

  const [playbackRate, setPlaybackRate] = React.useState<number>(30);
  const [visible, setVisible] = React.useState<boolean>(true);
  const [unmountOnExit, setUnmountOnExit] = React.useState<boolean>(true);

  // Heads up!
  // This is optional and is intended solely to slow down the animations, making motions more visible in the examples.
  React.useEffect(() => {
    motionRef.current?.setPlaybackRate(playbackRate / 100);
  }, [playbackRate, visible]);

  return (
    <div className={classes.container}>
      <div className={classes.card}>
        <Fade imperativeRef={motionRef} visible={visible} unmountOnExit={unmountOnExit}>
          <div className={classes.item} />
        </Fade>
      </div>

      <div className={classes.controls}>
        <Field className={classes.field}>
          <Switch
            label={<code>unmountOnExit</code>}
            checked={unmountOnExit}
            onChange={() => setUnmountOnExit(v => !v)}
          />
        </Field>
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

CreatePresenceComponentUnmountOnExit.parameters = {
  docs: {
    description: {
      story: description,
    },
  },
};
